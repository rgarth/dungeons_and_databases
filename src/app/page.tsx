"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Plus, User, LogOut, Sword, Shield } from "lucide-react";
import { CharacterCard } from "../components/character-card";
import { CreateCharacterModal } from "../components/create-character-modal";
import { Weapon, MagicalWeapon, Armor, InventoryItem } from "@/lib/dnd/equipment";
import { Spell } from "@/lib/dnd/spells";
import { Action } from "@/lib/dnd/combat";
import { Treasure } from "@/lib/dnd/data";


// Use a simplified interface for the character list view
interface CharacterListItem {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  hitPoints: number;
  maxHitPoints: number;
  armorClass: number;
  // Include all other fields that might be returned by the API with defaults
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  speed?: number;
  proficiencyBonus?: number;
  background?: string;
  alignment?: string;
  skills?: string[];
  inventory?: InventoryItem[] | string[];
  equipment?: string[];
  weapons?: (Weapon | MagicalWeapon)[];
  inventoryWeapons?: (Weapon | MagicalWeapon)[];
  armor?: Armor[];
  inventoryArmor?: Armor[];
  spellsKnown?: Spell[]; // All spells known or in spellbook
  spellsPrepared?: Spell[]; // Currently prepared/equipped spells
  spellSlots?: Record<number, number>;
  spellcastingAbility?: string;
  spellSaveDC?: number;
  spellAttackBonus?: number;
  actions?: Action[];
  bonusActions?: Action[];
  reactions?: Action[];
  copperPieces?: number;
  silverPieces?: number;
  goldPieces?: number;
  treasures?: Treasure[];
  appearance?: string;
  personality?: string;
  backstory?: string;
  notes?: string;
  avatar?: string;
  equippedWeapons?: (Weapon | MagicalWeapon)[];
  deathSaveSuccesses?: number;
  deathSaveFailures?: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [characters, setCharacters] = useState<CharacterListItem[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    if (session) {
      fetchCharacters();
    } else if (status !== "loading") {
      // Only set loading to false if we're not still loading auth
      setLoading(false);
    }
  }, [session, status]);

  const fetchCharacters = async () => {
    try {
      const response = await fetch("/api/characters");
      if (response.ok) {
        const data = await response.json();
        setCharacters(data);
      }
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show spinner while auth is loading OR while we have a session but haven't loaded characters yet
  if (status === "loading" || (session && loading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <Sword className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Dungeons & Databases
            </h1>
            <p className="text-slate-300 text-lg">
              Manage your D&D characters with ease
            </p>
          </div>
          
          <button
            onClick={() => signIn("google")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <User className="h-5 w-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Sword className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Your Characters</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <User className="h-5 w-5" />
            <span>{session.user?.name}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Actual Characters */}
        {characters.map((character) => (
          <CharacterCard 
            key={character.id} 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            character={character as any} 
            onCharacterDeleted={fetchCharacters}
            onCharacterUpdated={fetchCharacters}
          />
        ))}
        
        {/* Create New Character Card */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="border-2 border-dashed border-slate-600 hover:border-purple-500 rounded-lg p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-purple-400 transition-colors min-h-[200px]"
        >
          <Plus className="h-12 w-12" />
          <span className="text-lg font-semibold">Create New Character</span>
        </button>
      </div>

      {/* Empty State */}
      {characters.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-slate-300 mb-2">
            No characters yet
          </h2>
          <p className="text-slate-500 mb-6">
            Create your first D&D character to get started
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Create Character
          </button>
        </div>
      )}

      {/* Create Character Modal */}
      {showCreateModal && (
        <CreateCharacterModal
          onClose={() => setShowCreateModal(false)}
          onCharacterCreated={() => {
            setShowCreateModal(false);
            fetchCharacters();
          }}
        />
      )}

      {/* Footer with Attribution */}
      <footer className="mt-16 pt-8 border-t border-slate-700 text-center">
        <div className="text-slate-400 text-sm space-y-2">
          <p>
            Content from the{' '}
            <a 
              href="https://dnd.wizards.com/resources/systems-reference-document" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              D&D 5e System Reference Document
            </a>
            {' '}by Wizards of the Coast LLC
          </p>
          <p>
            <a 
              href="/legal" 
              className="text-purple-400 hover:text-purple-300 underline"
            >
              View Complete Legal Information & Licensing
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
