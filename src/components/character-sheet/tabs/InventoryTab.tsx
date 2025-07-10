"use client";

import { Package, Trash2, Plus, Minus, Coins, Zap, Search } from "lucide-react";
// Equipment categories will be dynamically generated from the equipment data
import type { InventoryItem } from "@/lib/dnd/equipment";
import type { Treasure } from "@/lib/dnd/data";
import { getAllTreasures } from "@/lib/dnd/treasure-data-helper";
import { useState, useEffect } from "react";

interface Equipment {
  id: number;
  name: string;
  type: string;
  cost: number;
  weight: number;
  stackable: boolean;
  description?: string;
}

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

// Equipment categories will be dynamically generated from the equipment data

// Function to categorize an item using the actual equipment data
const categorizeItem = (itemName: string, equipmentData: Equipment[]): string => {
  // Normalize the item name for better matching
  const normalizedName = itemName.toLowerCase().trim();
  
  // First, try to find the item in the equipment data
  const equipmentItem = equipmentData.find(item => 
    item.name.toLowerCase().trim() === normalizedName ||
    item.name === itemName
  );
  
  if (equipmentItem) {
    console.log(`📦 Found equipment item: "${itemName}" with type "${equipmentItem.type}"`);
    return equipmentItem.type;
  }
  
  // If not found in equipment data, check for partial matches
  for (const item of equipmentData) {
    const normalizedItem = item.name.toLowerCase().trim();
    if (normalizedName.includes(normalizedItem) || normalizedItem.includes(normalizedName)) {
      console.log(`🔍 Partial match found: "${itemName}" matches "${item.name}" in category "${item.type}"`);
      return item.type;
    }
  }
  
  // Debug logging for uncategorized items
  console.log(`⚠️ Uncategorized item: "${itemName}" - adding to Miscellaneous`);
  return "Miscellaneous";
};

