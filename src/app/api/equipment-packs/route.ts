import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface EquipmentPackResponse {
  id: string;
  name: string;
  description: string;
  cost: string;
  items: Array<{
    name: string;
    quantity: number;
    type: string;
    cost: string;
    weight: number;
    description: string | null;
  }>;
}

export async function GET(): Promise<NextResponse<EquipmentPackResponse[] | { error: string }>> {
  try {
    const equipmentPacks = await prisma.equipmentPack.findMany({
      include: {
        items: {
          include: {
            equipment: {
              select: {
                name: true,
                type: true,
                cost: true,
                weight: true,
                description: true
              }
            }
          },
          orderBy: {
            equipment: {
              name: 'asc'
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Transform to match the expected format
    const formattedPacks: EquipmentPackResponse[] = equipmentPacks.map(pack => ({
      id: pack.id,
      name: pack.name,
      description: pack.description,
      cost: pack.cost,
      items: pack.items.map(item => ({
        name: item.equipment.name,
        quantity: item.quantity,
        type: item.equipment.type,
        cost: item.equipment.cost,
        weight: item.equipment.weight || 0,
        description: item.equipment.description
      }))
    }));

    return NextResponse.json(formattedPacks);
  } catch (error) {
    console.error('Error fetching equipment packs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch equipment packs' },
      { status: 500 }
    );
  }
} 