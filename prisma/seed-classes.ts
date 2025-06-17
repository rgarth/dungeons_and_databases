import prisma from './client'
import { classesData, classArmorProficiencies, classWeaponProficiencies } from './data/classes-data'

export async function seedClasses() {
  console.log('🎭 Seeding D&D classes...')
  
  // First, seed the classes
  for (const classData of classesData) {
    await prisma.dndClass.upsert({
      where: { name: classData.name },
      update: {
        description: classData.description,
        hitDie: classData.hitDie,
        primaryAbility: classData.primaryAbility,
        savingThrows: JSON.stringify(classData.savingThrows),
        skillChoices: JSON.stringify(classData.skillChoices),
        phbDescription: classData.phbDescription
      },
      create: {
        name: classData.name,
        description: classData.description,
        hitDie: classData.hitDie,
        primaryAbility: classData.primaryAbility,
        savingThrows: JSON.stringify(classData.savingThrows),
        skillChoices: JSON.stringify(classData.skillChoices),
        phbDescription: classData.phbDescription
      }
    })
  }

  console.log(`✅ Seeded ${classesData.length} classes`)

  // Seed armor proficiencies
  console.log('🛡️  Seeding armor proficiencies...')
  for (const armorProf of classArmorProficiencies) {
    const dndClass = await prisma.dndClass.findUnique({
      where: { name: armorProf.className }
    })

    if (dndClass) {
      await prisma.classArmorProficiency.upsert({
        where: {
          classId_armorType: {
            classId: dndClass.id,
            armorType: armorProf.armorType
          }
        },
        update: {},
        create: {
          classId: dndClass.id,
          armorType: armorProf.armorType
        }
      })
    }
  }

  console.log(`✅ Seeded ${classArmorProficiencies.length} armor proficiencies`)

  // Seed weapon proficiencies
  console.log('⚔️  Seeding weapon proficiencies...')
  await seedWeaponProficiencies()

  // After seeding, log the count of a table to verify data insertion
  const count = await prisma.dndClass.count();
  console.log(`Count of DndClass after seeding: ${count}`);
}

async function seedWeaponProficiencies() {
  console.log('Seeding weapon proficiencies...');
  for (const proficiency of classWeaponProficiencies) {
    const dndClass = await prisma.dndClass.findFirst({
      where: { name: proficiency.className }
    });

    if (!dndClass) {
      console.warn(`Class ${proficiency.className} not found, skipping weapon proficiency`);
      continue;
    }

    const existingProficiency = await prisma.classWeaponProficiency.findFirst({
      where: {
        classId: dndClass.id,
        proficiencyType: proficiency.proficiencyType,
        weaponName: proficiency.weaponName
      }
    });

    if (!existingProficiency) {
      await prisma.classWeaponProficiency.create({
        data: {
          classId: dndClass.id,
          proficiencyType: proficiency.proficiencyType,
          weaponName: proficiency.weaponName
        }
      });
    }
  }
  console.log('✅ Seeded weapon proficiencies');
}

async function main() {
  try {
    await seedClasses();
    console.log('🎉 Class seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding classes:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 