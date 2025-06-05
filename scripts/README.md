# D&D Avatar Generation System

Generate **1,944 unique avatars** for every combination of Race × Class × Gender × Alignment in your D&D 5e app using free AI image generation services.

## 📊 **The Math**
- **9 Races** × **12 Classes** × **2 Genders** × **9 Alignments** = **1,944 total avatars**
- Each avatar: 192×192 pixels
- Organized by consistent naming convention: `Race_Class_Gender_Alignment.png`
- Sequential generation with resume capability
- Flexible parameter filtering for targeted generation

## 🚀 **Quick Start**

### 1. **Test the System (Placeholder Mode)**
```bash
# Generate all 1,944 avatars (placeholder mode)
node scripts/generate-avatars.js

# Generate specific combinations
node scripts/generate-avatars.js Dragonborn         # All Dragonborn (216 avatars)
node scripts/generate-avatars.js Female             # All female characters (972 avatars)
node scripts/generate-avatars.js Wizard Female      # All female wizards (81 avatars)
node scripts/generate-avatars.js Elf Ranger Female LawfulGood  # Single specific avatar
```

### 2. **Set Up API Keys**
Choose one or more free image generation services:

**Option A: Hugging Face (Recommended - Free Tier)**
```bash
# Get free API key from: https://huggingface.co/settings/tokens
export HUGGINGFACE_API_KEY="your-key-here"
```

**Option B: OpenAI DALL-E 3 (Free Tier)**
```bash
# Get API key from: https://platform.openai.com/api-keys
export OPENAI_API_KEY="your-key-here"
```

**Option C: DeepAI (Free Tier)**
```bash
# Get free API key from: https://deepai.org/machine-learning-model/text2img
export DEEPAI_API_KEY="your-key-here"
```

### 3. **Install Dependencies**
```bash
npm install sharp  # For image resizing
```

### 4. **Customize and Run**
Edit `scripts/generate-avatars.js` to use your preferred API (see examples in `scripts/api-integrations.js`), then run with your desired parameters.

## 🎯 **Flexible Parameter System**

The script accepts any combination of race, class, gender, and alignment parameters:

### **Usage Examples**
```bash
# Generate everything (1,944 avatars)
node scripts/generate-avatars.js

# Single parameter filters
node scripts/generate-avatars.js Dragonborn    # All Dragonborn (216 avatars)
node scripts/generate-avatars.js Wizard       # All Wizards (162 avatars)
node scripts/generate-avatars.js Female       # All Female (972 avatars)
node scripts/generate-avatars.js LawfulGood   # All Lawful Good (216 avatars)

# Multiple parameter filters
node scripts/generate-avatars.js Elf Female            # Female Elves (108 avatars)
node scripts/generate-avatars.js Wizard LawfulGood     # Lawful Good Wizards (18 avatars)
node scripts/generate-avatars.js Dragonborn Male Cleric # Male Dragonborn Clerics (9 avatars)

# Exact combination (single avatar)
node scripts/generate-avatars.js Human Fighter Female ChaoticGood
```

### **Available Parameters**
- **Races**: Dragonborn, Dwarf, Elf, Gnome, Half-Elf, Halfling, Half-Orc, Human, Tiefling
- **Classes**: Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard
- **Genders**: Male, Female
- **Alignments**: LawfulGood, NeutralGood, ChaoticGood, LawfulNeutral, TrueNeutral, ChaoticNeutral, LawfulEvil, NeutralEvil, ChaoticEvil

*Note: Parameters are case-insensitive and can be in any order*

## 📁 **Output Structure**
```
public/avatars/
├── Dragonborn_Barbarian_Male_LawfulGood.png
├── Dragonborn_Barbarian_Male_NeutralGood.png
├── Dragonborn_Barbarian_Female_LawfulGood.png
├── ...
└── Tiefling_Wizard_Female_ChaoticEvil.png

scripts/
└── avatar-progress-current.json  # Progress tracking
```

## ⏸️ **Resume Capability**

The system automatically saves progress and can resume if interrupted:

- **Stop**: Press `Ctrl+C` (graceful shutdown)
- **Resume**: Just run the script again with the same parameters
- **Skip existing**: Won't regenerate files that already exist
- **Progress tracking**: Detailed JSON log of completed/failed items

## 🎨 **Generated Prompts**

Each avatar gets a detailed, customized prompt that includes gender:

> "A D&D fantasy character portrait: **female** draconic humanoid with scales and reptilian features, Dragonborn Barbarian, wielding primitive weapons, fur clothing, wild appearance, noble and virtuous expression, bright colors. Digital art style, 192x192 pixels, fantasy RPG character portrait, detailed but clean, suitable for character avatar use."

## 📊 **Progress Tracking**

The system creates `scripts/avatar-progress-current.json`:

```json
{
  "totalCombinations": 1944,
  "completed": ["Dragonborn_Barbarian_Male_LawfulGood.png", "..."],
  "failed": [
    {
      "filename": "...",
      "error": "API rate limit",
      "timestamp": "2024-01-01T12:00:00Z"
    }
  ],
  "currentIndex": 156,
  "filters": {
    "race": null,
    "class": "Wizard",
    "gender": "Female",
    "alignment": null
  },
  "startTime": "2024-01-01T10:00:00Z",
  "lastUpdate": "2024-01-01T12:30:00Z"
}
```

