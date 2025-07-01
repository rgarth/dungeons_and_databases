import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { dndDataService } from '@/lib/dnd-data-service';
import { Session } from 'next-auth';

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const customWeapons = await prisma.customWeapon.findMany({
      where: {
        creatorId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Enrich with base weapon data from TypeScript service
    const enrichedWeapons = customWeapons.map(weapon => {
      const baseWeapon = dndDataService.getWeaponByName(weapon.baseWeaponName);
      return {
        ...weapon,
        baseWeapon: baseWeapon || null
      };
    });

    return NextResponse.json(enrichedWeapons);
  } catch (error) {
    console.error('Error fetching custom weapons:', error);
    return NextResponse.json({ error: 'Failed to fetch custom weapons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { baseWeaponName, modifier, customName, description } = await request.json();

    if (!baseWeaponName) {
      return NextResponse.json({ error: 'Base weapon name is required' }, { status: 400 });
    }

    // Get the base weapon from TypeScript data service
    const baseWeapon = dndDataService.getWeaponByName(baseWeaponName);

    if (!baseWeapon) {
      return NextResponse.json({ error: 'Base weapon not found' }, { status: 404 });
    }

    // Generate the weapon name
    const weaponName = customName?.trim() || 
      (modifier > 0 ? `+${modifier} ${baseWeapon.name}` : baseWeapon.name);

    const customWeapon = await prisma.customWeapon.create({
      data: {
        name: weaponName,
        baseWeaponName,
        modifier,
        customName: customName?.trim() || null,
        description: description?.trim() || null,
        creatorId: session.user.id
      }
    });

    // Return with base weapon data
    return NextResponse.json({
      ...customWeapon,
      baseWeapon
    });
  } catch (error) {
    console.error('Error creating custom weapon:', error);
    return NextResponse.json({ error: 'Failed to create custom weapon' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Weapon ID is required' }, { status: 400 });
    }

    // Verify ownership before deleting
    const weapon = await prisma.customWeapon.findUnique({
      where: { id }
    });

    if (!weapon) {
      return NextResponse.json({ error: 'Weapon not found' }, { status: 404 });
    }

    if (weapon.creatorId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.customWeapon.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting custom weapon:', error);
    return NextResponse.json({ error: 'Failed to delete custom weapon' }, { status: 500 });
  }
} 