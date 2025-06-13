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
        skillChoices: JSON.stringify(classData.skillChoices)
      },
      create: {
        name: classData.name,
        description: classData.description,
        hitDie: classData.hitDie,
        primaryAbility: classData.primaryAbility,
        savingThrows: JSON.stringify(classData.savingThrows),
        skillChoices: JSON.stringify(classData.skillChoices)
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
  for (const weaponProf of classWeaponProficiencies) {
    const dndClass = await prisma.dndClass.findUnique({
      where: { name: weaponProf.className }
    })

    if (dndClass) {
      // For Simple/Martial proficiencies, check if it already exists
      const existingProf = await prisma.classWeaponProficiency.findFirst({
        where: {
          classId: dndClass.id,
          proficiencyType: weaponProf.proficiencyType,
          weaponName: weaponProf.weaponName
        }
      })

      if (!existingProf) {
        await prisma.classWeaponProficiency.create({
          data: {
            classId: dndClass.id,
            proficiencyType: weaponProf.proficiencyType,
            weaponName: weaponProf.weaponName
          }
        })
      }
    }
  }

  console.log(`✅ Seeded ${classWeaponProficiencies.length} weapon proficiencies`)
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