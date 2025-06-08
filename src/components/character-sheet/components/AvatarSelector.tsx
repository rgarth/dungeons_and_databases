"use client";

import { useState, useEffect } from "react";
import { Image, Filter } from "lucide-react";
import { useAppStartupPreloader } from "@/hooks/useAppStartupPreloader";
import { imageCache } from "@/hooks/useIndexedDBImageCache";

interface AvatarData {
  avatars: Array<{
    filename: string;
    race: string;
    class: string;
    gender: string;
    displayName: string;
    avatarNumber: number | null;
  }>;
  races: string[];
  classes: string[];
  genders: string[];
}

interface AvatarSelectorProps {
  selectedAvatar?: string;
  onAvatarSelect: (avatar: string | null) => void;
}

// Avatar grid item that tries IndexedDB first, falls back to direct URL
function AvatarGridItem({ 
  avatar, 
  isSelected, 
  onSelect
}: { 
  avatar: AvatarData['avatars'][0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [imageSrc, setImageSrc] = useState<string>(`/avatars/${avatar.filename}`);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Try to load from IndexedDB cache first
  useEffect(() => {
    const loadCachedImage = async () => {
      try {
        const cachedBlob = await imageCache.getImage(avatar.filename);
        if (cachedBlob) {
          const objectURL = URL.createObjectURL(cachedBlob);
          setImageSrc(objectURL);
          console.log('Image loaded from IndexedDB cache:', avatar.filename);
          
          // Clean up object URL when component unmounts
          return () => URL.revokeObjectURL(objectURL);
        }
      } catch (error) {
        console.warn('Failed to load from IndexedDB, using direct URL:', error);
        // Keep using the direct URL as fallback
      }
    };

    loadCachedImage();
  }, [avatar.filename]);

  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt={avatar.displayName}
        className={`w-full h-full object-cover rounded-lg cursor-pointer border-2 ${
          isSelected 
            ? 'border-blue-400' 
            : 'border-slate-500 hover:border-slate-400'
        } ${imageLoaded ? 'opacity-100' : 'opacity-75'}`}
        onClick={onSelect}
        title={`${avatar.displayName}${!imageLoaded ? ' (loading...)' : ''}`}
        style={{ minHeight: '80px', minWidth: '80px' }}
        onLoad={() => {
          setImageLoaded(true);
          console.log('Image rendered successfully:', imageSrc.includes('blob:') ? `${avatar.filename} (from cache)` : `/avatars/${avatar.filename}`);
        }}
        onError={(e) => {
          console.log('Image failed to render:', imageSrc);
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'block';
        }}
      />
      
      {/* Fallback text (hidden by default) */}
      <div 
        className="w-full h-full bg-slate-600 rounded-lg flex items-center justify-center cursor-pointer border-2 border-slate-500"
        style={{ display: 'none', minHeight: '80px' }}
        onClick={onSelect}
      >
        <div className="text-slate-300 text-xs text-center p-2">
          <div className="font-medium">{avatar.race}</div>
          <div>{avatar.class}</div>
          <div className="text-blue-300">{avatar.gender}</div>
        </div>
      </div>
    </div>
  );
}

export function AvatarSelector({ selectedAvatar, onAvatarSelect }: AvatarSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    race: '',
    class: '',
    gender: ''
  });
  const [avatarData, setAvatarData] = useState<AvatarData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use global preloader state
  const { 
    getCachedAvatarData
  } = useAppStartupPreloader();

  // Get avatar data (should already be cached by global preloader)
  useEffect(() => {
    const loadAvatars = async () => {
      try {
        // Try to get from global cache first
        const cachedData = getCachedAvatarData();
        if (cachedData) {
          setAvatarData(cachedData);
          setLoading(false);
          return;
        }

        // Fallback: fetch from API if global preloader hasn't run yet
        const response = await fetch('/api/avatars');
        const data = await response.json() as AvatarData;
        setAvatarData(data);
      } catch (error) {
        console.error('Failed to fetch avatars:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAvatars();
  }, []); // NO dependencies to prevent infinite loop

  if (loading || !avatarData) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Image className="h-4 w-4 text-blue-400" />
            Avatar
          </h4>
          <span className="text-slate-400 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  const { avatars: allAvatars, races: availableRaces, classes: availableClasses, genders: availableGenders } = avatarData;

  // Filter avatars based on current filters
  const filteredAvatars = allAvatars.filter(avatar => {
    if (filters.race && avatar.race !== filters.race) return false;
    if (filters.class && avatar.class !== filters.class) return false;
    if (filters.gender && avatar.gender !== filters.gender) return false;
    return true;
  });

  const clearFilters = () => {
    setFilters({ race: '', class: '', gender: '' });
  };

  const hasActiveFilters = filters.race || filters.class || filters.gender;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium flex items-center gap-2">
          <Image className="h-4 w-4 text-blue-400" />
          Avatar
        </h4>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white transition-colors text-sm"
        >
          {isOpen ? 'Hide' : 'Choose'}
        </button>
      </div>

      {/* Current Selection */}
      <div className="flex items-center gap-4">
        {selectedAvatar ? (
          <>
            <img
              src={`/avatars/${selectedAvatar}`}
              alt="Selected avatar"
              className="w-24 h-24 rounded-lg border border-slate-500 object-cover"
              onError={(e) => {
                // Hide broken images
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex-1">
              <div className="text-slate-300 text-sm font-medium">
                {selectedAvatar.replace(/\.png$/, '').replace(/_/g, ' ')}
              </div>
              <button
                onClick={() => onAvatarSelect(null)}
                className="text-red-400 hover:text-red-300 text-xs transition-colors"
              >
                Remove avatar
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-500 flex items-center justify-center">
              <Image className="h-8 w-8 text-slate-500" />
            </div>
            <div className="text-slate-400 text-sm">No avatar selected</div>
          </div>
        )}
      </div>

      {/* Avatar Selector Modal */}
      {isOpen && (
        <div className="bg-slate-600 rounded-lg p-4 space-y-4">
          {/* Filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Avatars
              </h5>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Race Filter */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">Race</label>
                <select
                  value={filters.race}
                  onChange={(e) => setFilters(prev => ({ ...prev, race: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Races</option>
                  {availableRaces.map(race => (
                    <option key={race} value={race}>{race}</option>
                  ))}
                </select>
              </div>

              {/* Class Filter */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">Class</label>
                <select
                  value={filters.class}
                  onChange={(e) => setFilters(prev => ({ ...prev, class: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Classes</option>
                  {availableClasses.map(characterClass => (
                    <option key={characterClass} value={characterClass}>{characterClass}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Genders</option>
                  {availableGenders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="text-xs text-slate-400">
            Showing {filteredAvatars.length} of {allAvatars.length} avatars
          </div>

          {/* Avatar Grid */}
          <div className="max-h-96 overflow-y-auto bg-slate-800 rounded p-3">
            <div className="grid grid-cols-4 gap-3">
              {filteredAvatars.map(avatar => (
                <div key={avatar.filename} className="w-20 h-20">
                  <AvatarGridItem 
                    avatar={avatar}
                    isSelected={selectedAvatar === avatar.filename}
                    onSelect={() => {
                      onAvatarSelect(avatar.filename);
                      setIsOpen(false);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
            
          {filteredAvatars.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <div>No avatars found matching current filters</div>
              <button
                onClick={clearFilters}
                className="text-blue-400 hover:text-blue-300 text-sm mt-2 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 