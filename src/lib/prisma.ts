import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configure Prisma for Vercel's serverless environment
const createPrismaClient = () => {
  // Add connection pool parameters to DATABASE_URL for production
  let databaseUrl = process.env.DATABASE_URL;
  
  if (process.env.NODE_ENV === 'production' && databaseUrl) {
    const url = new URL(databaseUrl);
    url.searchParams.set('connection_limit', process.env.DATABASE_CONNECTION_LIMIT || '10');
    url.searchParams.set('pool_timeout', process.env.DATABASE_POOL_TIMEOUT || '30');
    url.searchParams.set('connect_timeout', '30');
    databaseUrl = url.toString();
  }

  return new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: databaseUrl,
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