import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { className: string } }
) {
  try {
    const className = params.className;
    
    const classData = await prisma.dndClass.findUnique({
      where: {
        name: className
      },
      select: {
        id: true,
        name: true,
        description: true,
        hitDie: true,
        primaryAbility: true,
        savingThrows: true,
        skillChoices: true,
        phbDescription: true
      }
    });

    if (!classData) {
      return new NextResponse('Class not found', { status: 404 });
    }

    return NextResponse.json(classData);
  } catch (error) {
    console.error('Error fetching class data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 