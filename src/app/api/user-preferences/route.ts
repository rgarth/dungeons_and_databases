import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Session } from 'next-auth';
import { UserPreference } from '@prisma/client';

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// Get all preferences for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const preferences = await prisma.userPreference.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        key: 'asc'
      }
    });

    // Convert to key-value object for easier consumption
    const preferencesObject = preferences.reduce((acc: Record<string, string>, pref) => {
      acc[pref.key] = pref.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(preferencesObject);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}

// Set a specific preference
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    // Use upsert to create or update the preference
    const preference = await prisma.userPreference.upsert({
      where: {
        userId_key: {
          userId: session.user.id,
          key: key
        }
      },
      update: {
        value: value.toString(),
        updatedAt: new Date()
      },
      create: {
        id: crypto.randomUUID(),
        userId: session.user.id,
        key: key,
        value: value.toString()
      }
    });

    return NextResponse.json({ [key]: preference.value });
  } catch (error) {
    console.error('Error setting user preference:', error);
    return NextResponse.json({ error: 'Failed to set preference' }, { status: 500 });
  }
}

// Update multiple preferences at once
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const preferences = await request.json();

    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json({ error: 'Preferences object is required' }, { status: 400 });
    }

    const results: Record<string, string> = {};

    // Update each preference
    for (const [key, value] of Object.entries(preferences)) {
      if (value !== undefined) {
        const preference = await prisma.userPreference.upsert({
          where: {
            userId_key: {
              userId: session.user.id,
              key: key
            }
          },
          update: {
            value: value.toString(),
            updatedAt: new Date()
          },
          create: {
            id: crypto.randomUUID(),
            userId: session.user.id,
            key: key,
            value: value.toString()
          }
        });
        results[key] = preference.value;
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
} 