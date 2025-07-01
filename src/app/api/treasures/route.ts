import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

// GET all treasures from database
export async function GET() {
  try {
    const treasures = dndDataService.getTreasure();
    return NextResponse.json(treasures);
  } catch (error) {
    console.error('Failed to fetch treasures:', error);
    return NextResponse.json({ error: 'Failed to fetch treasures' }, { status: 500 });
  }
} 