-- Add indexes for unindexed foreign keys to improve JOIN and WHERE clause performance

-- Account table: userId foreign key
CREATE INDEX IF NOT EXISTS idx_account_user_id ON "Account" ("userId");

-- Character table: subrace foreign key
CREATE INDEX IF NOT EXISTS idx_character_subrace ON "Character" ("subrace");

-- CustomWeapon table: baseWeaponId foreign key
CREATE INDEX IF NOT EXISTS idx_custom_weapon_base_weapon_id ON "CustomWeapon" ("baseWeaponId");

-- EquipmentPackItem table: equipmentId foreign key
CREATE INDEX IF NOT EXISTS idx_equipment_pack_item_equipment_id ON "EquipmentPackItem" ("equipmentId");

-- Session table: userId foreign key
CREATE INDEX IF NOT EXISTS idx_session_user_id ON "Session" ("userId"); 