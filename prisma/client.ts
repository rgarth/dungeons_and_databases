import { PrismaClient } from '@prisma/client'

// Configure Prisma client with better connection settings
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

export default prisma 