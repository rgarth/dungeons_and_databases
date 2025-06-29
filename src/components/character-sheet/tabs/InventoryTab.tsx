"use client";

import { Package, Trash2, Plus, Minus, Coins, Zap, Backpack } from "lucide-react";
import { EQUIPMENT_CATEGORIES } from "@/lib/dnd/equipment";
import { equipmentData } from "../../../../prisma/data/equipment-data";
import type { InventoryItem } from "@/lib/dnd/equipment";
import type { Treasure } from "@/lib/dnd/data";
import { getAllTreasures } from "@/lib/dnd/treasure-data-helper";
import { useState, useEffect } from "react";

interface InventoryTabProps {
  inventory: InventoryItem[];
  copperPieces: number;
  silverPieces: number;
  goldPieces: number;
  treasures: Treasure[];
  onInventoryUpdate: (inventory: InventoryItem[]) => void;
  onMoneyUpdate: (updates: { copperPieces?: number; silverPieces?: number; goldPieces?: number }) => void;
  onTreasuresUpdate: (treasures: Treasure[]) => void;
}

// Equipment categories for organization
const EQUIPMENT_CATEGORIES_ORGANIZED: Record<string, string[]> = {
  "Starting Equipment": [
    "Backpack", "Bedroll", "Mess Kit", "Tinderbox", "Torch", "Rations (1 day)", "Waterskin", "Rope, Hempen (50 feet)",
    "Chest", "Case, Map or Scroll", "Clothes, Fine", "Ink (1 ounce bottle)", "Ink Pen", "Lamp", "Paper (one sheet)", 
    "Perfume (vial)", "Sealing Wax", "Soap", "Clothes, Costume", "Disguise Kit", "Blanket", "Alms Box", 
    "Incense (1 block)", "Censer", "Vestments", "Book", "Parchment (one sheet)", "Little Bag of Sand", "Small Knife"
  ],
  "Adventuring Gear": [
    "Ball Bearings (bag of 1,000)", "String (10 feet)", "Bell", "Crowbar", "Hammer", "Piton", "Lantern, Hooded", "Oil (flask)",
    "Abacus", "Acid (vial)", "Alchemist's Fire (flask)", "Ammunition, Arrows (20)", "Ammunition, Blowgun Needles (50)",
    "Ammunition, Crossbow Bolts (20)", "Ammunition, Sling Bullets (20)", "Antitoxin (vial)", "Barrel", "Basket",
    "Block and Tackle", "Bottle, Glass", "Bucket", "Caltrops (bag of 20)", "Case, Crossbow Bolt", "Chain (10 feet)",
    "Chalk (1 piece)", "Climber's Kit", "Clothes, Common", "Clothes, Traveler's", "Component Pouch", "Fishing Tackle",
    "Flask or Tankard", "Grappling Hook", "Hammer, Sledge", "Healer's Kit", "Holy Water (flask)", "Hourglass",
    "Hunting Trap", "Jug or Pitcher", "Ladder (10-foot)", "Lock", "Magnifying Glass", "Manacles", "Mirror, Steel",
    "Pole (10-foot)", "Pot, Iron", "Potion of Healing", "Pouch", "Quiver", "Ram, Portable", "Robes", "Sack",
    "Scale, Merchant's", "Shovel", "Signal Whistle", "Signet Ring", "Spellbook", "Spikes, Iron (10)", "Spyglass",
    "Tent, Two-person", "Vial", "Whetstone"
  ],
  "Tools & Equipment": [
    "Crowbar", "Hammer", "Piton", "Tinderbox", "Lantern, Hooded", "Disguise Kit", "Small Knife", "Healer's Kit",
    "Climber's Kit", "Fishing Tackle", "Lock", "Manacles", "Pick, Miner's", "Ram, Portable", "Shovel"
  ],
  "Lighting & Fire": [
    "Candle", "Torch", "Oil (flask)", "Tinderbox", "Lamp", "Lantern, Bullseye", "Lantern, Hooded"
  ],
  "Survival Gear": [
    "Bedroll", "Rations (1 day)", "Waterskin", "Rope, Hempen (50 feet)", "Rope, Silk (50 feet)", "Tent, Two-person",
    "Blanket", "Clothes, Traveler's"
  ],
  "Containers": [
    "Backpack", "Waterskin", "Barrel", "Basket", "Bottle, Glass", "Bucket", "Chest", "Case, Crossbow Bolt",
    "Case, Map or Scroll", "Flask or Tankard", "Jug or Pitcher", "Pouch", "Quiver", "Sack", "Vial"
  ],
  "Clothing & Apparel": [
    "Clothes, Common", "Clothes, Costume", "Clothes, Fine", "Clothes, Traveler's", "Robes", "Vestments"
  ],
  "Writing & Study": [
    "Book", "Ink (1 ounce bottle)", "Ink Pen", "Paper (one sheet)", "Parchment (one sheet)", "Little Bag of Sand",
    "Sealing Wax", "Spellbook"
  ],
  "Religious Items": [
    "Alms Box", "Incense (1 block)", "Censer", "Vestments", "Holy Water (flask)"
  ],
  "Miscellaneous": [] // For items that don't fit other categories
};

