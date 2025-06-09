import { NextApiRequest, NextApiResponse } from 'next';
import { getClassWeaponProficiencies } from '../../lib/dnd/proficiencies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { className } = req.query;

  if (!className || typeof className !== 'string') {
    return res.status(400).json({ error: 'className parameter is required' });
  }

  try {
    const proficiencies = await getClassWeaponProficiencies(className);
    res.status(200).json(proficiencies);
  } catch (error) {
    console.error('Error fetching class proficiencies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 