## 🔧 **Configuration Options**

Edit `CONFIG` in `generate-avatars.js`:

```javascript
const CONFIG = {
  outputDir: './public/avatars',           // Output directory
  imageSize: '192x192',                    // Target size
  delayBetweenRequests: 2000,             // Rate limiting (ms)
  maxRetries: 3                           // Retry failed requests
};
```

## 🆓 **Free Tier Strategies**

### **Targeted Generation (Recommended)**
```bash
# Start with most important combinations
node scripts/generate-avatars.js Human     # Most common race first (216 avatars)
node scripts/generate-avatars.js Fighter   # Popular class (162 avatars)
node scripts/generate-avatars.js LawfulGood # Common alignment (216 avatars)
```

### **Sequential Generation**
- One request at a time
- Automatic rate limiting
- Handles API quotas gracefully
- Can run for hours/days if needed

### **Service Rotation**
- Use multiple free APIs
- Switch when hitting rate limits
- Maximize free tier usage

## 📈 **Performance Estimates**

**With 2-second delays between requests:**
- ~30 requests per minute
- ~1,800 requests per hour
- **~65 hours total** for all 1,944 avatars

**Targeted generation examples:**
- Single race: ~7 hours (216 avatars)
- Single gender: ~32 hours (972 avatars)  
- Single class: ~5 hours (162 avatars)
- Specific combination: ~1 second (1 avatar)

**With free tier rate limits:**
- Most services: 5-10 requests/minute
- Realistic time: **4-5 days** running intermittently
- Can pause/resume anytime

## 🛠️ **Advanced Usage Examples**

### **Character Creation Priority**
```bash
# Generate most popular combinations first
node scripts/generate-avatars.js Human Fighter    # Classic combination
node scripts/generate-avatars.js Elf Ranger       # Fantasy favorite
node scripts/generate-avatars.js Dwarf Cleric     # Traditional choice
```

### **Gender-Specific Campaigns**
```bash
# All-female adventuring party assets
node scripts/generate-avatars.js Female

# Specific gender for certain classes
node scripts/generate-avatars.js Male Barbarian   # Traditional depiction
node scripts/generate-avatars.js Female Wizard    # Diverse representation
```

### **Alignment-Based Generation**
```bash
# Good-aligned characters for heroic campaigns
node scripts/generate-avatars.js LawfulGood
node scripts/generate-avatars.js NeutralGood  
node scripts/generate-avatars.js ChaoticGood

# Evil characters for darker campaigns
node scripts/generate-avatars.js LawfulEvil
node scripts/generate-avatars.js ChaoticEvil
```

## 🚨 **Important Notes**

1. **API Keys**: Keep your API keys secure - don't commit them to git
2. **Rate Limits**: Respect free tier limitations to avoid being blocked
3. **Storage**: 1,944 images × ~50KB each ≈ 100MB total storage needed
4. **Git Storage**: Avatar files are `.gitignore`d - they won't be committed to your repository
5. **Legal**: Ensure generated images comply with your app's licensing
6. **Quality**: Free tiers may have lower quality - review generated images
7. **Gender Representation**: System supports inclusive character creation

## 📝 **Integration with Your App**

Once generated, avatars can be used in your character creation:

```typescript
// In your character creation component:
const avatarPath = `/avatars/${race}_${characterClass}_${gender}_${alignment.replace(/\s+/g, '')}.png`;

<img 
  src={avatarPath} 
  alt={`${gender} ${race} ${characterClass}`}
  className="w-12 h-12 rounded-full"
/>
```

### **Dynamic Avatar Selection**
```typescript
// Provide avatar options based on character choices
const getAvailableAvatars = (race, characterClass, gender) => {
  const alignments = ['LawfulGood', 'NeutralGood', 'ChaoticGood', /* ... */];
  return alignments.map(alignment => 
    `/avatars/${race}_${characterClass}_${gender}_${alignment}.png`
  );
};
```

## 🔍 **Troubleshooting**

**Q: Script stops with API errors**
A: Check your API key and rate limits. The script will resume from where it stopped.

**Q: Images are wrong size**
A: Install `sharp` package and ensure resizing function is working.

**Q: Too many failed generations**
A: Try different prompts or switch to a different API service.

**Q: Want to restart from beginning**
A: Delete `scripts/avatar-progress-current.json` and the output directory.

**Q: Generated wrong combinations**
A: Check your parameter spelling - script validates all inputs.

## 🎯 **Generation Strategies**

### **For New Projects**
1. Start with core races: `Human`, `Elf`, `Dwarf`
2. Focus on popular classes: `Fighter`, `Wizard`, `Rogue`
3. Begin with good alignments for player characters

### **For Existing Projects**
1. Generate only missing combinations
2. Update existing characters with new gender options
3. Add evil alignments for NPC variety

### **For Testing**
```bash
# Generate a small test set
node scripts/generate-avatars.js Human Fighter Male LawfulGood
node scripts/generate-avatars.js Elf Wizard Female ChaoticGood
```

---

**Happy avatar generating!** 🎨✨ **Now with full gender representation!** ♂️♀️ 