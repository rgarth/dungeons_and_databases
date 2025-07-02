# Dungeons and Databases

A D&D 5e character builder and manager built with Next.js, TypeScript, and Supabase.

## Architecture Rules

### Data Architecture
- **D&D 5e Rules**: Stored in TypeScript files (`src/data/`) - static, version-controlled game data
- **User Data**: Stored in database (Supabase) - characters, user preferences, state
- **No database for game rules**: D&D 5e SRD content is static and should be in code

### Code Quality Rules
- Ask before dropping the databases
- Supabase cannot use prisma migrations. Please write them in the supabase directory in SQL and run a db push
- The wizards of the coast 5e rules found online are the LAW. We must adhere to them
- No artifacts.
- Less code is better than more code - keep files small, clean, and focused.
- No fallback mechanisms — they hide real failures.
- Replace existing components entirely when improving them. Delete legacy versions immediately. Never leave old implementations as dead code.
- Flag obsolete files to keep the codebase lightweight - actively remove unused code.
- Avoid race conditions at all costs.
- Take your time to ultrathink when on extended thinking mode — thinking is cheaper than fixing bugs.
- Always double check everything you do for correctness and good design before continuing.
- No hardcoded values that should be in the database - keep data dynamic and configurable.
- Sensible data structures with proper indexes for performance.
- Single source of truth per feature - no duplicate implementations.
- Modern code patterns in clean, focused files - but never alongside legacy versions.
- **Test-driven development**: Write tests first, then implement functionality. Every feature should have corresponding tests to prevent regressions.
- Before running a development daemon, check if it is already running and kill the last instance to avoid port conflicts.
- **Dev server restart command**: `pkill -f "npm run dev" ; pkill -f "next dev" ; sleep 5 ; npm run dev`
- **Pivot confirmation required**: When you have to pivot on directions, explain why and wait for confirmation.

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account and project

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.template` to `.env.local` and fill in your Supabase credentials
4. Run database migrations: `npx supabase db push`
5. Start the development server: `npm run dev`

### Database Schema
The database only contains user data:
- Characters
- User preferences
- Application state
- User-generated content

All D&D 5e game rules are stored in TypeScript files for performance and simplicity.

## License

MIT

## ✨ Features

- **Complete D&D 5e SRD Content** - 554 items ready for gameplay
- **Character Management** - Create, edit, and manage D&D characters
- **AI Avatar Generation** - Create personalized character portraits with Flux1 + fallback
- **Equipment System** - Full weapon, armor, and equipment database
- **Spell Management** - Comprehensive spell system with all spell levels
- **User Authentication** - Secure user accounts with NextAuth
- **Production Ready** - Automated deployment with database seeding

## 📊 D&D Content Included

- **396 Spells** (All levels 0-9, complete SRD)
- **37 Weapons** (Simple & Martial, Melee & Ranged)
- **16 Armor Pieces** (Light, Medium, Heavy + Shield Variants)
- **105 Equipment Items** (Adventuring Gear, Tools, Equipment Packs)

### 📜 Complete Spell Database
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

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Set up database
npm run db:generate
npm run db:migrate:dev
npm run db:seed

# Start development server
npm run dev
```

### Production Deployment
```bash
# Full production build with database setup
npm run deploy:full

# Or step by step:
npm run build
npm run deploy:prepare
```

## 🛠️ Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run db:seed` - Seed database (development)
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database completely

