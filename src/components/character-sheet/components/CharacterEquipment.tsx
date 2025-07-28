"use client";

import { Swords, Shield, Package, Plus } from "lucide-react";
import { Weapon, MagicalWeapon, Armor } from "@/lib/dnd/equipment";
import { MagicalItem, EquippedMagicalItem } from "@/lib/dnd/magical-items";

interface CharacterEquipmentProps {
  character: {
    weapons?: (Weapon | MagicalWeapon)[];
    armor?: Armor[];
    magicalItems?: EquippedMagicalItem[];
    inventoryMagicalItems?: MagicalItem[];
    attunedItems?: string[];
  };
  onAddWeapon?: () => void;
  onAddArmor?: () => void;
  onAddMagicalItem?: () => void;
  onEquipWeapon?: (weapon: Weapon | MagicalWeapon, fromInventoryIndex: number) => void;
  onUnequipWeapon?: (weapon: Weapon | MagicalWeapon, fromEquippedIndex: number) => void;
  onEquipArmor?: (armor: Armor, fromInventoryIndex: number) => void;
  onUnequipArmor?: (armor: Armor, fromEquippedIndex: number) => void;
  onEquipMagicalItem?: (item: MagicalItem, fromInventoryIndex: number) => void;
  onUnequipMagicalItem?: (itemIndex: number) => void;
  onToggleAttunement?: (itemName: string) => void;
}

export function CharacterEquipment({
  character,
  onAddWeapon,
  onAddArmor,
  onAddMagicalItem,
  onEquipWeapon,
  onUnequipWeapon,
  onEquipArmor,
  onUnequipArmor,
  onEquipMagicalItem,
  onUnequipMagicalItem,
  onToggleAttunement
}: CharacterEquipmentProps) {
  
  const equippedWeapons = character.weapons?.filter(weapon => weapon.equipped) || [];
  const inventoryWeapons = character.weapons?.filter(weapon => !weapon.equipped) || [];
  const equippedArmor = character.armor?.filter(armor => armor.equipped) || [];
  const inventoryArmor = character.armor?.filter(armor => !armor.equipped) || [];
  const equippedMagicalItems = character.magicalItems || [];
  const inventoryMagicalItems = character.inventoryMagicalItems || [];

  const isAttuned = (itemName: string) => {
    return character.attunedItems?.includes(itemName) || false;
  };

  return (
    <div className="space-y-6">
      {/* Weapons */}
      <div className="bg-slate-700 rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white" style={{ color: 'var(--color-text-primary)' }}>
              Weapons
            </h3>
          </div>
          {onAddWeapon && (
            <button
              onClick={onAddWeapon}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Weapon
            </button>
          )}
        </div>

        {/* Equipped Weapons */}
        {equippedWeapons.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Equipped
            </h4>
            <div className="space-y-2">
              {equippedWeapons.map((weapon, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-600 rounded" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
                  <div>
                    <div className="text-white font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {weapon.name}
                    </div>
                    <div className="text-sm text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                      {weapon.damage} • {weapon.damageType}
                    </div>
                  </div>
                  {onUnequipWeapon && (
                    <button
                      onClick={() => onUnequipWeapon(weapon, index)}
                      className="text-slate-400 hover:text-white transition-colors"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Unequip
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inventory Weapons */}
        {inventoryWeapons.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Inventory
            </h4>
            <div className="space-y-2">
              {inventoryWeapons.map((weapon, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-600 rounded" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
                  <div>
                    <div className="text-white font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {weapon.name}
                    </div>
                    <div className="text-sm text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                      {weapon.damage} • {weapon.damageType}
                    </div>
                  </div>
                  {onEquipWeapon && (
                    <button
                      onClick={() => onEquipWeapon(weapon, index)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Equip
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Armor */}
      <div className="bg-slate-700 rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white" style={{ color: 'var(--color-text-primary)' }}>
              Armor
            </h3>
          </div>
          {onAddArmor && (
            <button
              onClick={onAddArmor}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Armor
            </button>
          )}
        </div>

        {/* Equipped Armor */}
        {equippedArmor.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Equipped
            </h4>
            <div className="space-y-2">
              {equippedArmor.map((armor, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-600 rounded" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
                  <div>
                    <div className="text-white font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {armor.name}
                    </div>
                    <div className="text-sm text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                      AC {armor.baseAC} • {armor.type}
                    </div>
                  </div>
                  {onUnequipArmor && (
                    <button
                      onClick={() => onUnequipArmor(armor, index)}
                      className="text-slate-400 hover:text-white transition-colors"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Unequip
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inventory Armor */}
        {inventoryArmor.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Inventory
            </h4>
            <div className="space-y-2">
              {inventoryArmor.map((armor, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-600 rounded" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
                  <div>
                    <div className="text-white font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {armor.name}
                    </div>
                    <div className="text-sm text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                      AC {armor.baseAC} • {armor.type}
                    </div>
                  </div>
                  {onEquipArmor && (
                    <button
                      onClick={() => onEquipArmor(armor, index)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Equip
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Magical Items */}
      <div className="bg-slate-700 rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white" style={{ color: 'var(--color-text-primary)' }}>
              Magical Items
            </h3>
          </div>
          {onAddMagicalItem && (
            <button
              onClick={onAddMagicalItem}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          )}
        </div>

        {/* Equipped Magical Items */}
        {equippedMagicalItems.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Equipped
            </h4>
            <div className="space-y-2">
              {equippedMagicalItems.map((item, index) => (
                <div key={index} className="p-2 bg-slate-600 rounded" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.requiresAttunement && (
                        <button
                          onClick={() => onToggleAttunement?.(item.name)}
                          className={`px-2 py-1 text-xs rounded ${
                            isAttuned(item.name)
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-500 text-slate-300 hover:bg-slate-400'
                          }`}
                        >
                          {isAttuned(item.name) ? 'Attuned' : 'Attune'}
                        </button>
                      )}
                      {onUnequipMagicalItem && (
                        <button
                          onClick={() => onUnequipMagicalItem(index)}
                          className="text-slate-400 hover:text-white transition-colors text-sm"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          Unequip
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.rarity} • {item.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inventory Magical Items */}
        {inventoryMagicalItems.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Inventory
            </h4>
            <div className="space-y-2">
              {inventoryMagicalItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-600 rounded" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
                  <div>
                    <div className="text-white font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </div>
                    <div className="text-sm text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.rarity} • {item.type}
                    </div>
                  </div>
                  {onEquipMagicalItem && (
                    <button
                      onClick={() => onEquipMagicalItem(item, index)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Equip
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 