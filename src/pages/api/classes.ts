import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const classes = await prisma.dndClass.findMany({
      orderBy: { name: 'asc' }
    });

    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 