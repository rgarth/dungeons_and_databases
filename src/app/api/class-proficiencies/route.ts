import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedClasses } from '@/lib/server/init';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const includeArmor = searchParams.get('includeArmor');

    if (!className) {
      return NextResponse.json({ error: 'className parameter is required' }, { status: 400 });
    }

    // Use cached data if available
    if (cachedClasses) {
      const classData = cachedClasses.find(c => c.name === className);
      if (classData) {
        if (includeArmor === 'true') {
          // Return full proficiencies including armor
          const [weaponProficiencies, armorProficiencies] = await Promise.all([
            prisma.classWeaponProficiency.findMany({
              where: { classId: classData.id },
              select: { proficiencyType: true, weaponName: true }
            }),
            prisma.classArmorProficiency.findMany({
              where: { classId: classData.id },
              select: { armorType: true }
            })
          ]);

          const proficiencies = {
            weapons: {
              simple: weaponProficiencies.some(p => p.proficiencyType === 'Simple'),
              martial: weaponProficiencies.some(p => p.proficiencyType === 'Martial'),
              specific: weaponProficiencies
                .filter(p => p.proficiencyType === 'Specific' && p.weaponName)
                .map(p => p.weaponName!)
            },
            armor: armorProficiencies.map(p => p.armorType),
            savingThrows: classData.savingThrows
          };

          return NextResponse.json(proficiencies);
        } else {
          // Return just weapon proficiencies (backward compatibility)
          const weaponProficiencies = await prisma.classWeaponProficiency.findMany({
            where: { classId: classData.id },
            select: { proficiencyType: true, weaponName: true }
          });

          const proficiencies = {
            simple: weaponProficiencies.some(p => p.proficiencyType === 'Simple'),
            martial: weaponProficiencies.some(p => p.proficiencyType === 'Martial'),
            specific: weaponProficiencies
              .filter(p => p.proficiencyType === 'Specific' && p.weaponName)
              .map(p => p.weaponName!)
          };

          return NextResponse.json(proficiencies);
        }
      }
    }

    // Fallback to database if cache is not initialized
    if (includeArmor === 'true') {
      // Return full proficiencies including armor
      const [weaponProficiencies, armorProficiencies, classData] = await Promise.all([
        prisma.classWeaponProficiency.findMany({
          where: { class: { name: className } },
          select: { proficiencyType: true, weaponName: true }
        }),
        prisma.classArmorProficiency.findMany({
          where: { class: { name: className } },
          select: { armorType: true }
        }),
        prisma.dndClass.findUnique({
          where: { name: className },
          select: { savingThrows: true }
        })
      ]);

      const proficiencies = {
        weapons: {
          simple: weaponProficiencies.some(p => p.proficiencyType === 'Simple'),
          martial: weaponProficiencies.some(p => p.proficiencyType === 'Martial'),
          specific: weaponProficiencies
            .filter(p => p.proficiencyType === 'Specific' && p.weaponName)
            .map(p => p.weaponName!)
        },
        armor: armorProficiencies.map(p => p.armorType),
        savingThrows: classData ? classData.savingThrows : []
      };

      return NextResponse.json(proficiencies);
    } else {
      // Return just weapon proficiencies (backward compatibility)
      const weaponProficiencies = await prisma.classWeaponProficiency.findMany({
        where: { class: { name: className } },
        select: { proficiencyType: true, weaponName: true }
      });

      const proficiencies = {
        simple: weaponProficiencies.some(p => p.proficiencyType === 'Simple'),
        martial: weaponProficiencies.some(p => p.proficiencyType === 'Martial'),
        specific: weaponProficiencies
          .filter(p => p.proficiencyType === 'Specific' && p.weaponName)
          .map(p => p.weaponName!)
      };

      return NextResponse.json(proficiencies);
    }
  } catch (error) {
    console.error('Error fetching class proficiencies:', error);
    return NextResponse.json({ error: 'Failed to fetch class proficiencies' }, { status: 500 });
  }
} 