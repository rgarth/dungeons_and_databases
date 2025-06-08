# 🎯 Business Logic Consolidation

## 🚨 Problem Identified

The codebase had **multiple implementations of the same business logic** scattered across different components, leading to:

1. **Inconsistent behavior** between different UIs
2. **Duplicated D&D 5e rules** implementation
3. **Different interpretations** of the same game mechanics
4. **Maintenance nightmare** when rules needed to be updated

## 📋 Specific Issues Found

### 1. **Temporary HP Damage Logic**
- **StatsTab**: ✅ Correct implementation (temp HP consumed first)
- **HitPointsDisplay**: ❌ Wrong implementation (ignored temp HP)
- **CharacterCombat service**: ✅ Correct implementation

### 2. **Death Save Auto-Stabilization**
- **HitPointsDisplay**: ✅ Working implementation
- **StatsTab**: ❌ Basic implementation without auto-heal
- **ActionsTab**: 🤷 Different interface entirely

### 3. **Rest Recovery Rules**
- **Multiple implementations** with different recovery calculations
- **Inconsistent spell preparation** logic
- **Different messages** for the same actions

## ✅ Solution: Centralized Service

Created `src/services/character/damage.ts` as the **single source of truth** for all HP-related business logic.

### **Core Features:**

#### 🩸 **Damage System**
```typescript
// Follows D&D 5e rules exactly:
// 1. Temporary HP consumed first
// 2. Remaining damage to regular HP
// 3. Cannot go below 0 HP
const result = damageService.takeDamage(amount);
```

#### 💚 **Healing System**
```typescript
// Follows D&D 5e rules exactly:
// 1. Healing goes to regular HP only
// 2. Cannot exceed max HP
// 3. Any healing above 0 HP resets death saves
const result = damageService.heal(amount);
```

#### 💀 **Death Save Management**
```typescript
// Handles toggle logic and auto-stabilization
const result = damageService.updateDeathSaves('success', 3);
if (result.autoStabilize) {
  // Automatically heals to 1 HP and resets saves
}
```

#### 😴 **Rest Recovery**
```typescript
// Short rest: Hit dice + CON modifier (limited)
// Long rest: Full HP + spell preparation logic
const shortResult = damageService.shortRest();
const longResult = damageService.longRest();
```

## 🔧 Migration Status

### ✅ **Updated Components:**
- **HitPointsDisplay** - Now uses centralized service
- **StatsTab** - Now uses HitPointsDisplay (no more duplication)

### 🚧 **Still Needs Migration:**
- **ActionsTab** - Has its own death save interface
- **CharacterCombat service** - Could be merged with damage service
- **Character card** - Simple HP display, probably fine as-is

## 📚 Usage Guidelines

### **For New Components:**
```typescript
import { createDamageService } from '@/services/character/damage';

function MyComponent({ character, onUpdate }) {
  const damageService = createDamageService(character);
  
  const handleDamage = (amount: number) => {
    const result = damageService.takeDamage(amount);
    onUpdate({
      hitPoints: result.newHitPoints,
      temporaryHitPoints: result.newTemporaryHitPoints
    });
  };
}
```

### **For Existing Components:**
1. **DO NOT** implement HP logic directly
2. **USE** the centralized damage service
3. **MIGRATE** existing implementations when you touch them
4. **REMOVE** duplicated business logic

## 🛡️ Prevention Strategies

### **Code Review Checklist:**
- [ ] New HP logic uses damage service?
- [ ] No hardcoded D&D rules in components?
- [ ] Business logic in service layer, not UI?
- [ ] Consistent interfaces across components?

### **Testing Strategy:**
- [ ] Service layer has comprehensive tests
- [ ] Edge cases covered (0 HP, negative damage, etc.)
- [ ] D&D 5e rules correctly implemented
- [ ] All components behave consistently

## 🎲 D&D 5e Rules Implemented

### **Damage & Healing:**
- ✅ Temporary HP consumed before regular HP
- ✅ Healing cannot exceed maximum HP
- ✅ Healing above 0 HP resets death saves
- ✅ Unconscious at 0 HP

### **Death Saves:**
- ✅ 3 failures = dead
- ✅ 3 successes = stabilized at 1 HP
- ✅ Death saves reset when healed above 0

### **Rest Recovery:**
- ✅ Short rest: Hit dice recovery (limited to half max HP)
- ✅ Long rest: Full HP + spell slot recovery
- ✅ Spell preparation clearing for applicable classes

## 🔮 Future Improvements

1. **Migrate remaining components** to use centralized service
2. **Add comprehensive testing** for all D&D rules
3. **Create typed interfaces** for all update operations
4. **Consider GraphQL/tRPC** for better type safety
5. **Add validation** to prevent invalid character states

---

**Remember:** When you see duplicated business logic, consolidate it into a service! 🎯 