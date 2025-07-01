import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET() {
  try {
    const packs = dndDataService.getEquipmentPacks();
    return NextResponse.json(packs);
  } catch (error) {
    console.error('Failed to fetch equipment packs:', error);
    return NextResponse.json({ error: 'Failed to fetch equipment packs' }, { status: 500 });
  }
} 