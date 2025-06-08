# 🎭 Multi-Avatar System

The D&D character creator now supports multiple avatar choices for each race/class/gender combination, giving users more personalization options.

## 📁 File Naming Convention

### Base Avatars
- Format: `Race_Class_Gender.png`
- Examples: `Human_Fighter_Male.png`, `Elf_Wizard_Female.png`

### Additional Variations
- Format: `Race_Class_Gender_N.png` (where N is a number starting from 1)
- Examples: `Human_Fighter_Male_1.png`, `Human_Fighter_Male_2.png`, `Elf_Wizard_Female_1.png`

## 🔄 Generation Process

### First Generation
When you run the avatar generation script for the first time:
```bash
node scripts/generate-avatars.js Human Fighter Male
```
Creates: `Human_Fighter_Male.png`

### Subsequent Generations
Running the same command again automatically creates numbered variations:
```bash
node scripts/generate-avatars.js Human Fighter Male
```
Creates: `Human_Fighter_Male_1.png`

```bash
node scripts/generate-avatars.js Human Fighter Male
```
Creates: `Human_Fighter_Male_2.png`

And so on...

## 🎨 User Experience

### Avatar Selection
- Users see all available avatars grouped by race/class/gender
- Multiple options are shown as "Human Fighter Male #1", "Human Fighter Male #2", etc.
- The base avatar (without number) is displayed first
- Groups with multiple options show "(X options)" in the header

### Character Creation
- When creating a character, users can choose from all available avatar variations
- The avatar selector displays options in a clean, organized grid
- Variations are sorted with the base avatar first, then numbered variations

## 🛠️ Technical Implementation

### API Changes
- `/api/avatars` now parses both `Race_Class_Gender.png` and `Race_Class_Gender_N.png` formats
- Returns `avatarNumber: number | null` field to distinguish variations
- Sorts avatars with base avatar first, then by number

### Frontend Changes
- `AvatarSelector` component groups avatars by race/class/gender combination
- Displays multiple choices per group when available
- Shows variation numbers in display names (e.g., "Human Fighter Male #2")

### Generation Script
- `getNextAvailableFilename()` function automatically finds the next available number
- Checks for existing files and increments until finding an unused filename
- Preserves existing avatars while adding new variations

## 🎯 Benefits

1. **More Variety**: Users get multiple visual options for the same character archetype
2. **Personalization**: Different looks for similar character concepts
3. **Progressive Enhancement**: System works with existing single avatars and adds variations
4. **Automatic Management**: No manual filename management needed
5. **Organized Display**: Clean, grouped presentation in the UI

## 📋 Usage Examples

### Generate Variations for Specific Combinations
```bash
# Generate multiple Human Fighter Male avatars
node scripts/generate-avatars.js Human Fighter Male
node scripts/generate-avatars.js Human Fighter Male  # Creates _1 variant
node scripts/generate-avatars.js Human Fighter Male  # Creates _2 variant
```

### Generate All Combinations (Creates Variations)
```bash
# If avatars already exist, this creates numbered variations
node scripts/generate-avatars.js
```

### Force Regeneration
```bash
# Replaces existing avatars instead of creating variations
node scripts/generate-avatars.js --force
```

## 🔍 File Structure Example

```
public/avatars/
├── Human_Fighter_Male.png          # Base avatar
├── Human_Fighter_Male_1.png        # First variation
├── Human_Fighter_Male_2.png        # Second variation
├── Human_Fighter_Female.png        # Base female variant
├── Human_Fighter_Female_1.png      # Female variation
├── Elf_Wizard_Male.png             # Different combination
└── ...
```

## 🎮 Player Experience

1. **Character Creation**: Choose from multiple visual styles for your character concept
2. **Avatar Browser**: Easily browse grouped options with clear labels
3. **Variation Discovery**: Find avatars that match your character's personality
4. **Future-Proof**: New variations can be added without breaking existing characters

The multi-avatar system enhances player choice while maintaining a clean, organized interface for avatar selection. 