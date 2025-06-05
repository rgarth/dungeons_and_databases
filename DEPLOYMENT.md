# 🚀 Dungeons & Databases - Deployment Guide

This guide covers deploying your D&D character management application to production with all game content properly seeded.

## 📋 Quick Overview

The app includes **177 items** of D&D 5e SRD content:
- **23 spells** (cantrips)
- **37 weapons** (simple & martial) 
- **16 armor pieces** (light, medium, heavy + shield variants)
- **105 equipment items** (adventuring gear, tools, packs)

## 🛠️ Production Scripts

### Database Commands
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations (production)
npm run db:migrate

# Seed D&D content (safe - won't overwrite)
npm run db:seed:check

# Force seed (overwrites existing data)
npm run db:seed:force

# Prepare database for deployment
npm run deploy:prepare

# Full deployment build + database setup
npm run deploy:full
```

### Development Commands
```bash
# Development database migration
npm run db:migrate:dev

# Development seeding (clears and re-seeds)
npm run db:seed

# Reset database completely
npm run db:reset

# Open Prisma Studio
npm run db:studio
```

## 🎯 Deployment Steps

### 1. **Environment Setup**

Set these environment variables in your deployment platform:

```bash
# Database
DATABASE_URL="your-production-database-url"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"

# Environment
NODE_ENV="production"
```

### 2. **Database Initialization**

For a **fresh deployment:**
```bash
npm run deploy:full
```

For **existing deployment with database:**
```bash
npm run deploy:prepare
```

### 3. **Platform-Specific Instructions**

#### **Vercel**
1. Connect your GitHub repo
2. Set environment variables in dashboard
3. Add build command: `npm run deploy:full`
4. Deploy

#### **Railway**
1. Connect repo
2. Set environment variables
3. Add start command: `npm start`
4. Add deploy command: `npm run deploy:full`

#### **Heroku**
1. Create app: `heroku create your-app-name`
2. Set environment variables: `heroku config:set VAR=value`
3. Add to `package.json`:
   ```json
   "scripts": {
     "heroku-postbuild": "npm run deploy:full"
   }
   ```
4. Deploy: `git push heroku main`

#### **DigitalOcean App Platform**
1. Create app from GitHub
2. Set environment variables in dashboard
3. Add build command: `npm run deploy:full`
4. Deploy

## ⚙️ Seeding Behavior

### Smart Seeding Logic
The production seed script is **idempotent** and environment-aware:

- **Development**: Always clears and re-seeds
- **Production with no data**: Seeds automatically
- **Production with existing data**: Skips unless `--force` used

### Seeding Commands Explained

```bash
# Safe seeding - won't overwrite existing data
npm run db:seed:check

# Force seeding - overwrites all D&D content
npm run db:seed:force

# Development seeding - always clears and re-seeds
npm run db:seed
```

## 📊 Content Validation

The seed script automatically validates that all content was seeded correctly:

```
🔍 Validating seeded data...
✅ Data validation successful!
📊 Total items: 177
   📜 Spells: 23
   ⚔️  Weapons: 37
   🛡️  Armor: 16
   🎒 Equipment: 105
```

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db push --preview-feature
```

### Migration Issues
```bash
# Reset and re-run migrations
npm run db:reset
npm run deploy:prepare
```

### Seeding Issues
```bash
# Check what's currently in database
npx prisma studio

# Force re-seed everything
npm run db:seed:force
```

### Environment Issues
```bash
# Verify environment variables
echo $DATABASE_URL
echo $NODE_ENV
```

## 📝 File Structure

```
prisma/
├── schema.prisma           # Database schema
├── seed-production.ts      # Production-ready seed script
├── seed.ts                # Development seed script
├── data/
│   └── index.ts           # Consolidated D&D content
├── weapons-data.ts        # Weapon definitions
├── armor-data.ts          # Armor definitions
└── equipment-data.ts      # Equipment definitions
```

## 🛡️ Production Safety

### Data Protection
- Production seeding is **safe by default**
- Won't overwrite existing data without `--force`
- Validates data integrity after seeding
- Provides clear logging for debugging

### Error Handling
- Graceful failure with clear error messages
- Automatic cleanup on failure
- Environment-specific behavior
- Transaction safety

## 🔄 Updates & Maintenance

### Adding New Content
1. Update data files in `prisma/`
2. Test locally: `npm run db:seed`
3. Deploy: `npm run deploy:prepare`

### Schema Changes
1. Update `prisma/schema.prisma`
2. Create migration: `npm run db:migrate:dev`
3. Deploy migration: `npm run db:migrate`

### Content Updates
```bash
# Update existing content (safe)
npm run db:seed:check

# Force content refresh
npm run db:seed:force
```

## ✅ Pre-Deployment Checklist

- [ ] Environment variables set
- [ ] Database URL configured
- [ ] NextAuth secret generated
- [ ] Build command set to `npm run deploy:full`
- [ ] Database accessible from deployment platform
- [ ] Content validation passes locally

## 🎯 Success Criteria

After deployment, verify:
- [ ] App loads without errors
- [ ] Database has 177 D&D items
- [ ] Character creation works
- [ ] All equipment/spells/weapons available
- [ ] User authentication functional

Your D&D application is now ready for adventurers! 🎲⚔️🛡️ 