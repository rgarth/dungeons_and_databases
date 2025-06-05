# 🎲 Dungeons & Databases

A modern D&D 5e character management application built with Next.js, Prisma, and SQLite.

## ✨ Features

- **Complete D&D 5e SRD Content** - 554 items ready for gameplay
- **Character Management** - Create, edit, and manage D&D characters
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

## 📄 License

This project is MIT licensed. All D&D content is from the official System Reference Document (SRD) and is used under the Open Game License.

---

Ready to manage your D&D characters like a pro? 🏰⚔️🛡️
