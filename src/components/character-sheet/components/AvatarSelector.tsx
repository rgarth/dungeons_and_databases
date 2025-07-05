"use client";

import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface AvatarSelectorProps {
  selectedAvatar?: string;
  fullBodyAvatar?: string;  // New: for showing full body in background tab
  onAvatarSelect: (avatar: string | null) => void;
  showFullBody?: boolean;   // New: whether to show full body or cropped
}

export function AvatarSelector({ selectedAvatar, fullBodyAvatar, onAvatarSelect, showFullBody = false }: AvatarSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[var(--color-text-primary)] font-medium flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-[var(--color-accent)]" />
          Current Avatar
        </h4>
      </div>

      {/* Current Selection */}
      <div className="flex items-center gap-4">
        {(showFullBody ? fullBodyAvatar : selectedAvatar) ? (
          <>
            <Image
              src={showFullBody ? fullBodyAvatar! : selectedAvatar!}
              alt={showFullBody ? "Character full body" : "Character avatar"}
              width={showFullBody ? 128 : 96}
              height={showFullBody ? 160 : 96}
              className={`rounded-lg border border-[var(--color-border)] object-cover ${showFullBody ? 'w-32 h-40' : 'w-24 h-24'}`}
              onError={(e) => {
                // Hide broken images
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex-1">
              <div className="text-[var(--color-text-secondary)] text-sm font-medium">
                {showFullBody ? 'Full Body Avatar' : 'Generated Avatar'}
              </div>
              <button
                onClick={() => onAvatarSelect(null)}
                className="text-[var(--color-error)] hover:text-[var(--color-error-hover)] text-xs transition-colors"
              >
                Remove avatar
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-[var(--color-border)] flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-[var(--color-text-tertiary)]" />
            </div>
            <div className="text-[var(--color-text-tertiary)] text-sm">
              No avatar set. Use &quot;Generate New Avatar&quot; below to create one.
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 