"use client";

import { useSession } from "next-auth/react";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { LoadingModal } from "@/components/loading-modal";
import { Monster } from "@/types/monster";
import { Button } from "@/components/ui";
import { useLoading } from "@/components/providers/loading-provider";
import { useClientCache } from "@/hooks/use-client-cache";
import { Search, Filter, Zap, Shield, Skull, Flame, Leaf, Droplets, Mountain, Sparkles, Users, Eye, Crown } from "lucide-react";
import MonsterDetailModal from "@/components/monster-detail-modal";

// Monster category definitions with icons and colors
const MONSTER_CATEGORIES = {
  "All Monsters": { icon: Eye, color: "bg-gray-500" },
  "Humanoids": { icon: Users, color: "bg-blue-500" },
  "Beasts": { icon: Leaf, color: "bg-green-500" },
  "Dragons": { icon: Flame, color: "bg-red-600" },
  "Undead": { icon: Skull, color: "bg-gray-700" },
  "Fiends": { icon: Flame, color: "bg-red-800" },
  "Celestials": { icon: Crown, color: "bg-yellow-400" },
  "Constructs": { icon: Shield, color: "bg-gray-400" },
  "Elementals": { icon: Droplets, color: "bg-blue-400" },
  "Fey": { icon: Sparkles, color: "bg-purple-400" },
  "Giants": { icon: Mountain, color: "bg-orange-500" },
  "Monstrosities": { icon: Zap, color: "bg-purple-600" },
  "Oozes": { icon: Droplets, color: "bg-green-600" },
  "Plants": { icon: Leaf, color: "bg-green-700" },
  "Aberrations": { icon: Eye, color: "bg-indigo-600" },
  "Swarm": { icon: Users, color: "bg-yellow-600" }
};



// Size options
const SIZE_OPTIONS = [
  { label: "All Sizes", value: "all" },
  { label: "Tiny", value: "Tiny" },
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Large", value: "Large" },
  { label: "Huge", value: "Huge" },
  { label: "Gargantuan", value: "Gargantuan" }
];

// Alignment options
const ALIGNMENT_OPTIONS = [
  { label: "All Alignments", value: "all" },
  { label: "Lawful Good", value: "Lawful Good" },
  { label: "Neutral Good", value: "Neutral Good" },
  { label: "Chaotic Good", value: "Chaotic Good" },
  { label: "Lawful Neutral", value: "Lawful Neutral" },
  { label: "Neutral", value: "Neutral" },
  { label: "Chaotic Neutral", value: "Chaotic Neutral" },
  { label: "Lawful Evil", value: "Lawful Evil" },
  { label: "Neutral Evil", value: "Neutral Evil" },
  { label: "Chaotic Evil", value: "Chaotic Evil" },
  { label: "Unaligned", value: "Unaligned" }
];

// Sort field options
const SORT_FIELDS = [
  { label: "Name", value: "name" },
  { label: "CR", value: "cr" },
  { label: "HP", value: "hp" },
  { label: "Category", value: "category" },
  { label: "Size", value: "size" }
];

// Size order for sorting
const SIZE_ORDER = {
  "Tiny": 1,
  "Small": 2,
  "Medium": 3,
  "Large": 4,
  "Huge": 5,
  "Gargantuan": 6
};