// Function to categorize an item
const categorizeItem = (itemName: string): string => {
  for (const [category, items] of Object.entries(EQUIPMENT_CATEGORIES_ORGANIZED)) {
    if (items.includes(itemName)) {
      return category;
    }
  }
  // Debug logging for uncategorized items
  console.log(`⚠️ Uncategorized item: "${itemName}" - adding to Miscellaneous`);
  return "Miscellaneous";
};

// Function to organize inventory into categories
const organizeInventory = (inventory: InventoryItem[]) => {
  const organized: Record<string, InventoryItem[]> = {};
  
  // Initialize categories
  Object.keys(EQUIPMENT_CATEGORIES_ORGANIZED).forEach(category => {
    organized[category] = [];
  });
  
  console.log('🔍 Organizing inventory:', inventory.map(item => `${item.name} (${item.quantity})`));
  
  // Categorize items
  inventory.forEach(item => {
    const category = categorizeItem(item.name);
    if (!organized[category]) {
      organized[category] = [];
    }
    organized[category].push(item);
  });
  
  // Remove empty categories
  Object.keys(organized).forEach(category => {
    if (organized[category].length === 0) {
      delete organized[category];
    }
  });
  
  console.log('📦 Organized inventory:', Object.entries(organized).map(([category, items]) => 
    `${category}: ${items.map(item => `${item.name} (${item.quantity})`).join(', ')}`
  ));
  
  return organized;
};

