"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { Card, Button } from "./ui";

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
    <div className="fixed inset-0 bg-[var(--color-surface)] bg-opacity-50 flex items-start justify-center p-4 pt-8 z-[60]">
      <Card className="w-full max-w-md border-[var(--color-danger)]/20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-danger)]/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-[var(--color-danger)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Delete Character</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">This action cannot be undone</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[var(--color-text-secondary)]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[var(--color-text-primary)]">&ldquo;{characterName}&rdquo;</span>?
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              All character data, including stats, inventory, and notes will be permanently removed.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="ghost"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-danger-text)]"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Character
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 