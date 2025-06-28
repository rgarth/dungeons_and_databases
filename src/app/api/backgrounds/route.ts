import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedBackgrounds } from '@/lib/server/init';
import { BackgroundData } from '@/components/shared/BackgroundSelector';

export async function GET() {
  try {
    // Return cached data if available
    if (cachedBackgrounds) {
      return NextResponse.json(cachedBackgrounds);
    }

    // Fallback to database if cache is not initialized
    const backgrounds = await prisma.background.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        skillProficiencies: true,
        languages: true,
        equipment: true,
        startingGold: true,
        startingGoldFormula: true,
        feature: true,
        featureDescription: true,
        suggestedCharacteristics: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Transform data to match BackgroundData interface (Prisma handles JSON parsing automatically)
    const parsedBackgrounds: BackgroundData[] = backgrounds.map(background => {
      // Helper function to ensure arrays
      const ensureArray = (value: unknown): string[] => {
        if (Array.isArray(value)) return value as string[];
        return [];
      };

      // Parse suggested characteristics with safety checks
      const parseSuggestedCharacteristics = (value: unknown) => {
        if (!value || typeof value !== 'object') return undefined;
        
        const parsed = value as Record<string, unknown>;
        if (parsed && typeof parsed === 'object') {
          return {
            personalityTraits: ensureArray(parsed.personalityTraits),
            ideals: ensureArray(parsed.ideals),
            bonds: ensureArray(parsed.bonds),
            flaws: ensureArray(parsed.flaws)
          };
        }
        return undefined;
      };

      return {
        name: background.name,
        description: background.description,
        skillProficiencies: ensureArray(background.skillProficiencies),
        languages: ensureArray(background.languages),
        equipment: ensureArray(background.equipment),
        startingGold: background.startingGold,
        startingGoldFormula: background.startingGoldFormula,
        feature: background.feature,
        featureDescription: background.featureDescription,
        suggestedCharacteristics: parseSuggestedCharacteristics(background.suggestedCharacteristics)
      };
    });

    return NextResponse.json(parsedBackgrounds);
  } catch (error) {
    console.error('Failed to fetch backgrounds:', error);
    return NextResponse.json({ error: 'Failed to fetch backgrounds' }, { status: 500 });
  }
} 