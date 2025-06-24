import { NextRequest, NextResponse } from "next/server";
import { generateName } from "@/lib/dnd/names";
import { Gender } from "@/lib/dnd/names/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const race = searchParams.get('race');
    const gender = searchParams.get('gender') as Gender | null;

    if (!race) {
      return NextResponse.json({ error: 'Race is required' }, { status: 400 });
    }

    const name = generateName(race, gender || undefined);
    console.log('Generated name:', name);
    
    return NextResponse.json({ name });
  } catch (error) {
    console.error('Error generating name:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to generate name' }, { status: 500 });
  }
} 