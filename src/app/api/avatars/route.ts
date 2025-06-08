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
      avatarNumber: number | null;
    }> = [];
    
    const availableRaces = new Set<string>();
    const availableClasses = new Set<string>();
    const availableGenders = new Set<string>();
    
    files.forEach(file => {
      if (file.endsWith('.png') && file !== '.DS_Store') {
        // Parse filename: Race_Class_Gender.png or Race_Class_Gender_Number.png
        const nameWithoutExt = file.replace('.png', '');
        const parts = nameWithoutExt.split('_');
        
        // Handle both formats: Race_Class_Gender.png and Race_Class_Gender_Number.png
        if (parts.length === 3 || parts.length === 4) {
          const [race, characterClass, gender] = parts;
          const avatarNumber = parts.length === 4 ? parseInt(parts[3]) : null;
          
          // Create display name with variation number if present
          const displayName = avatarNumber !== null 
            ? `${gender} ${race} ${characterClass} #${avatarNumber + 1}` 
            : `${gender} ${race} ${characterClass}`;
          
          avatars.push({
            filename: file,
            race,
            class: characterClass,
            gender,
            displayName,
            avatarNumber // Add this for sorting later
          });
          
          availableRaces.add(race);
          availableClasses.add(characterClass);
          availableGenders.add(gender);
        }
      }
    });
    
    // Sort avatars to group by race/class/gender, with base avatar first
    const sortedAvatars = avatars.sort((a, b) => {
      // First sort by race, then class, then gender
      const aKey = `${a.race}_${a.class}_${a.gender}`;
      const bKey = `${b.race}_${b.class}_${b.gender}`;
      
      if (aKey !== bKey) {
        return aKey.localeCompare(bKey);
      }
      
      // Within the same combination, sort by avatar number (base avatar first)
      const aNum = a.avatarNumber ?? -1; // Base avatar gets -1 for sorting
      const bNum = b.avatarNumber ?? -1;
      return aNum - bNum;
    });

    return NextResponse.json({
      avatars: sortedAvatars,
      races: Array.from(availableRaces).sort(),
      classes: Array.from(availableClasses).sort(),
      genders: Array.from(availableGenders).sort()
    });
  } catch (error) {
    console.error('Error reading avatars directory:', error);
    return NextResponse.json({ error: 'Failed to load avatars' }, { status: 500 });
  }
} 