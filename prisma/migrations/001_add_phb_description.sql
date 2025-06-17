-- Add phbDescription column to ClassWeaponSuggestion table
ALTER TABLE "ClassWeaponSuggestion"
ADD COLUMN "phbDescription" TEXT;

-- Update existing records with PHB descriptions
UPDATE "ClassWeaponSuggestion"
SET "phbDescription" = CASE
    WHEN "classId" = 'barbarian' THEN '(a) a greataxe or (b) any martial melee weapon, (a) two handaxes or (b) any simple weapon'
    WHEN "classId" = 'bard' THEN '(a) a rapier, (b) a longsword, or (c) any simple weapon, (a) a diplomat''s pack or (b) an entertainer''s pack, (a) a lute or (b) any other musical instrument'
    WHEN "classId" = 'cleric' THEN '(a) a mace or (b) a warhammer, (a) scale mail, (b) leather armor, or (c) chain mail, (a) a light crossbow and 20 bolts or (b) any simple weapon, (a) a priest''s pack or (b) an explorer''s pack, A shield and a holy symbol'
    WHEN "classId" = 'druid' THEN '(a) a wooden shield or (b) any simple weapon, (a) a scimitar or (b) any simple melee weapon, Leather armor, an explorer''s pack, and a druidic focus'
    WHEN "classId" = 'fighter' THEN '(a) chain mail or (b) leather armor, longbow, and 20 arrows, (a) a martial weapon and a shield or (b) two martial weapons, (a) a light crossbow and 20 bolts or (b) two handaxes, (a) a dungeoneer''s pack or (b) an explorer''s pack'
    WHEN "classId" = 'monk' THEN '(a) a shortsword or (b) any simple weapon, (a) a dungeoneer''s pack or (b) an explorer''s pack, 10 darts'
    WHEN "classId" = 'paladin' THEN '(a) a martial weapon and a shield or (b) two martial weapons, (a) five javelins or (b) any simple melee weapon, (a) a priest''s pack or (b) an explorer''s pack, Chain mail and a holy symbol'
    WHEN "classId" = 'ranger' THEN '(a) scale mail or (b) leather armor, (a) two shortswords or (b) two simple melee weapons, (a) a dungeoneer''s pack or (b) an explorer''s pack, A longbow and a quiver of 20 arrows'
    WHEN "classId" = 'rogue' THEN '(a) a rapier or (b) a shortsword, (a) a shortbow and quiver of 20 arrows or (b) a shortsword, (a) a burglar''s pack, (b) a dungeoneer''s pack, or (c) an explorer''s pack, Leather armor, two daggers, and thieves'' tools'
    WHEN "classId" = 'sorcerer' THEN '(a) a light crossbow and 20 bolts or (b) any simple weapon, (a) a component pouch or (b) an arcane focus, (a) a dungeoneer''s pack or (b) an explorer''s pack, Two daggers'
    WHEN "classId" = 'warlock' THEN '(a) a light crossbow and 20 bolts or (b) any simple weapon, (a) a component pouch or (b) an arcane focus, (a) a scholar''s pack or (b) a dungeoneer''s pack, Leather armor, any simple weapon, and two daggers'
    WHEN "classId" = 'wizard' THEN '(a) a spellbook, (a) a quarterstaff or (b) a dagger, (a) a component pouch or (b) an arcane focus, (a) a scholar''s pack or (b) an explorer''s pack'
    ELSE NULL
END; 