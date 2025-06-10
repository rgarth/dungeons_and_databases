import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const backgrounds = await prisma.background.findMany({
      orderBy: { name: 'asc' }
    });

    res.status(200).json(backgrounds);
  } catch (error) {
    console.error('Error fetching backgrounds:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 