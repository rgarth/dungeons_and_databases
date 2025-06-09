import { NextApiRequest, NextApiResponse } from 'next';
import { getClassWeaponProficiencies, getClassProficiencies } from '../../lib/dnd/proficiencies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { className, includeArmor } = req.query;

  if (!className || typeof className !== 'string') {
    return res.status(400).json({ error: 'className parameter is required' });
  }

  try {
    if (includeArmor === 'true') {
      // Return full proficiencies including armor
      const proficiencies = await getClassProficiencies(className);
      res.status(200).json(proficiencies);
    } else {
      // Return just weapon proficiencies (backward compatibility)
      const proficiencies = await getClassWeaponProficiencies(className);
      res.status(200).json(proficiencies);
    }
  } catch (error) {
    console.error('Error fetching class proficiencies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 