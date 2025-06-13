import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedEquipmentPacks } from '@/lib/server/init';

export async function GET() {
  try {
    // Return cached data if available
    if (cachedEquipmentPacks) {
      return NextResponse.json(cachedEquipmentPacks);
    }

    // Fallback to database if cache is not initialized
    const packs = await prisma.equipmentPack.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        cost: true,
        items: {
          select: {
            quantity: true,
            equipment: {
              select: {
                name: true,
                type: true,
                cost: true,
                weight: true,
                description: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Transform the data to match the expected response type
    const transformedPacks = packs.map(pack => ({
      id: pack.id,
      name: pack.name,
      description: pack.description,
      cost: pack.cost,
      items: pack.items.map(item => ({
        name: item.equipment.name,
        quantity: item.quantity,
        type: item.equipment.type,
        cost: item.equipment.cost,
        weight: item.equipment.weight,
        description: item.equipment.description
      }))
    }));

    return NextResponse.json(transformedPacks);
  } catch (error) {
    console.error('Failed to fetch equipment packs:', error);
    return NextResponse.json({ error: 'Failed to fetch equipment packs' }, { status: 500 });
  }
} 