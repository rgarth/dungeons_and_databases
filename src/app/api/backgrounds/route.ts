import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedBackgrounds } from '@/lib/server/init';
import { BackgroundData } from '@/components/shared/BackgroundSelector';

interface CachedBackground {
  name: string;
  description: string;
  skillProficiencies: unknown;
  languages: unknown;
  equipment: unknown;
  feature: string;
  featureDescription: string;
  suggestedCharacteristics?: {
    personalityTraits: unknown;
    ideals: unknown;
    bonds: unknown;
    flaws: unknown;
  };
}

export async function GET() {
  try {
    // Return cached data if available
    if (cachedBackgrounds) {
      // Ensure cached data matches BackgroundData interface
      const typedCachedBackgrounds = ((cachedBackgrounds as unknown) as CachedBackground[]).map(bg => ({
        name: bg.name,
        description: bg.description,
        skillProficiencies: Array.isArray(bg.skillProficiencies) ? bg.skillProficiencies : [],
        languages: Array.isArray(bg.languages) ? bg.languages : [],
        equipment: Array.isArray(bg.equipment) ? bg.equipment : [],
        feature: bg.feature,
        featureDescription: bg.featureDescription,
        suggestedCharacteristics: bg.suggestedCharacteristics ? {
          personalityTraits: Array.isArray(bg.suggestedCharacteristics.personalityTraits) ? bg.suggestedCharacteristics.personalityTraits : [],
          ideals: Array.isArray(bg.suggestedCharacteristics.ideals) ? bg.suggestedCharacteristics.ideals : [],
          bonds: Array.isArray(bg.suggestedCharacteristics.bonds) ? bg.suggestedCharacteristics.bonds : [],
          flaws: Array.isArray(bg.suggestedCharacteristics.flaws) ? bg.suggestedCharacteristics.flaws : []
        } : undefined
      }));
      return NextResponse.json(typedCachedBackgrounds);
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

    // Parse JSON fields and ensure they match the BackgroundData interface
    const parsedBackgrounds: BackgroundData[] = backgrounds.map(background => {
      // Helper function to safely parse JSON
      const safeParse = (value: unknown): string[] => {
        if (Array.isArray(value)) return value as string[];
        try {
          const parsed = JSON.parse(value as string);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.error('Failed to parse JSON:', e);
          return [];
        }
      };

      // Parse suggested characteristics
      const parseSuggestedCharacteristics = (value: unknown) => {
        if (!value) return undefined;
        try {
          const parsed = typeof value === 'string' ? JSON.parse(value) : value;
          if (typeof parsed === 'object' && parsed !== null) {
            return {
              personalityTraits: Array.isArray(parsed.personalityTraits) ? parsed.personalityTraits : [],
              ideals: Array.isArray(parsed.ideals) ? parsed.ideals : [],
              bonds: Array.isArray(parsed.bonds) ? parsed.bonds : [],
              flaws: Array.isArray(parsed.flaws) ? parsed.flaws : []
            };
          }
        } catch (e) {
          console.error('Failed to parse suggested characteristics:', e);
        }
        return undefined;
      };

      return {
        name: background.name,
        description: background.description,
        skillProficiencies: safeParse(background.skillProficiencies),
        languages: safeParse(background.languages),
        equipment: safeParse(background.equipment),
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