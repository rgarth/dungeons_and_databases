import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    switch (req.method) {
      case 'GET':
        // Get all custom weapons for the current user
        const customWeapons = await prisma.customWeapon.findMany({
          where: {
            creatorId: user.id
          },
          include: {
            baseWeapon: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

        // Transform the data to include calculated fields
        const transformedWeapons = customWeapons.map(weapon => ({
          id: weapon.id,
          name: weapon.name,
          customName: weapon.customName,
          description: weapon.description,
          modifier: weapon.modifier,
          baseWeapon: weapon.baseWeapon,
          // Calculate enhanced stats
          enhancedDamage: weapon.modifier > 0 ? `${weapon.baseWeapon.damage} + ${weapon.modifier}` : weapon.baseWeapon.damage,
          enhancedToHit: weapon.modifier > 0 ? `+${weapon.modifier}` : '+0',
          type: weapon.baseWeapon.type,
          category: weapon.baseWeapon.category,
          damageType: weapon.baseWeapon.damageType,
          properties: weapon.baseWeapon.properties,
          weight: weapon.baseWeapon.weight,
          cost: weapon.baseWeapon.cost,
          createdAt: weapon.createdAt
        }));

        return res.status(200).json(transformedWeapons);

      case 'POST':
        // Create a new custom weapon
        const { baseWeaponId, modifier = 0, customName = null, description = null } = req.body;

        if (!baseWeaponId) {
          return res.status(400).json({ error: 'Base weapon name is required' });
        }

        // Get the base weapon by name to generate the weapon
        const baseWeapon = await prisma.weapon.findUnique({
          where: { name: baseWeaponId }
        });

        if (!baseWeapon) {
          return res.status(404).json({ error: 'Base weapon not found' });
        }

        // Generate the weapon name
        const generatedName = modifier > 0 
          ? `+${modifier} ${baseWeapon.name}`
          : baseWeapon.name;
        
        const finalName = customName || generatedName;

        // Check if user already has a weapon with this name
        const existingWeapon = await prisma.customWeapon.findUnique({
          where: {
            creatorId_name: {
              creatorId: user.id,
              name: finalName
            }
          }
        });

        if (existingWeapon) {
          return res.status(409).json({ error: 'You already have a weapon with this name' });
        }

        const newCustomWeapon = await prisma.customWeapon.create({
          data: {
            name: finalName,
            baseWeaponId: baseWeapon.id,
            modifier,
            customName,
            description,
            creatorId: user.id
          },
          include: {
            baseWeapon: true
          }
        });

        // Transform the response
        const transformedNewWeapon = {
          id: newCustomWeapon.id,
          name: newCustomWeapon.name,
          customName: newCustomWeapon.customName,
          description: newCustomWeapon.description,
          modifier: newCustomWeapon.modifier,
          baseWeapon: newCustomWeapon.baseWeapon,
          enhancedDamage: newCustomWeapon.modifier > 0 ? `${newCustomWeapon.baseWeapon.damage} + ${newCustomWeapon.modifier}` : newCustomWeapon.baseWeapon.damage,
          enhancedToHit: newCustomWeapon.modifier > 0 ? `+${newCustomWeapon.modifier}` : '+0',
          type: newCustomWeapon.baseWeapon.type,
          category: newCustomWeapon.baseWeapon.category,
          damageType: newCustomWeapon.baseWeapon.damageType,
          properties: newCustomWeapon.baseWeapon.properties,
          weight: newCustomWeapon.baseWeapon.weight,
          cost: newCustomWeapon.baseWeapon.cost,
          createdAt: newCustomWeapon.createdAt
        };

        return res.status(201).json(transformedNewWeapon);

      case 'DELETE':
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
          return res.status(400).json({ error: 'Weapon ID is required' });
        }

        // Make sure the weapon belongs to the current user
        const weaponToDelete = await prisma.customWeapon.findFirst({
          where: {
            id: id,
            creatorId: user.id
          }
        });

        if (!weaponToDelete) {
          return res.status(404).json({ error: 'Custom weapon not found or you do not have permission to delete it' });
        }

        await prisma.customWeapon.delete({
          where: { id: id }
        });

        return res.status(200).json({ message: 'Custom weapon deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Custom weapons API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 