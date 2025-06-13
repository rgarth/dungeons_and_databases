import { PrismaClient } from '@prisma/client'

// Configure Prisma client with better connection settings
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

export default prisma 