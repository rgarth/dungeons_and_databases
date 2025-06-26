import { NextRequest, NextResponse } from 'next/server';
import { classWeaponSuggestionsData, AmmunitionSuggestionData } from '../../../../prisma/data/weapon-suggestions-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json({ error: 'className parameter is required' }, { status: 400 });
    }

    // Find class data with ammunition suggestions from static data
    const classData = classWeaponSuggestionsData.find(
      (c: { className: string }) => c.className.toLowerCase() === className.toLowerCase()
    );
    
    if (!classData || !classData.ammunition) {
      return NextResponse.json([]);
    }

    // Return ammunition suggestions
    const ammunitionSuggestions = classData.ammunition.map((ammo: AmmunitionSuggestionData) => ({
      ammunitionName: ammo.ammunitionName,
      quantity: ammo.quantity,
      reason: ammo.reason
    }));

    return NextResponse.json(ammunitionSuggestions);
  } catch (error) {
    console.error('Error fetching ammunition suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch ammunition suggestions' }, { status: 500 });
  }
} 