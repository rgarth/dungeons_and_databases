# D&D Database Seeding Scripts

This directory contains scripts for seeding the database with official D&D 5e content.

## Available Scripts

### 🌱 `seed.ts` - Full Development Seed
```bash
npx tsx prisma/seed.ts
```
Complete seeding script with all D&D content. May have foreign key constraints in some environments.

### 🚀 `seed-production.ts` - Production Seed  
```bash
# Development
npx tsx prisma/seed-production.ts

# Production (force override)
npx tsx prisma/seed-production.ts --force

# Skip if data exists
npx tsx prisma/seed-production.ts --skip-if-exists
```
Production-ready seeding with proper error handling, validation, and safety checks.

### 🎒 `seed-equipment-packs.ts` - Equipment Packs Only
```bash
npx tsx prisma/seed-equipment-packs.ts
```
Seeds only the equipment packs data (7 official D&D 5e packs).

### 💎 `seed-treasures.ts` - Treasures Only
```bash
npx tsx prisma/seed-treasures.ts
```
Seeds only the treasure data (110 official D&D 5e treasures).

## Production Deployment

For production deployment, use the production seed script:

```bash
# 1. Ensure database is up
npx prisma db push

# 2. Seed all D&D content
npx tsx prisma/seed-production.ts --force

# 3. Verify seeding
npx prisma studio
```

## Content Overview

| Category | Count | Source |
|----------|-------|--------|
| Spells | 319 | D&D 5e SRD |
| Weapons | 37 | D&D 5e SRD |
| Armor | 14 | D&D 5e SRD |
| Equipment | 145 | D&D 5e SRD |
| Equipment Packs | 7 | D&D 5e SRD |
| Magical Items | 240+ | D&D 5e SRD |
| Treasures | 110 | D&D 5e SRD |

## Safety Features

- **Validation**: All scripts validate seeded data counts
- **Upsert Operations**: Production script uses upsert to prevent duplicates
- **Force Protection**: Production environment requires `--force` flag
- **Batch Processing**: Large datasets processed in batches for performance
- **Error Handling**: Comprehensive error reporting and cleanup

## Troubleshooting

### Foreign Key Constraints
If you encounter foreign key constraints:
```bash
# Use individual seeding scripts
npx tsx prisma/seed-treasures.ts
npx tsx prisma/seed-equipment-packs.ts
```

### Database Reset
To completely reset and reseed:
```bash
# Reset database
npx prisma migrate reset --force

# Reseed everything
npx tsx prisma/seed-production.ts
```

### Verification
Check seeded data:
```bash
# API verification
curl http://localhost:3000/api/treasures | jq 'length'
curl http://localhost:3000/api/equipment-packs | jq 'length'

# Database inspection
npx prisma studio
``` 