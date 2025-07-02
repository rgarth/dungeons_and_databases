# Dungeons and Databases

A D&D 5e character builder and manager built with Next.js, TypeScript, and Supabase.

## ✨ Features

- **Complete D&D 5e SRD Content** - 554 items ready for gameplay
- **Character Management** - Create, edit, and manage D&D characters
- **AI Avatar Generation** - Create personalized character portraits
- **Equipment System** - Full weapon, armor, and equipment database
- **Spell Management** - Comprehensive spell system with all spell levels
- **User Authentication** - Secure user accounts with NextAuth
- **Theme Support** - Dark and light themes
- **Production Ready** - Automated deployment with database seeding

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Set up environment
cp .env.template .env.local
# Edit .env.local with your Supabase credentials

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
- `npm run dev` - Start development server
- `npm run db:seed` - Seed database (development)
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database completely

### Production
- `npm run deploy:full` - Complete production deployment
- `npm run deploy:prepare` - Prepare database for production
- `npm run db:seed:prod` - Production seeding
- `npm run db:seed:check` - Safe seed (won't overwrite)

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

## 🔧 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Deployment**: Platform agnostic (Vercel, Railway, etc.)

## 📁 Project Structure

```
prisma/
├── schema.prisma              # Database schema
├── seed-production.ts         # Production-ready seed script
└── data/                      # D&D content files
src/
├── app/                       # Next.js app directory
├── components/                # React components
└── lib/                       # Utility functions
```

## 🎮 Game Content

All content is sourced from the **D&D 5e System Reference Document (SRD)** - completely legal and free to use.

### Spells (Complete SRD)
- **All 396 official spells** from levels 0-9
- **Complete descriptions** with casting time, range, components, duration
- **Class availability** for each spell
- **School classification** (Abjuration, Conjuration, Divination, etc.)

### Weapons & Armor
- **Simple & Martial Weapons** with damage dice and properties
- **Light, Medium, Heavy Armor** + Shield variants
- **Complete equipment database** with adventuring gear and tools

## License

MIT
