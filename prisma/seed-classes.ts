import prisma from './client'
import { classesData, classArmorProficiencies, classWeaponProficiencies } from './data/classes-data'

export async function seedClasses() {
  console.log('🎭 Seeding D&D classes...')
  
  // First, seed ALL the classes
  console.log('📝 Creating classes...')
  for (const classData of classesData) {
    try {
      const result = await prisma.dndClass.upsert({
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
      console.log(`Created/Updated class: ${result.name} with ID: ${result.id}`)
    } catch (error) {
      console.error(`Failed to create/update class ${classData.name}:`, error)
      throw error
    }
  }

  console.log(`✅ Seeded ${classesData.length} classes`)

  // Verify classes were created
  const allClasses = await prisma.dndClass.findMany()
  console.log(`Verified classes in database: ${allClasses.length}`)
  allClasses.forEach(c => console.log(`  - ${c.name} (ID: ${c.id})`))

  // Now seed armor proficiencies (after all classes exist)
  console.log('🛡️  Seeding armor proficiencies...')
  
  // Get all classes in a single query to avoid lookup issues
  const classesForProficiencies = await prisma.dndClass.findMany()
  const classMap = new Map(classesForProficiencies.map(c => [c.name, c]))
  
  console.log(`Found ${classesForProficiencies.length} classes for armor proficiency seeding`)
  
  for (const armorProf of classArmorProficiencies) {
    const dndClass = classMap.get(armorProf.className)

    if (!dndClass) {
      console.warn(`Class ${armorProf.className} not found in class map, skipping armor proficiency`)
      continue
    }

    console.log(`Processing armor proficiency for ${armorProf.className} (ID: ${dndClass.id}) - ${armorProf.armorType}`)

    // Check if this armor proficiency already exists
    const existingArmorProf = await prisma.classArmorProficiency.findUnique({
      where: {
        classId_armorType: {
          classId: dndClass.id,
          armorType: armorProf.armorType
        }
      }
    })

    if (existingArmorProf) {
      console.log(`⏭️  Armor proficiency already exists for ${armorProf.className} - ${armorProf.armorType}`)
      continue
    }

    try {
      await prisma.classArmorProficiency.create({
        data: {
          classId: dndClass.id,
          armorType: armorProf.armorType
        }
      })
      console.log(`✅ Created armor proficiency for ${armorProf.className} - ${armorProf.armorType}`)
    } catch (error) {
      console.error(`Failed to create armor proficiency for ${armorProf.className} - ${armorProf.armorType}:`, error)
      console.error(`Class ID being used: ${dndClass.id}`)
      throw error
    }
  }

  console.log(`✅ Seeded ${classArmorProficiencies.length} armor proficiencies`)

  // Now seed weapon proficiencies (after all classes exist)
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
      try {
        await prisma.classWeaponProficiency.create({
          data: {
            classId: dndClass.id,
            proficiencyType: proficiency.proficiencyType,
            weaponName: proficiency.weaponName
          }
        });
        console.log(`✅ Created weapon proficiency for ${proficiency.className} - ${proficiency.proficiencyType} ${proficiency.weaponName || ''}`)
      } catch (error) {
        console.error(`Failed to create weapon proficiency for ${proficiency.className}:`, error)
        throw error
      }
    } else {
      console.log(`⏭️  Weapon proficiency already exists for ${proficiency.className} - ${proficiency.proficiencyType} ${proficiency.weaponName || ''}`)
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

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 