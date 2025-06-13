import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configure Prisma for Aiven's connection limits
const createPrismaClient = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Configure logging
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

// Ensure single instance in development
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

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