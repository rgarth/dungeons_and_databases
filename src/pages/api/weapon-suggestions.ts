import { NextApiRequest, NextApiResponse } from 'next';
import { getWeaponSuggestionsForClass } from '../../lib/dnd/weapon-suggestions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { className } = req.query;

  if (!className || typeof className !== 'string') {
    return res.status(400).json({ error: 'className parameter is required' });
  }

  try {
    const suggestions = await getWeaponSuggestionsForClass(className);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error fetching weapon suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 