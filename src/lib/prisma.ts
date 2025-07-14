import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configure Prisma for Vercel's serverless environment
const createPrismaClient = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

// In production, we want to create a new Prisma client for each request
// In development, we want to reuse the same client
export const prisma = process.env.NODE_ENV === 'production' 
  ? createPrismaClient()
  : globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Export a function to get the shared instance
export const getPrismaClient = () => prisma;

// Helper to safely disconnect (only in scripts, not in API routes)
export const disconnectPrisma = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await prisma.$disconnect();
  }
}; 