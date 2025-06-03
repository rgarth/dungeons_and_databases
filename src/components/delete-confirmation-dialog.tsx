"use client";

import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  characterName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmationDialog({ 
  isOpen, 
  characterName, 
  onConfirm, 
  onCancel, 
  isDeleting = false 
}: DeleteConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-slate-800 rounded-lg w-full max-w-md border border-red-500/20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Delete Character</h3>
              <p className="text-sm text-slate-400">This action cannot be undone</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-slate-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">&ldquo;{characterName}&rdquo;</span>?
            </p>
            <p className="text-sm text-slate-400 mt-2">
              All character data, including stats, inventory, and notes will be permanently removed.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Character
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 