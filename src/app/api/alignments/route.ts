import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET() {
  try {
    const alignments = dndDataService.getAlignments();
    
    // Return alignments data directly without synthetic IDs
    const transformedAlignments = alignments.map(alignment => ({
      name: alignment.name,
      shortName: alignment.shortName,
      description: alignment.description,
      ethicalAxis: alignment.ethicalAxis,
      moralAxis: alignment.moralAxis
    }));

    return NextResponse.json(transformedAlignments);
  } catch (error) {
    console.error('Failed to fetch alignments:', error);
    return NextResponse.json({ error: 'Failed to fetch alignments' }, { status: 500 });
  }
} 