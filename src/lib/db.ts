import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use DIRECT_URL for migrations and schema changes
// Use DATABASE_URL (with pgbouncer) for regular queries
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Configure for pgbouncer
  log: ['error']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 