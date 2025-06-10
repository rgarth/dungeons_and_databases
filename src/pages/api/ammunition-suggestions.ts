import { NextApiRequest, NextApiResponse } from 'next';
import { classWeaponSuggestionsData } from '../../../prisma/data/weapon-suggestions-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { className } = req.query;
  
  if (!className || typeof className !== 'string') {
    return res.status(400).json({ message: 'Class name is required' });
  }

  try {
    // Find class data with ammunition suggestions
    const classData = classWeaponSuggestionsData.find(
      c => c.className.toLowerCase() === className.toLowerCase()
    );
    
    if (!classData || !classData.ammunition) {
      return res.status(200).json([]);
    }

    // Return ammunition suggestions
    const ammunitionSuggestions = classData.ammunition.map(ammo => ({
      ammunitionName: ammo.ammunitionName,
      quantity: ammo.quantity,
      reason: ammo.reason
    }));

    return res.status(200).json(ammunitionSuggestions);
  } catch (error) {
    console.error('Error fetching ammunition suggestions:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 