export function InventoryTab({
  inventory,
  copperPieces,
  silverPieces,
  goldPieces,
  treasures,
  onInventoryUpdate,
  onMoneyUpdate,
  onTreasuresUpdate
}: InventoryTabProps) {
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Adventuring Gear");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [addMode, setAddMode] = useState<"equipment" | "custom">("equipment");
  const [newTreasureName, setNewTreasureName] = useState("");
  const [newTreasureValue, setNewTreasureValue] = useState("");
  const [selectedTreasure, setSelectedTreasure] = useState("");
  const [treasureAddMode, setTreasureAddMode] = useState<"database" | "custom">("database");
  const [allTreasures, setAllTreasures] = useState<Treasure[]>([]);

  // Organize inventory into categories
  const organizedInventory = organizeInventory(inventory);

  // Load treasure database on component mount
  useEffect(() => {
    const loadTreasures = async () => {
      try {
        const treasureData = await getAllTreasures();
        setAllTreasures(treasureData);
      } catch (error) {
        console.error('Error loading treasures:', error);
      }
    };
    loadTreasures();
  }, []);

  const handleAddItem = () => {
    if (addMode === "equipment" && selectedEquipment) {
      const allEquipment = equipmentData.filter(e => e.type === selectedCategory);
      const equipment = allEquipment.find((e) => e.name === selectedEquipment);
      if (equipment) {
        const existingItemIndex = inventory.findIndex(item => item.name === equipment.name);
        let updatedInventory: InventoryItem[];
        
        if (existingItemIndex >= 0 && equipment.stackable) {
          updatedInventory = [...inventory];
          updatedInventory[existingItemIndex].quantity += 1;
        } else if (existingItemIndex >= 0 && !equipment.stackable) {
          return;
        } else {
          updatedInventory = [...inventory, { name: equipment.name, quantity: 1 }];
        }
        
        onInventoryUpdate(updatedInventory);
        setSelectedEquipment("");
      }
    } else if (addMode === "custom" && newItem.trim()) {
      const existingItemIndex = inventory.findIndex(item => item.name === newItem.trim());
      let updatedInventory: InventoryItem[];
      
      if (existingItemIndex >= 0) {
        updatedInventory = [...inventory];
        updatedInventory[existingItemIndex].quantity += 1;
      } else {
        updatedInventory = [...inventory, { name: newItem.trim(), quantity: 1 }];
      }
      
      onInventoryUpdate(updatedInventory);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    onInventoryUpdate(updatedInventory);
  };

  const handleQuantityChange = (index: number, change: number) => {
    const updatedInventory = [...inventory];
    const newQuantity = updatedInventory[index].quantity + change;
    
    if (newQuantity <= 0) {
      updatedInventory.splice(index, 1);
    } else {
      updatedInventory[index].quantity = newQuantity;
    }
    
    onInventoryUpdate(updatedInventory);
  };

  const handleMoneyChange = (type: 'copper' | 'silver' | 'gold', change: number) => {
    const updates: {
      copperPieces?: number;
      silverPieces?: number;
      goldPieces?: number;
    } = {};
    
    if (type === 'copper') {
      updates.copperPieces = Math.max(0, copperPieces + change);
    } else if (type === 'silver') {
      updates.silverPieces = Math.max(0, silverPieces + change);
    } else if (type === 'gold') {
      updates.goldPieces = Math.max(0, goldPieces + change);
    }
    
    onMoneyUpdate(updates);
  };

  const handleAddTreasure = () => {
    let treasureTemplate: Treasure | undefined;
    
    if (treasureAddMode === "database" && selectedTreasure) {
      treasureTemplate = allTreasures.find(t => t.name === selectedTreasure);
    } else if (treasureAddMode === "custom" && newTreasureName.trim() && newTreasureValue.trim()) {
      const value = parseInt(newTreasureValue);
      if (!isNaN(value) && value > 0) {
        treasureTemplate = {
          name: newTreasureName.trim(),
          type: "Custom",
          value: value,
          description: "Custom treasure item"
        };
      }
    }
    
    if (treasureTemplate) {
      const updatedTreasures = [...treasures, { ...treasureTemplate }];
      onTreasuresUpdate(updatedTreasures);
      setSelectedTreasure("");
      setNewTreasureName("");
      setNewTreasureValue("");
    }
  };

  const handleRemoveTreasure = (index: number) => {
    const updatedTreasures = treasures.filter((_, i) => i !== index);
    onTreasuresUpdate(updatedTreasures);
  };

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Starting Equipment":
        return <Backpack className="h-4 w-4" />;
      case "Adventuring Gear":
        return <Package className="h-4 w-4" />;
      case "Tools & Equipment":
        return <Package className="h-4 w-4" />;
      case "Lighting & Fire":
        return <Zap className="h-4 w-4" />;
      case "Survival Gear":
        return <Package className="h-4 w-4" />;
      case "Containers":
        return <Backpack className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Organized Inventory */}
        <div className="space-y-6">
          {/* Add Item Controls */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Items
            </h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setAddMode("equipment")}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    addMode === "equipment" 
                      ? "bg-purple-600 text-white" 
                      : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                  }`}
                >
                  Equipment
                </button>
                <button
                  onClick={() => setAddMode("custom")}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    addMode === "custom" 
                      ? "bg-purple-600 text-white" 
                      : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                  }`}
                >
                  Custom
                </button>
              </div>

              {addMode === "equipment" ? (
                <div className="space-y-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                  >
                    {EQUIPMENT_CATEGORIES.filter(cat => cat !== 'Armor').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <select
                      value={selectedEquipment}
                      onChange={(e) => setSelectedEquipment(e.target.value)}
                      className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select item...</option>
                      {equipmentData.filter(equipment => equipment.type === selectedCategory && equipment.type !== 'Armor').map(equipment => (
                        <option key={equipment.name} value={equipment.name}>
                          {equipment.name} ({equipment.cost})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddItem}
                      disabled={!selectedEquipment}
                      className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter custom item name..."
                    className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  />
                  <button
                    onClick={handleAddItem}
                    disabled={!newItem.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Organized Inventory Categories */}
          <div className="space-y-4">
            {Object.entries(organizedInventory).map(([category, items]) => (
              <div key={category} className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category}
                  <span className="text-slate-400 text-sm font-normal">({items.length} items)</span>
                </h3>
                
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const globalIndex = inventory.findIndex(invItem => invItem.name === item.name);
                    return (
                      <div key={`${category}-${index}`} className="bg-slate-600 p-3 rounded flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-white font-medium">{item.name}</span>
                          {item.quantity > 1 && (
                            <span className="text-slate-400 text-sm ml-2">x{item.quantity}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(globalIndex, -1)}
                            className="w-6 h-6 bg-slate-500 hover:bg-slate-400 rounded text-white text-xs"
                          >
                            <Minus className="h-3 w-3 mx-auto" />
                          </button>
                          <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(globalIndex, 1)}
                            className="w-6 h-6 bg-slate-500 hover:bg-slate-400 rounded text-white text-xs"
                          >
                            <Plus className="h-3 w-3 mx-auto" />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(globalIndex)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {Object.keys(organizedInventory).length === 0 && (
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-center py-6 border-2 border-dashed border-slate-600 rounded-lg">
                  <Package className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No items in inventory</p>
                  <p className="text-slate-600 text-xs">Add equipment or custom items above</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Money & Treasures */}
        <div className="space-y-6">
          {/* Money */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-400" />
              Money
            </h3>
            <div className="space-y-3">
              {/* Gold */}
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-medium">Gold Pieces</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoneyChange('gold', -1)}
                    disabled={goldPieces <= 0}
                    className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                  >
                    <Minus className="h-3 w-3 mx-auto" />
                  </button>
                  <span className="text-white font-bold w-8 text-center">{goldPieces}</span>
                  <button
                    onClick={() => handleMoneyChange('gold', 1)}
                    className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded text-white text-sm"
                  >
                    <Plus className="h-3 w-3 mx-auto" />
                  </button>
                </div>
              </div>
              {/* Silver */}
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Silver Pieces</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoneyChange('silver', -1)}
                    disabled={silverPieces <= 0}
                    className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                  >
                    <Minus className="h-3 w-3 mx-auto" />
                  </button>
                  <span className="text-white font-bold w-8 text-center">{silverPieces}</span>
                  <button
                    onClick={() => handleMoneyChange('silver', 1)}
                    className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded text-white text-sm"
                  >
                    <Plus className="h-3 w-3 mx-auto" />
                  </button>
                </div>
              </div>
              {/* Copper */}
              <div className="flex items-center justify-between">
                <span className="text-orange-400 font-medium">Copper Pieces</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoneyChange('copper', -1)}
                    disabled={copperPieces <= 0}
                    className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                  >
                    <Minus className="h-3 w-3 mx-auto" />
                  </button>
                  <span className="text-white font-bold w-8 text-center">{copperPieces}</span>
                  <button
                    onClick={() => handleMoneyChange('copper', 1)}
                    className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded text-white text-sm"
                  >
                    <Plus className="h-3 w-3 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Treasures */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              Treasures & Valuables
            </h3>
            
            {/* Add Treasure Mode Toggle */}
            <div className="flex gap-1 mb-4">
              <button
                onClick={() => setTreasureAddMode("database")}
                className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors ${
                  treasureAddMode === "database" 
                    ? "bg-purple-600 text-white" 
                    : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                }`}
              >
                Database
              </button>
              <button
                onClick={() => setTreasureAddMode("custom")}
                className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors ${
                  treasureAddMode === "custom" 
                    ? "bg-purple-600 text-white" 
                    : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                }`}
              >
                Custom
              </button>
            </div>

            {/* Add Treasure */}
            {treasureAddMode === "database" ? (
              <div className="flex gap-2 mb-4">
                <select
                  value={selectedTreasure}
                  onChange={(e) => setSelectedTreasure(e.target.value)}
                  className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select treasure...</option>
                  {allTreasures.map(treasure => (
                    <option key={treasure.name} value={treasure.name}>
                      {treasure.name} ({treasure.value} gp)
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddTreasure}
                  disabled={!selectedTreasure}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  value={newTreasureName}
                  onChange={(e) => setNewTreasureName(e.target.value)}
                  placeholder="Treasure name..."
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newTreasureValue}
                    onChange={(e) => setNewTreasureValue(e.target.value)}
                    placeholder="Value in gp..."
                    className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={handleAddTreasure}
                    disabled={!newTreasureName.trim() || !newTreasureValue.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Treasure List */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {treasures.map((treasure, index) => (
                <div key={index} className="bg-slate-600 p-3 rounded flex items-center justify-between">
                  <div className="flex-1">
                    <span className="text-white font-medium">{treasure.name}</span>
                    <span className="text-purple-400 text-sm ml-2">{treasure.value} gp</span>
                  </div>
                  <button
                    onClick={() => handleRemoveTreasure(index)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {treasures.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed border-slate-600 rounded-lg">
                  <Zap className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No treasures collected</p>
                  <p className="text-slate-600 text-xs">Add treasures from database or create custom ones</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 