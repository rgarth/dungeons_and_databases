// SEED DATA ONLY - Equipment Packs for Database Seeding
// 
// ⚠️  WARNING: This is NOT the source of truth!
// ⚠️  This data is only used for seeding the database via prisma/seed-equipment-packs.ts
// ⚠️  The actual source of truth is the database tables: EquipmentPack & EquipmentPackItem
// ⚠️  All application logic should use the database via /api/equipment-packs
//
// Official D&D 5e Equipment Packs
// Source: D&D 5e SRD - https://5thsrd.org/adventuring/equipment/equipment_packs/

export interface EquipmentPackData {
  name: string;
  description: string;
  cost: string;
  items: Array<{
    equipmentName: string;
    quantity: number;
  }>;
}

// SEED DATA - Use database for actual application data
export const equipmentPacksData: EquipmentPackData[] = [
  {
    name: "Burglar's Pack",
    description: "For rogues and sneaky characters",
    cost: "16 gp",
    items: [
      { equipmentName: "Backpack", quantity: 1 },
      { equipmentName: "Ball Bearings (bag of 1,000)", quantity: 1 },
      { equipmentName: "String (10 feet)", quantity: 1 },
      { equipmentName: "Bell", quantity: 1 },
      { equipmentName: "Candle", quantity: 5 },
      { equipmentName: "Crowbar", quantity: 1 },
      { equipmentName: "Hammer", quantity: 1 },
      { equipmentName: "Piton", quantity: 10 },
      { equipmentName: "Lantern, Hooded", quantity: 1 },
      { equipmentName: "Oil (flask)", quantity: 2 },
      { equipmentName: "Rations (1 day)", quantity: 5 },
      { equipmentName: "Tinderbox", quantity: 1 },
      { equipmentName: "Waterskin", quantity: 1 },
      { equipmentName: "Rope, Hempen (50 feet)", quantity: 1 }
    ]
  },
  {
    name: "Diplomat's Pack",
    description: "For negotiators and courtly characters",
    cost: "39 gp",
    items: [
      { equipmentName: "Chest", quantity: 1 },
      { equipmentName: "Case, Map or Scroll", quantity: 2 },
      { equipmentName: "Clothes, Fine", quantity: 1 },
      { equipmentName: "Ink (1 ounce bottle)", quantity: 1 },
      { equipmentName: "Ink Pen", quantity: 1 },
      { equipmentName: "Lamp", quantity: 1 },
      { equipmentName: "Oil (flask)", quantity: 2 },
      { equipmentName: "Paper (one sheet)", quantity: 5 },
      { equipmentName: "Perfume (vial)", quantity: 1 },
      { equipmentName: "Sealing Wax", quantity: 1 },
      { equipmentName: "Soap", quantity: 1 }
    ]
  },
  {
    name: "Dungeoneer's Pack",
    description: "For exploring dungeons and underground adventures",
    cost: "12 gp",
    items: [
      { equipmentName: "Backpack", quantity: 1 },
      { equipmentName: "Crowbar", quantity: 1 },
      { equipmentName: "Hammer", quantity: 1 },
      { equipmentName: "Piton", quantity: 10 },
      { equipmentName: "Torch", quantity: 10 },
      { equipmentName: "Tinderbox", quantity: 1 },
      { equipmentName: "Rations (1 day)", quantity: 10 },
      { equipmentName: "Waterskin", quantity: 1 },
      { equipmentName: "Rope, Hempen (50 feet)", quantity: 1 }
    ]
  },
  {
    name: "Entertainer's Pack",
    description: "For bards and performers",
    cost: "40 gp",
    items: [
      { equipmentName: "Backpack", quantity: 1 },
      { equipmentName: "Bedroll", quantity: 1 },
      { equipmentName: "Clothes, Costume", quantity: 2 },
      { equipmentName: "Candle", quantity: 5 },
      { equipmentName: "Rations (1 day)", quantity: 5 },
      { equipmentName: "Waterskin", quantity: 1 },
      { equipmentName: "Disguise Kit", quantity: 1 }
    ]
  },
  {
    name: "Explorer's Pack",
    description: "For wilderness exploration and outdoor adventures",
    cost: "10 gp",
    items: [
      { equipmentName: "Backpack", quantity: 1 },
      { equipmentName: "Bedroll", quantity: 1 },
      { equipmentName: "Mess Kit", quantity: 1 },
      { equipmentName: "Tinderbox", quantity: 1 },
      { equipmentName: "Torch", quantity: 10 },
      { equipmentName: "Rations (1 day)", quantity: 10 },
      { equipmentName: "Waterskin", quantity: 1 },
      { equipmentName: "Rope, Hempen (50 feet)", quantity: 1 }
    ]
  },
  {
    name: "Priest's Pack",
    description: "For clerics and religious characters",
    cost: "19 gp",
    items: [
      { equipmentName: "Backpack", quantity: 1 },
      { equipmentName: "Blanket", quantity: 1 },
      { equipmentName: "Candle", quantity: 10 },
      { equipmentName: "Tinderbox", quantity: 1 },
      { equipmentName: "Alms Box", quantity: 1 },
      { equipmentName: "Incense (1 block)", quantity: 2 },
      { equipmentName: "Censer", quantity: 1 },
      { equipmentName: "Vestments", quantity: 1 },
      { equipmentName: "Rations (1 day)", quantity: 2 },
      { equipmentName: "Waterskin", quantity: 1 }
    ]
  },
  {
    name: "Scholar's Pack",
    description: "For wizards and learned characters",
    cost: "40 gp",
    items: [
      { equipmentName: "Backpack", quantity: 1 },
      { equipmentName: "Book", quantity: 1 },
      { equipmentName: "Ink (1 ounce bottle)", quantity: 1 },
      { equipmentName: "Ink Pen", quantity: 1 },
      { equipmentName: "Parchment (one sheet)", quantity: 10 },
      { equipmentName: "Little Bag of Sand", quantity: 1 },
      { equipmentName: "Small Knife", quantity: 1 }
    ]
  }
]; 