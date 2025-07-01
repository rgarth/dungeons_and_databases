import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { className: string } }
) {
  try {
    const { className } = await params;
    
    const classData = dndDataService.getClassByName(className);

    if (!classData) {
      return new NextResponse('Class not found', { status: 404 });
    }

    // Transform to match expected structure
    const transformedClass = {
      id: classData.id || `class_${classData.name.toLowerCase()}`,
      name: classData.name,
      description: classData.description,
      hitDie: classData.hitDie,
      primaryAbility: classData.primaryAbility,
      savingThrows: classData.savingThrows,
      skillChoices: classData.skillChoices,
      startingGoldFormula: null // Not in TypeScript data, will need to be added if needed
    };

    return NextResponse.json(transformedClass);
  } catch (error) {
    console.error('Error fetching class data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 