export default function MonstersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { assetsLoaded, setAssetsLoaded } = useLoading();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Monsters"]);
  const [selectedCRs, setSelectedCRs] = useState<string[]>(["all"]);
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedAlignment, setSelectedAlignment] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Sort state
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Modal state
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use cached monsters data from client cache
  const { monsters: getMonsters, isInitialized } = useClientCache();
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const isLoading = !isInitialized;

  // Helper functions for toggling selections
  const toggleCategory = (category: string) => {
    if (category === "All Monsters") {
      setSelectedCategories(["All Monsters"]);
    } else {
      setSelectedCategories(prev => {
        const newSelection = prev.includes("All Monsters") 
          ? prev.filter(c => c !== "All Monsters")
          : [...prev];
        
        if (newSelection.includes(category)) {
          const filtered = newSelection.filter(c => c !== category);
          return filtered.length === 0 ? ["All Monsters"] : filtered;
        } else {
          return [...newSelection, category];
        }
      });
    }
  };

  const toggleCR = (crRange: string) => {
    if (crRange === "all") {
      setSelectedCRs(["all"]);
    } else {
      setSelectedCRs(prev => {
        const newSelection = prev.includes("all") 
          ? prev.filter(cr => cr !== "all")
          : [...prev];
        
        if (newSelection.includes(crRange)) {
          const filtered = newSelection.filter(cr => cr !== crRange);
          return filtered.length === 0 ? ["all"] : filtered;
        } else {
          return [...newSelection, crRange];
        }
      });
    }
  };
  


  // Load monsters when component mounts
  useEffect(() => {
    const loadMonsters = async () => {
      if (isInitialized) {
        try {
          const monstersData = await getMonsters;
          console.log(`📊 Loaded ${monstersData.length} monsters`);
          console.log('📊 First few monsters:', monstersData.slice(0, 3).map(m => ({ name: m.name, type: m.type })));
          setMonsters(monstersData);
          console.log(`🔄 Set monsters state to ${monstersData.length} monsters`);
        } catch (error) {
          console.error('Failed to load monsters:', error);
        }
      }
    };

    loadMonsters();
  }, [isInitialized, getMonsters]);



  // Helper function to get CR as number for range filtering
  const getCRAsNumber = (cr: string | null): number => {
    if (!cr || cr === "0") return 0;
    if (cr.includes("/")) {
      const [num, denom] = cr.split("/");
      return parseInt(num) / parseInt(denom);
    }
    return parseInt(cr) || 0;
  };

  // Helper function to get monster category border color from theme variables
  const getMonsterCategoryBorderColor = (monster: Monster): string => {
    switch (monster.type) {
      case "humanoid": return "var(--color-monster-humanoid)";
      case "beast": return "var(--color-monster-beast)";
      case "dragon": return "var(--color-monster-dragon)";
      case "undead": return "var(--color-monster-undead)";
      case "fiend": return "var(--color-monster-fiend)";
      case "celestial": return "var(--color-monster-celestial)";
      case "construct": return "var(--color-monster-construct)";
      case "elemental": return "var(--color-monster-elemental)";
      case "fey": return "var(--color-monster-fey)";
      case "giant": return "var(--color-monster-giant)";
      case "monstrosity": return "var(--color-monster-monstrosity)";
      case "ooze": return "var(--color-monster-ooze)";
      case "plant": return "var(--color-monster-plant)";
      case "aberration": return "var(--color-monster-aberration)";
      case "swarm of Tiny beasts": return "var(--color-monster-swarm)";
      default: return "var(--color-monster-default)";
    }
  };

  // Helper function to get CR difficulty background color from theme variables
  const getCRDifficultyBg = (cr: string): string => {
    const crNumber = getCRAsNumber(cr);
    if (crNumber <= 1) return "var(--color-success)"; // Easy
    if (crNumber <= 3) return "var(--color-warning)"; // Medium
    if (crNumber <= 7) return "var(--color-accent)"; // Hard
    if (crNumber <= 12) return "var(--color-error)"; // Deadly
    if (crNumber <= 20) return "var(--color-error-hover)"; // Very Deadly
    return "var(--color-monster-monstrosity)"; // Legendary
  };

  // Helper function to get CR difficulty text color from theme variables
  const getCRDifficultyTextColor = (cr: string): string => {
    const crNumber = getCRAsNumber(cr);
    if (crNumber <= 1) return "var(--color-success-text)"; // Easy
    if (crNumber <= 3) return "var(--color-warning-text)"; // Medium
    if (crNumber <= 7) return "var(--color-accent-text)"; // Hard
    if (crNumber <= 12) return "var(--color-error-text)"; // Deadly
    if (crNumber <= 20) return "var(--color-error-text)"; // Very Deadly
    return "var(--color-accent-text)"; // Legendary
  };

  // Filter and sort monsters based on all criteria
  const filteredAndSortedMonsters = useMemo(() => {
    // Helper function to check if monster matches CR range
    const matchesCRRange = (monster: Monster, range: string): boolean => {
      if (range === "all") return true;
      
      const monsterCR = getCRAsNumber(monster.challengeRating);
      
      switch (range) {
        case "0-1": return monsterCR >= 0 && monsterCR <= 1;
        case "2-5": return monsterCR >= 2 && monsterCR <= 5;
        case "6-10": return monsterCR >= 6 && monsterCR <= 10;
        case "11-15": return monsterCR >= 11 && monsterCR <= 15;
        case "16-20": return monsterCR >= 16 && monsterCR <= 20;
        case "21+": return monsterCR >= 21;
        default: return true;
      }
    };

    const filtered = monsters.filter(monster => {
      // Search term filter
      const matchesSearch = searchTerm === "" || 
        monster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monster.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monster.subtype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monster.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter - check if monster matches any selected category
      const matchesCategory = selectedCategories.includes("All Monsters") || 
        selectedCategories.some(category => {
          switch (category) {
            case "Humanoids": return monster.type === "humanoid";
            case "Beasts": return monster.type === "beast";
            case "Dragons": return monster.type === "dragon";
            case "Undead": return monster.type === "undead";
            case "Fiends": return monster.type === "fiend";
            case "Celestials": return monster.type === "celestial";
            case "Constructs": return monster.type === "construct";
            case "Elementals": return monster.type === "elemental";
            case "Fey": return monster.type === "fey";
            case "Giants": return monster.type === "giant";
            case "Monstrosities": return monster.type === "monstrosity";
            case "Oozes": return monster.type === "ooze";
            case "Plants": return monster.type === "plant";
            case "Aberrations": return monster.type === "aberration";
            case "Swarm": return monster.type === "swarm of Tiny beasts";
            default: return false;
          }
        });

      // CR filter - check if monster matches any selected CR range
      const matchesCR = selectedCRs.includes("all") || 
        selectedCRs.some(crRange => matchesCRRange(monster, crRange));

      // Size filter
      const matchesSize = selectedSize === "all" || monster.size === selectedSize;

      // Alignment filter
      const matchesAlignment = selectedAlignment === "all" || monster.alignment === selectedAlignment;

      return matchesSearch && matchesCategory && matchesCR && matchesSize && matchesAlignment;
    });

    // Sort the filtered monsters
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "cr":
          comparison = getCRAsNumber(a.challengeRating) - getCRAsNumber(b.challengeRating);
          break;
        case "hp":
          comparison = a.hitPoints - b.hitPoints;
          break;
        case "category":
          comparison = a.type.localeCompare(b.type);
          break;
        case "size":
          comparison = (SIZE_ORDER[a.size as keyof typeof SIZE_ORDER] || 0) - (SIZE_ORDER[b.size as keyof typeof SIZE_ORDER] || 0);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    return sorted;
  }, [monsters, searchTerm, selectedCategories, selectedCRs, selectedSize, selectedAlignment, sortField, sortDirection]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    Object.keys(MONSTER_CATEGORIES).forEach(category => {
      if (category === "All Monsters") {
        counts[category] = monsters.length;
      } else {
        counts[category] = monsters.filter(monster => {
          switch (category) {
            case "Humanoids": return monster.type === "humanoid";
            case "Beasts": return monster.type === "beast";
            case "Dragons": return monster.type === "dragon";
            case "Undead": return monster.type === "undead";
            case "Fiends": return monster.type === "fiend";
            case "Celestials": return monster.type === "celestial";
            case "Constructs": return monster.type === "construct";
            case "Elementals": return monster.type === "elemental";
            case "Fey": return monster.type === "fey";
            case "Giants": return monster.type === "giant";
            case "Monstrosities": return monster.type === "monstrosity";
            case "Oozes": return monster.type === "ooze";
            case "Plants": return monster.type === "plant";
            case "Aberrations": return monster.type === "aberration";
            case "Swarm": return monster.type === "swarm of Tiny beasts";
            default: return false;
          }
        }).length;
      }
    });
    
    return counts;
  }, [monsters]);

  // Show loading modal while auth is loading OR while we have a session but haven't loaded all assets yet
  if (status === "loading" || (session && !assetsLoaded)) {
    return (
      <LoadingModal onComplete={() => setAssetsLoaded(true)} />
    );
  }

  // Show login screen if not authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Dungeons & Databases</h1>
          <Button
            onClick={() => router.push('/api/auth/signin')}
            className="w-full"
            size="lg"
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

  const handleTabChange = (tab: 'characters' | 'party' | 'monsters') => {
    switch (tab) {
      case 'characters':
        router.push('/characters');
        break;
      case 'party':
        router.push('/party');
        break;
      case 'monsters':
        router.push('/monsters');
        break;
    }
  };

  return (
    <MainLayout activeTab="monsters" onTabChange={handleTabChange}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Monster Database</h1>
        <p className="text-[var(--color-text-secondary)]">
          Browse and search through the complete D&D 5e SRD monster collection.
        </p>
      </div>

      {/* Search and Quick Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)] h-4 w-4" />
          <input
            type="text"
            placeholder="Search monsters by name, type, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        {/* Quick Filters and Sort */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
          </Button>
          
          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm"
            >
              {SORT_FIELDS.map(field => (
                <option key={field.value} value={field.value}>{field.label}</option>
              ))}
            </select>
            <Button
              onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
              variant="secondary"
              size="sm"
              className="flex items-center gap-1"
            >
              {sortDirection === "asc" ? "↑" : "↓"}
            </Button>
          </div>
          
          {!selectedCRs.includes("all") && (
            <Button
              onClick={() => setSelectedCRs(["all"])}
              variant="secondary"
              size="sm"
              className="text-xs"
            >
              Clear CR Filter
            </Button>
          )}
          
          {selectedSize !== "all" && (
            <Button
              onClick={() => setSelectedSize("all")}
              variant="secondary"
              size="sm"
              className="text-xs"
            >
              Clear Size Filter
            </Button>
          )}
          
          {selectedAlignment !== "all" && (
            <Button
              onClick={() => setSelectedAlignment("all")}
              variant="secondary"
              size="sm"
              className="text-xs"
            >
              Clear Alignment Filter
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Size Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  {SIZE_OPTIONS.map(size => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>

              {/* Alignment Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Alignment
                </label>
                <select
                  value={selectedAlignment}
                  onChange={(e) => setSelectedAlignment(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  {ALIGNMENT_OPTIONS.map(alignment => (
                    <option key={alignment.value} value={alignment.value}>{alignment.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {Object.entries(MONSTER_CATEGORIES).map(([category, { icon: Icon }]) => {
            // Get the appropriate border color for each category
            const getCategoryBorderColor = (cat: string): string => {
              switch (cat) {
                case "Humanoids": return "var(--color-monster-humanoid)";
                case "Beasts": return "var(--color-monster-beast)";
                case "Dragons": return "var(--color-monster-dragon)";
                case "Undead": return "var(--color-monster-undead)";
                case "Fiends": return "var(--color-monster-fiend)";
                case "Celestials": return "var(--color-monster-celestial)";
                case "Constructs": return "var(--color-monster-construct)";
                case "Elementals": return "var(--color-monster-elemental)";
                case "Fey": return "var(--color-monster-fey)";
                case "Giants": return "var(--color-monster-giant)";
                case "Monstrosities": return "var(--color-monster-monstrosity)";
                case "Oozes": return "var(--color-monster-ooze)";
                case "Plants": return "var(--color-monster-plant)";
                case "Aberrations": return "var(--color-monster-aberration)";
                case "Swarm": return "var(--color-monster-swarm)";
                default: return "var(--color-monster-default)";
              }
            };

            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border-l-4 ${
                  selectedCategories.includes(category)
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-text)]"
                    : "bg-[var(--color-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-card-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]"
                }`}
                style={{
                  borderLeftColor: category === "All Monsters" ? "var(--color-border)" : getCategoryBorderColor(category)
                }}
              >
                <Icon className="h-4 w-4" />
                {category}
                                  <span className="text-xs bg-[var(--color-card)] text-[var(--color-text-primary)] px-2 py-1 rounded-full">
                  {isLoading ? "..." : (categoryCounts[category] || 0)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count and active filters */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-[var(--color-text-secondary)]">
          {isLoading ? "Loading monsters..." : `Showing ${filteredAndSortedMonsters.length} of ${monsters.length} monsters`}
        </span>
        
        {/* CR Difficulty Legend - Clickable */}
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-text-secondary)]">CR Difficulty:</span>
          <div className="flex gap-1">
            <button
              onClick={() => toggleCR("0-1")}
              className={`text-xs px-2 py-1 rounded cursor-pointer transition-opacity ${
                selectedCRs.includes("0-1") ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background: "var(--color-success)",
                color: "var(--color-success-text)"
              }}
            >
              Easy (0-1)
            </button>
            <button
              onClick={() => toggleCR("2-5")}
              className={`text-xs px-2 py-1 rounded cursor-pointer transition-opacity ${
                selectedCRs.includes("2-5") ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background: "var(--color-warning)",
                color: "var(--color-warning-text)"
              }}
            >
              Medium (2-5)
            </button>
            <button
              onClick={() => toggleCR("6-10")}
              className={`text-xs px-2 py-1 rounded cursor-pointer transition-opacity ${
                selectedCRs.includes("6-10") ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background: "var(--color-accent)",
                color: "var(--color-accent-text)"
              }}
            >
              Hard (6-10)
            </button>
            <button
              onClick={() => toggleCR("11-15")}
              className={`text-xs px-2 py-1 rounded cursor-pointer transition-opacity ${
                selectedCRs.includes("11-15") ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background: "var(--color-error)",
                color: "var(--color-error-text)"
              }}
            >
              Deadly (11-15)
            </button>
            <button
              onClick={() => toggleCR("16-20")}
              className={`text-xs px-2 py-1 rounded cursor-pointer transition-opacity ${
                selectedCRs.includes("16-20") ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background: "var(--color-error-hover)",
                color: "var(--color-error-text)"
              }}
            >
              Very Deadly (16-20)
            </button>
            <button
              onClick={() => toggleCR("21+")}
              className={`text-xs px-2 py-1 rounded cursor-pointer transition-opacity ${
                selectedCRs.includes("21+") ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background: "var(--color-monster-monstrosity)",
                color: "var(--color-accent-text)"
              }}
            >
              Legendary (21+)
            </button>
          </div>
        </div>
        

        
        {(selectedCRs.length > 1 || selectedSize !== "all" || selectedAlignment !== "all") && (
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-text-secondary)]">Active filters:</span>
            {selectedCRs.length > 1 && selectedCRs.filter(cr => cr !== "all").map(cr => (
              <span key={cr} className="bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded text-xs">
                CR {cr}
              </span>
            ))}
            {selectedSize !== "all" && (
              <span className="bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded text-xs">
                {selectedSize}
              </span>
            )}
            {selectedAlignment !== "all" && (
              <span className="bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded text-xs">
                {selectedAlignment}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Monsters Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedMonsters.map((monster: Monster, index: number) => (
            <div
              key={`${monster.name}-${index}`}
              className="bg-[var(--color-card)] border-l-4 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              style={{
                borderLeftColor: getMonsterCategoryBorderColor(monster)
              }}
              onClick={() => {
                setSelectedMonster(monster);
                setIsModalOpen(true);
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-[var(--color-text-primary)] text-lg leading-tight">
                  {monster.name}
                </h3>
                <span
                  className="text-sm px-2 py-1 rounded whitespace-nowrap"
                  style={{
                    background: getCRDifficultyBg(monster.challengeRating),
                    color: getCRDifficultyTextColor(monster.challengeRating)
                  }}
                >
                  CR {monster.challengeRating}
                </span>
              </div>
              
              <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                {monster.size} {monster.type}
                {monster.subtype && <span className="text-xs"> ({monster.subtype})</span>}
              </p>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">HP:</span>
                  <span className="text-[var(--color-text-primary)]">{monster.hitPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">AC:</span>
                  <span className="text-[var(--color-text-primary)]">{monster.armorClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Speed:</span>
                  <span className="text-[var(--color-text-primary)] text-xs">
                    {monster.speed.walk ? `${monster.speed.walk} ft` : 
                     monster.speed.fly ? `${monster.speed.fly} ft fly` :
                     monster.speed.swim ? `${monster.speed.swim} ft swim` :
                     monster.speed.climb ? `${monster.speed.climb} ft climb` :
                     monster.speed.burrow ? `${monster.speed.burrow} ft burrow` : '0 ft'}
                  </span>
                </div>
                {monster.alignment && (
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Alignment:</span>
                    <span className="text-[var(--color-text-primary)] text-xs">{monster.alignment}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredAndSortedMonsters.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-secondary)]">No monsters found matching your criteria.</p>
                     <Button
             onClick={() => {
               setSearchTerm("");
               setSelectedCategories(["All Monsters"]);
               setSelectedCRs(["all"]);
               setSelectedSize("all");
               setSelectedAlignment("all");
               setSortField("name");
               setSortDirection("asc");
             }}
             variant="secondary"
             className="mt-4"
           >
             Clear All Filters
           </Button>
        </div>
      )}
      
      {/* Monster Detail Modal */}
      <MonsterDetailModal
        monster={selectedMonster}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMonster(null);
        }}
      />
    </MainLayout>
  );
} 