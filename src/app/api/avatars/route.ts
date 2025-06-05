import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const avatarsPath = path.join(process.cwd(), 'public', 'avatars');
    const files = await fs.readdir(avatarsPath);
    
    // Filter for PNG files and parse the filename format Race_Class_Gender.png
    const avatars: Array<{
      filename: string;
      race: string;
      class: string;
      gender: string;
      displayName: string;
    }> = [];
    
    const availableRaces = new Set<string>();
    const availableClasses = new Set<string>();
    const availableGenders = new Set<string>();
    
    files.forEach(file => {
      if (file.endsWith('.png') && file !== '.DS_Store') {
        // Parse filename: Race_Class_Gender.png
        const nameWithoutExt = file.replace('.png', '');
        const parts = nameWithoutExt.split('_');
        
        if (parts.length === 3) {
          const [race, characterClass, gender] = parts;
          
          avatars.push({
            filename: file,
            race,
            class: characterClass,
            gender,
            displayName: `${gender} ${race} ${characterClass}`
          });
          
          availableRaces.add(race);
          availableClasses.add(characterClass);
          availableGenders.add(gender);
        }
      }
    });
    
    return NextResponse.json({
      avatars,
      races: Array.from(availableRaces).sort(),
      classes: Array.from(availableClasses).sort(),
      genders: Array.from(availableGenders).sort()
    });
  } catch (error) {
    console.error('Error reading avatars directory:', error);
    return NextResponse.json({ error: 'Failed to load avatars' }, { status: 500 });
  }
} 