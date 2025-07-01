import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json({ error: 'className parameter is required' }, { status: 400 });
    }

    const suggestions = dndDataService.getWeaponSuggestionsByClass(className);
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error fetching weapon suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch weapon suggestions' }, { status: 500 });
  }
} 