import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
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
      include: {
        baseWeapon: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(customWeapons);
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

    const { baseWeaponId, modifier, customName, description } = await request.json();

    if (!baseWeaponId) {
      return NextResponse.json({ error: 'Base weapon ID is required' }, { status: 400 });
    }

    // Get the base weapon to use its properties
    const baseWeapon = await prisma.weapon.findUnique({
      where: { id: baseWeaponId }
    });

    if (!baseWeapon) {
      return NextResponse.json({ error: 'Base weapon not found' }, { status: 404 });
    }

    // Generate the weapon name
    const weaponName = customName?.trim() || 
      (modifier > 0 ? `+${modifier} ${baseWeapon.name}` : baseWeapon.name);

    const customWeapon = await prisma.customWeapon.create({
      data: {
        name: weaponName,
        baseWeaponId,
        modifier,
        customName: customName?.trim() || null,
        description: description?.trim() || null,
        creatorId: session.user.id
      },
      include: {
        baseWeapon: true
      }
    });

    return NextResponse.json(customWeapon);
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