// Function to organize inventory into categories
const organizeInventory = (inventory: InventoryItem[], equipmentData: Equipment[]) => {
  const organized: Record<string, InventoryItem[]> = {};
  
  // Initialize categories based on equipment data types
  const categories = new Set<string>();
  equipmentData.forEach(item => categories.add(item.type));
  categories.add("Miscellaneous"); // Always include miscellaneous
  
  categories.forEach(category => {
    organized[category] = [];
  });
  
  console.log('🔍 Organizing inventory:', inventory.map(item => `${item.name} (${item.quantity})`));
  
  // Categorize items
  inventory.forEach(item => {
    const category = categorizeItem(item.name, equipmentData);
    if (!organized[category]) {
      organized[category] = [];
    }
    organized[category].push(item);
    console.log(`📦 Categorized "${item.name}" → ${category}`);
  });
  
  // Remove empty categories
  Object.keys(organized).forEach(category => {
    if (organized[category].length === 0) {
      delete organized[category];
    }
  });
  
  console.log('📦 Final organized inventory:', Object.entries(organized).map(([category, items]) => 
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [treasureSearchTerm, setTreasureSearchTerm] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [addMode, setAddMode] = useState<"equipment" | "custom">("equipment");
  const [newTreasureName, setNewTreasureName] = useState("");
  const [newTreasureValue, setNewTreasureValue] = useState("");
  const [selectedTreasure, setSelectedTreasure] = useState("");
  const [treasureAddMode, setTreasureAddMode] = useState<"database" | "custom">("database");
  const [allTreasures, setAllTreasures] = useState<Treasure[]>([]);
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);

  // Organize inventory into categories
  const organizedInventory = organizeInventory(inventory, equipmentData);

  // Load equipment and treasure database on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load equipment data
        const equipmentResponse = await fetch('/api/equipment');
        if (equipmentResponse.ok) {
          const equipment = await equipmentResponse.json();
          setEquipmentData(equipment);
          
          // Set default category to "All Categories"
          setSelectedCategory("All Categories");
        }

        // Load treasure data
        const treasureData = await getAllTreasures();
        setAllTreasures(treasureData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleAddItem = () => {
    if (addMode === "equipment" && selectedEquipment) {
      // Find equipment by name across all categories (for search results)
      const equipment = equipmentData.find((e) => e.name === selectedEquipment);
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
      case "Adventuring Gear":
        return <Package className="h-4 w-4" />;
      case "Tools":
        return <Zap className="h-4 w-4" />;
      case "Arcane Focus":
        return <Zap className="h-4 w-4" />;
      case "Druidcraft Focus":
        return <Zap className="h-4 w-4" />;
      case "Holy Symbol":
        return <Coins className="h-4 w-4" />;
      case "Trade Goods":
        return <Coins className="h-4 w-4" />;
      case "Containers":
        return <Package className="h-4 w-4" />;
      case "Miscellaneous":
        return <Package className="h-4 w-4" />;
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
          <div className="bg-[var(--color-card)] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Items
            </h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setAddMode("equipment")}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    addMode === "equipment" 
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-text)]" 
                      : "bg-[var(--color-card-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-tertiary)]"
                  }`}
                >
                  Equipment
                </button>
                <button
                  onClick={() => setAddMode("custom")}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    addMode === "custom" 
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-text)]" 
                      : "bg-[var(--color-card-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-tertiary)]"
                  }`}
                >
                  Custom
                </button>
              </div>

              {addMode === "equipment" ? (
                <div className="space-y-2">
                  {/* Global Search */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search all available equipment..."
                      className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 pl-10 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]" />
                  </div>

                  {/* Global Search Results */}
                  {searchTerm && (
                    <div className="bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded p-3 max-h-48 overflow-y-auto">
                      <div className="text-sm text-[var(--color-text-secondary)] mb-2">Search Results:</div>
                      {equipmentData
                        .filter(equipment => 
                          equipment.type !== 'Armor' &&
                          equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .slice(0, 10) // Limit to 10 results
                        .map(equipment => (
                          <div 
                            key={equipment.name}
                            onClick={() => {
                              setSelectedEquipment(equipment.name);
                              setSearchTerm("");
                            }}
                            className="flex justify-between items-center p-2 hover:bg-[var(--color-card-tertiary)] rounded cursor-pointer text-sm"
                          >
                            <span className="text-[var(--color-text-primary)]">{equipment.name}</span>
                            <span className="text-[var(--color-text-secondary)] text-xs">{equipment.cost} - {equipment.type}</span>
                          </div>
                        ))}
                      {equipmentData.filter(equipment => 
                        equipment.type !== 'Armor' &&
                        equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length === 0 && (
                        <div className="text-[var(--color-text-secondary)] text-sm p-2">No items found</div>
                      )}
                    </div>
                  )}

                  {/* Category Browsing (when no search) */}
                  {!searchTerm && (
                    <>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                      >
                        <option value="All Categories">All Categories</option>
                        {Array.from(new Set(equipmentData.map(item => item.type))).filter(cat => cat !== 'Armor').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      
                      <div className="flex gap-2">
                        <select
                          value={selectedEquipment}
                          onChange={(e) => setSelectedEquipment(e.target.value)}
                          className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none min-w-0"
                          style={{ textOverflow: 'ellipsis' }}
                        >
                          <option value="">Select item...</option>
                          {equipmentData
                            .filter(equipment => 
                              (selectedCategory === "All Categories" || equipment.type === selectedCategory) && 
                              equipment.type !== 'Armor'
                            )
                            .map(equipment => (
                              <option key={equipment.name} value={equipment.name} className="truncate">
                                {equipment.name} ({equipment.cost}) - {equipment.type}
                              </option>
                            ))}
                        </select>
                        <button
                          onClick={handleAddItem}
                          disabled={!selectedEquipment}
                          className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] p-2 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}

                  {/* Add button for search results */}
                  {searchTerm && selectedEquipment && (
                    <div className="flex gap-2">
                      <select
                        value={selectedEquipment}
                        className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm"
                        disabled
                      >
                        <option value={selectedEquipment}>{selectedEquipment}</option>
                      </select>
                      <button
                        onClick={handleAddItem}
                        className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] p-2 rounded transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter custom item name..."
                    className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  />
                  <button
                    onClick={handleAddItem}
                    disabled={!newItem.trim()}
                    className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] p-2 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Magical Items Notice */}
            <div className="mt-4 p-3 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded-lg">
              <p className="text-[var(--color-text-secondary)] text-sm">
                💡 <strong>Looking for magical items?</strong> Check the <strong>Gear & Equipment</strong> tab to add and manage magical items like Bag of Holding, potions, scrolls, and more!
              </p>
            </div>
          </div>

          {/* Organized Inventory Categories */}
          <div className="space-y-4">
            {Object.entries(organizedInventory).map(([category, items]) => (
              <div key={category} className="bg-[var(--color-card)] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category}
                  <span className="text-[var(--color-text-secondary)] text-sm font-normal">({items.length} items)</span>
                </h3>
                
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const globalIndex = inventory.findIndex(invItem => invItem.name === item.name);
                    return (
                      <div key={`${category}-${index}`} className="bg-[var(--color-card-secondary)] p-3 rounded flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-[var(--color-text-primary)] font-medium">{item.name}</span>
                          {item.quantity > 1 && (
                            <span className="text-[var(--color-text-secondary)] text-sm ml-2">x{item.quantity}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(globalIndex, -1)}
                            className="w-6 h-6 bg-[var(--color-card-tertiary)] hover:bg-[var(--color-border-light)] rounded text-[var(--color-text-primary)] text-xs"
                          >
                            <Minus className="h-3 w-3 mx-auto" />
                          </button>
                          <span className="text-[var(--color-text-primary)] text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(globalIndex, 1)}
                            className="w-6 h-6 bg-[var(--color-card-tertiary)] hover:bg-[var(--color-border-light)] rounded text-[var(--color-text-primary)] text-xs"
                          >
                            <Plus className="h-3 w-3 mx-auto" />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(globalIndex)}
                            className="text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] transition-colors p-1"
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
              <div className="bg-[var(--color-card)] rounded-lg p-4">
                <div className="text-center py-6 border-2 border-dashed border-[var(--color-border)] rounded-lg">
                  <Package className="h-8 w-8 text-[var(--color-text-muted)] mx-auto mb-2" />
                  <p className="text-[var(--color-text-muted)] text-sm">No items in inventory</p>
                  <p className="text-[var(--color-text-secondary)] text-xs">Add equipment or custom items above</p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-2">
                    💡 <strong>Magical items</strong> are managed in the <strong>Gear & Equipment</strong> tab
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Money & Treasures */}
        <div className="space-y-6">
          {/* Money */}
          <div className="bg-[var(--color-card)] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Coins className="h-5 w-5 text-[var(--color-accent)]" />
              Money
            </h3>
            <div className="space-y-3">
              {/* Gold */}
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-accent)] font-medium">Gold Pieces</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoneyChange('gold', -1)}
                    disabled={goldPieces <= 0}
                    className="w-6 h-6 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] disabled:opacity-50 rounded text-[var(--color-text-primary)] text-sm"
                  >
                    <Minus className="h-3 w-3 mx-auto" />
                  </button>
                  <span className="text-[var(--color-text-primary)] font-bold w-8 text-center">{goldPieces}</span>
                  <button
                    onClick={() => handleMoneyChange('gold', 1)}
                    className="w-6 h-6 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] rounded text-[var(--color-text-primary)] text-sm"
                  >
                    <Plus className="h-3 w-3 mx-auto" />
                  </button>
                </div>
              </div>
              {/* Silver */}
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)] font-medium">Silver Pieces</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoneyChange('silver', -1)}
                    disabled={silverPieces <= 0}
                    className="w-6 h-6 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] disabled:opacity-50 rounded text-[var(--color-text-primary)] text-sm"
                  >
                    <Minus className="h-3 w-3 mx-auto" />
                  </button>
                  <span className="text-[var(--color-text-primary)] font-bold w-8 text-center">{silverPieces}</span>
                  <button
                    onClick={() => handleMoneyChange('silver', 1)}
                    className="w-6 h-6 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] rounded text-[var(--color-text-primary)] text-sm"
                  >
                    <Plus className="h-3 w-3 mx-auto" />
                  </button>
                </div>
              </div>
              {/* Copper */}
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-warning)] font-medium">Copper Pieces</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoneyChange('copper', -1)}
                    disabled={copperPieces <= 0}
                    className="w-6 h-6 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] disabled:opacity-50 rounded text-[var(--color-text-primary)] text-sm"
                  >
                    <Minus className="h-3 w-3 mx-auto" />
                  </button>
                  <span className="text-[var(--color-text-primary)] font-bold w-8 text-center">{copperPieces}</span>
                  <button
                    onClick={() => handleMoneyChange('copper', 1)}
                    className="w-6 h-6 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] rounded text-[var(--color-text-primary)] text-sm"
                  >
                    <Plus className="h-3 w-3 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Treasures */}
          <div className="bg-[var(--color-card)] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-[var(--color-accent)]" />
              Treasures & Valuables
            </h3>
            
            {/* Add Treasure Mode Toggle */}
            <div className="flex gap-1 mb-4">
              <button
                onClick={() => setTreasureAddMode("database")}
                className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors ${
                  treasureAddMode === "database" 
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-text)]" 
                    : "bg-[var(--color-card-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-tertiary)]"
                }`}
              >
                Database
              </button>
              <button
                onClick={() => setTreasureAddMode("custom")}
                className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors ${
                  treasureAddMode === "custom" 
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-text)]" 
                    : "bg-[var(--color-card-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-tertiary)]"
                }`}
              >
                Custom
              </button>
            </div>

            {/* Add Treasure */}
            {treasureAddMode === "database" ? (
              <div className="space-y-2 mb-4">
                {/* Global Search for Treasures */}
                <div className="relative">
                  <input
                    type="text"
                    value={treasureSearchTerm}
                    onChange={(e) => setTreasureSearchTerm(e.target.value)}
                    placeholder="Search all treasures..."
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 pl-10 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]" />
                </div>

                {/* Global Search Results for Treasures */}
                {treasureSearchTerm && (
                  <div className="bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded p-3 max-h-48 overflow-y-auto">
                    <div className="text-sm text-[var(--color-text-secondary)] mb-2">Search Results:</div>
                    {allTreasures
                      .filter(treasure => 
                        treasure.name.toLowerCase().includes(treasureSearchTerm.toLowerCase())
                      )
                      .slice(0, 10) // Limit to 10 results
                      .map(treasure => (
                        <div 
                          key={treasure.name}
                          onClick={() => {
                            setSelectedTreasure(treasure.name);
                            setTreasureSearchTerm("");
                          }}
                          className="flex justify-between items-center p-2 hover:bg-[var(--color-card-tertiary)] rounded cursor-pointer text-sm"
                        >
                          <span className="text-[var(--color-text-primary)]">{treasure.name}</span>
                          <span className="text-[var(--color-text-secondary)] text-xs">{treasure.value} gp</span>
                        </div>
                      ))}
                    {allTreasures.filter(treasure => 
                      treasure.name.toLowerCase().includes(treasureSearchTerm.toLowerCase())
                    ).length === 0 && (
                      <div className="text-[var(--color-text-secondary)] text-sm p-2">No treasures found</div>
                    )}
                  </div>
                )}

                {/* Category Browsing (when no search) */}
                {!treasureSearchTerm && (
                  <div className="flex gap-2">
                    <select
                      value={selectedTreasure}
                      onChange={(e) => setSelectedTreasure(e.target.value)}
                      className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none min-w-0"
                      style={{ textOverflow: 'ellipsis' }}
                    >
                      <option value="">Select treasure...</option>
                      {allTreasures.map(treasure => (
                        <option key={treasure.name} value={treasure.name} className="truncate">
                          {treasure.name} ({treasure.value} gp)
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddTreasure}
                      disabled={!selectedTreasure}
                      className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] p-2 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Add button for search results */}
                {treasureSearchTerm && selectedTreasure && (
                  <div className="flex gap-2">
                    <select
                      value={selectedTreasure}
                      className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm"
                      disabled
                    >
                      <option value={selectedTreasure}>{selectedTreasure}</option>
                    </select>
                    <button
                      onClick={handleAddTreasure}
                      className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] p-2 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  value={newTreasureName}
                  onChange={(e) => setNewTreasureName(e.target.value)}
                  placeholder="Treasure name..."
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newTreasureValue}
                    onChange={(e) => setNewTreasureValue(e.target.value)}
                    placeholder="Value in gp..."
                    className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                  />
                  <button
                    onClick={handleAddTreasure}
                    disabled={!newTreasureName.trim() || !newTreasureValue.trim()}
                    className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] p-2 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Treasure List */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {treasures.map((treasure, index) => (
                <div key={index} className="bg-[var(--color-card-secondary)] p-3 rounded flex items-center justify-between">
                  <div className="flex-1">
                    <span className="text-[var(--color-text-primary)] font-medium">{treasure.name}</span>
                    <span className="text-[var(--color-accent)] text-sm ml-2">{treasure.value} gp</span>
                  </div>
                  <button
                    onClick={() => handleRemoveTreasure(index)}
                    className="text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] transition-colors p-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {treasures.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed border-[var(--color-border)] rounded-lg">
                  <Zap className="h-8 w-8 text-[var(--color-text-muted)] mx-auto mb-2" />
                  <p className="text-[var(--color-text-muted)] text-sm">No treasures collected</p>
                  <p className="text-[var(--color-text-secondary)] text-xs">Add treasures from database or create custom ones</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 