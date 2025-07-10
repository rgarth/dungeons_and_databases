# D&D 5e Spells System - Complete Guide

## Overview

The spells system uses the **correct architecture** with **396 enhanced spells** from the D&D 5e SRD, stored in TypeScript files for instant access and complete 5e SRD compliance.

## ✅ Architecture

### 📁 **Static Game Data (TypeScript Files)**
```
prisma/data/
├── enhanced-spells-data.ts    # ✅ 396 spells with complete 5e SRD compliance
├── weapons-data.ts            # ✅ Static weapon data
├── armor-data.ts              # ✅ Static armor data
├── equipment-data.ts          # ✅ Static equipment data
└── ...                        # ✅ Other static game data
```

### 🗄️ **Character-Specific Data (Database)**
```sql
-- Character table stores character-specific spell data
spellsKnown    Json?  -- Spells the character knows
spellsPrepared Json?  -- Spells the character has prepared  
spellSlots     Json?  -- Available spell slots
```

## 🎯 Why This Architecture is Correct

### ✅ **Follows Established Pattern**
- **Static game data** (spells, weapons, armor, etc.) → TypeScript files
- **User data** (character spells, inventory, etc.) → Database
- **No database for game rules** - D&D 5e SRD content is static and version-controlled

### ✅ **Performance Benefits**
- **Instant access** to spell data from memory
- **No database queries** for static content
- **Type safety** with TypeScript interfaces
- **Version control** for game rule changes

## 📊 Complete Dataset

### 🎯 **396 Spells** with Enhanced Data Structure
- **Level 0 (Cantrips)**: 35 spells
- **Level 1**: 65 spells
- **Level 2**: 64 spells
- **Level 3**: 54 spells
- **Level 4**: 39 spells
- **Level 5**: 46 spells
- **Level 6**: 38 spells
- **Level 7**: 21 spells
- **Level 8**: 18 spells
- **Level 9**: 16 spells

### 🔧 **Enhanced Features**
Every spell includes:
- ✅ **ritual, concentration, material, somatic, verbal**
- ✅ **damageType, saveType, attackType**
- ✅ **areaOfEffect, damageAtSlotLevel, healAtSlotLevel**
- ✅ **targetsAtSlotLevel, atHigherLevels, source, page**

## 🎮 Enhanced Data Structure

```typescript
interface EnhancedSpell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string; // JSON string like "[\"Sorcerer\",\"Wizard\"]"
  
  // Enhanced 5e SRD fields
  ritual?: boolean;
  concentration?: boolean;
  material?: string | null;
  somatic?: boolean;
  verbal?: boolean;
  higherLevels?: string | null;
  damageType?: string | null;
  saveType?: string | null;
  attackType?: 'melee' | 'ranged' | 'none';
  areaOfEffect?: {
    type: 'sphere' | 'cube' | 'cylinder' | 'line' | 'cone' | 'square';
    size: number;
    unit: 'feet' | 'miles';
  } | null;
  damageAtSlotLevel?: Record<number, string> | null;
  healAtSlotLevel?: Record<number, string> | null;
  targetsAtSlotLevel?: Record<number, number> | null;
  atHigherLevels?: string | null;
  source?: string;
  page?: number | null;
}
```

## 🎯 Key Examples

### Damage Scaling: Burning Hands
```typescript
{
  name: "Burning Hands",
  level: 1,
  damageType: "fire",
  saveType: "DEX",
  attackType: "none",
  areaOfEffect: { type: "cone", size: 15, unit: "feet" },
  damageAtSlotLevel: {
    1: "3d6", 2: "4d6", 3: "5d6", 4: "6d6", 5: "7d6"
  }
}
```

### Healing Scaling: Cure Wounds
```typescript
{
  name: "Cure Wounds",
  level: 1,
  damageType: null,
  saveType: null,
  attackType: "none",
  healAtSlotLevel: {
    1: "1d8", 2: "2d8", 3: "3d8", 4: "4d8", 5: "5d8"
  }
}
```

### Target Scaling: Magic Missile
```typescript
{
  name: "Magic Missile",
  level: 1,
  damageType: "force",
  attackType: "none",
  damageAtSlotLevel: {
    1: "3d4+3", 2: "4d4+4", 3: "5d4+5"
  },
  targetsAtSlotLevel: {
    1: 3, 2: 4, 3: 5
  }
}
```

## 🔧 How It Works

### 📖 **Reading Spell Data**
```typescript
// From TypeScript files (instant access)
import { enhancedSpellsData } from '../../prisma/data/enhanced-spells-data';

// Get all spells for a class
const wizardSpells = enhancedSpellsData.filter(spell => 
  spell.classes.includes('Wizard')
);
```

### 💾 **Storing Character Spells**
```typescript
// In database (character-specific)
const character = {
  spellsKnown: ['Fireball', 'Magic Missile', 'Shield'],
  spellsPrepared: ['Fireball', 'Shield'],
  spellSlots: { 1: 4, 2: 3, 3: 2 }
};
```

## 🚀 Benefits

### 🎯 Game Accuracy
- Complete 5e SRD compliance
- Proper level scaling calculations
- Accurate combat mechanics

### 🚀 Performance
- Single data structure per spell
- Efficient lookups and filtering
- Type-safe TypeScript implementation

### 🛠️ Maintainability
- Clean, focused data structure
- Comprehensive utility functions
- Easy to extend and modify

### 🎮 User Experience
- Instant spell level calculations
- Complete combat information
- Rich spell descriptions and mechanics

## ✅ Current State

- ✅ **396 spells** with enhanced data structure
- ✅ **All 5e SRD compliance fields** included
- ✅ **Correct architecture** - no unnecessary database tables
- ✅ **Clean codebase** - removed all incorrect migration attempts
- ✅ **All imports updated** to use enhanced spells data
- ✅ **Old spells data removed** to prevent confusion
- ✅ **Ready for production** - follows established patterns

## 🎯 Summary

The spells system correctly uses:
- **TypeScript files** for static game data (396 spells)
- **Database JSON fields** for character-specific spell data
- **No Spell table** - spells are game rules, not user data

This architecture is **correct**, **performant**, and **maintainable**! 🎯 