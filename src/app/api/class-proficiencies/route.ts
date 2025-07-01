import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const includeArmor = searchParams.get('includeArmor');

    if (!className) {
      return NextResponse.json({ error: 'className parameter is required' }, { status: 400 });
    }

    const proficiencies = dndDataService.getClassProficiencies(className, includeArmor === 'true');
    
    if (!proficiencies) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    return NextResponse.json(proficiencies);
  } catch (error) {
    console.error('Error fetching class proficiencies:', error);
    return NextResponse.json({ error: 'Failed to fetch class proficiencies' }, { status: 500 });
  }
} 