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

// Get user preferences (currently just dieColor)
export async function GET() {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const preference = await prisma.userPreference.findUnique({
      where: {
        userId: session.user.id
      }
    });

    // Return the preference or default values
    return NextResponse.json({
      dieColor: preference?.dieColor || '#dc2626' // Default red color
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}

// Update die color preference
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { dieColor } = await request.json();

    if (!dieColor) {
      return NextResponse.json({ error: 'dieColor is required' }, { status: 400 });
    }

    // Validate hex color format
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexColorRegex.test(dieColor)) {
      return NextResponse.json({ error: 'Invalid color format. Use hex color (e.g., #ff0000)' }, { status: 400 });
    }

    // Use upsert to create or update the preference
    const preference = await prisma.userPreference.upsert({
      where: {
        userId: session.user.id
      },
      update: {
        dieColor: dieColor,
        updatedAt: new Date()
      },
      create: {
        id: crypto.randomUUID(),
        userId: session.user.id,
        dieColor: dieColor
      }
    });

    return NextResponse.json({ dieColor: preference.dieColor });
  } catch (error) {
    console.error('Error setting user preference:', error);
    return NextResponse.json({ error: 'Failed to set preference' }, { status: 500 });
  }
}

// Update multiple preferences (currently just dieColor)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { dieColor } = await request.json();

    if (dieColor !== undefined) {
      // Validate hex color format
      const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexColorRegex.test(dieColor)) {
        return NextResponse.json({ error: 'Invalid color format. Use hex color (e.g., #ff0000)' }, { status: 400 });
      }

      const preference = await prisma.userPreference.upsert({
        where: {
          userId: session.user.id
        },
        update: {
          dieColor: dieColor,
          updatedAt: new Date()
        },
        create: {
          id: crypto.randomUUID(),
          userId: session.user.id,
          dieColor: dieColor
        }
      });

      return NextResponse.json({ dieColor: preference.dieColor });
    }

    return NextResponse.json({ error: 'No valid preferences provided' }, { status: 400 });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
} 