### Production
- `npm run deploy:full` - Complete production deployment
- `npm run deploy:prepare` - Prepare database for production
- `npm run db:seed:prod` - Production seeding
- `npm run db:seed:check` - Safe seed (won't overwrite)
- `npm run db:seed:force` - Force seed (overwrites existing)

## 🎯 Deployment

This app is production-ready! See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:

- Vercel
- Railway  
- Heroku
- DigitalOcean App Platform
- Custom hosting

The deployment system:
- ✅ **Idempotent seeding** - Safe to run multiple times
- ✅ **Environment aware** - Different behavior for dev/prod
- ✅ **Data validation** - Ensures content integrity
- ✅ **Error handling** - Graceful failure recovery
- ✅ **Smart detection** - Won't overwrite existing data

## 📁 Project Structure

```
prisma/
├── schema.prisma              # Database schema
├── seed-production.ts         # Production-ready seed script
├── data/
│   ├── index.ts              # Consolidated D&D content
│   ├── spells-data.ts        # 396 spells (all levels)
│   ├── weapons-data.ts       # 37 weapons
│   ├── armor-data.ts         # 16 armor pieces
│   └── equipment-data.ts     # 105 equipment items
src/
├── app/                      # Next.js app directory
├── components/               # React components
└── lib/                      # Utility functions
```

## 🔧 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **TypeScript**: Full type safety
- **Deployment**: Platform agnostic (Vercel, Railway, etc.)

## 🎮 Game Content

All content is sourced from the **D&D 5e System Reference Document (SRD)** - completely legal and free to use. Includes:

### Spells (Complete SRD)
- **All 396 official spells** from levels 0-9
- **Complete descriptions** with casting time, range, components, duration
- **Class availability** for each spell (Bard, Cleric, Druid, Paladin, Ranger, Sorcerer, Warlock, Wizard)
- **School classification** (Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, Transmutation)

### Weapons
- **Simple Weapons**: Club, Dagger, Spear, Shortbow, Light Crossbow, etc.
- **Martial Weapons**: Longsword, Battleaxe, Greatsword, Longbow, etc.
- **Properties**: Damage dice, damage types, weapon properties

### Armor & Shields
- **Light Armor**: Padded, Leather, Studded Leather
- **Medium Armor**: Hide, Chain Shirt, Scale Mail, Breastplate, Half Plate  
- **Heavy Armor**: Ring Mail, Chain Mail, Splint, Plate
- **Shield Variants**: Buckler, Standard Shield, Spiked Shield, Tower Shield

### Equipment
- **Adventuring Gear**: Rope, torches, bedrolls, rations, etc.
- **Tools**: Thieves' tools, artisan tools, etc.
- **Equipment Packs**: Burglar's Pack, Dungeoneer's Pack, etc.
- **Arcane Focuses**: Crystal, orb, rod, staff, wand, etc.

## 🛡️ Production Safety

The application includes enterprise-grade safety features:

- **Safe Seeding**: Won't overwrite production data without explicit `--force`
- **Data Validation**: Automatic integrity checks after seeding
- **Environment Detection**: Smart behavior based on NODE_ENV
- **Error Recovery**: Graceful handling of deployment issues
- **Content Verification**: Validates all 554 items are properly seeded

## 📄 License & Attribution

### Application License
This application is licensed under the **MIT License**. The application code is separate from D&D content and may be used according to MIT License terms.

### D&D Content Attribution
All D&D content is from the **System Reference Document 5.1 (SRD 5.1)** by Wizards of the Coast LLC and is licensed under the **Creative Commons Attribution 4.0 International License**.

**Source**: https://dnd.wizards.com/resources/systems-reference-document

**Legal Compliance**: This application includes proper attribution and licensing information. View complete legal details at `/legal` within the application.

### Disclaimer
**Dungeons & Dragons** and **D&D** are trademarks of Wizards of the Coast LLC. This application is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.

## 🎨 AI Avatar Generation

Generate unique character portraits using advanced AI models:

### Features
- **Replicate flux.schnell** - High-quality Stable Diffusion model with excellent diversity
- **Anti-Trope Protection** - Built-in safeguards against problematic fantasy stereotypes
- **Character-Based Prompts** - Avatars generated from race, class, gender, and equipment
- **Respectful Design** - Realistic armor, practical clothing, normal proportions

### Anti-Trope Safeguards
- ✅ **Practical Armor** - Full coverage, realistic protection (no chainmail bikinis!)
- ✅ **Realistic Proportions** - Normal body shapes and sizes
- ✅ **Functional Clothing** - Appropriate adventuring gear
- ✅ **Respectful Poses** - Confident stances, not sexualized
- ✅ **Grounded Fantasy** - Believable character designs

### Setup (Required)
```bash
# Add to .env.local for Replicate generation
REPLICATE_API_KEY=your_replicate_api_key_here
```

**Get your API key at**: https://replicate.com/account/api-tokens

### Replicate Pricing
- **Pay-per-use**: Only pay for what you generate
- **flux.schnell model**: High-quality Stable Diffusion variant
- **Diversity**: Excellent handling of diverse skin tones and features
- **No monthly minimum**: No subscription required

---

Ready to manage your D&D characters like a pro? 🏰⚔️🛡️
