import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const trait = await prisma.racialTrait.findUnique({
      where: {
        name: params.name
      }
    });

    if (!trait) {
      return new NextResponse('Trait not found', { status: 404 });
    }

    return NextResponse.json(trait);
  } catch (error) {
    console.error('Error fetching racial trait:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 