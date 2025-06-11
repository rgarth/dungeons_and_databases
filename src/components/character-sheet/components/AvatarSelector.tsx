"use client";

import { Image } from "lucide-react";

interface AvatarSelectorProps {
  selectedAvatar?: string;
  onAvatarSelect: (avatar: string | null) => void;
}

export function AvatarSelector({ selectedAvatar, onAvatarSelect }: AvatarSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium flex items-center gap-2">
          <Image className="h-4 w-4 text-blue-400" />
          Current Avatar
        </h4>
      </div>

      {/* Current Selection */}
      <div className="flex items-center gap-4">
        {selectedAvatar ? (
          <>
            <img
              src={selectedAvatar}
              alt="Current avatar"
              className="w-24 h-24 rounded-lg border border-slate-500 object-cover"
              onError={(e) => {
                // Hide broken images
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex-1">
              <div className="text-slate-300 text-sm font-medium">
                Generated Avatar
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
            <div className="text-slate-400 text-sm">
              No avatar set. Use &quot;Generate New Avatar&quot; below to create one.
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 