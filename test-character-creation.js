// Simple test script to verify character creation works without duplicates
// Run this with: node test-character-creation.js

const testCharacterCreation = async () => {
  const testData = {
    name: "Test Ranger",
    race: "Human", 
    class: "Ranger",
    background: "Outlander",
    alignment: "Neutral Good",
    statMethod: "standard",
    abilityScores: {
      strength: 13,
      dexterity: 15,
      constitution: 14,
      intelligence: 10,
      wisdom: 12,
      charisma: 8
    },
    selectedEquipmentPack: 0,
    selectedWeapons: [
      {
        weapon: {
          name: "Shortsword",
          type: "Martial",
          category: "Melee", 
          damage: "1d6",
          damageType: "piercing"
        },
        quantity: 1
      },
      {
        weapon: {
          name: "Shortbow", 
          type: "Simple",
          category: "Ranged",
          damage: "1d6", 
          damageType: "piercing"
        },
        quantity: 1
      }
    ],
    selectedSpells: []
  };

  try {
    console.log('🧪 Testing character creation...');
    console.log('📝 Selected weapons:', testData.selectedWeapons.map(w => `${w.quantity}x ${w.weapon.name}`));
    
    const response = await fetch('http://localhost:3000/api/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your auth headers here if needed
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      console.log('❌ Response not OK:', response.status);
      const errorText = await response.text();
      console.log('Error details:', errorText);
      return;
    }

    const result = await response.json();
    console.log('\n✅ Character created successfully!');
    console.log('📊 Result inventory weapons:', result.inventoryWeapons?.length || 0);
    console.log('🗡️  Weapons:', result.inventoryWeapons?.map(w => w.name) || []);
    
    // Check for duplicates
    const weaponCounts = {};
    result.inventoryWeapons?.forEach(weapon => {
      weaponCounts[weapon.name] = (weaponCounts[weapon.name] || 0) + 1;
    });
    
    console.log('\n📈 Weapon counts:');
    Object.entries(weaponCounts).forEach(([name, count]) => {
      console.log(`   ${name}: ${count}x ${count === 1 ? '✅' : '❌ DUPLICATE!'}`);
    });

    // Expected: 1 Shortsword, 1 Shortbow
    const expectedShortswords = 1;
    const expectedShortbows = 1;
    const actualShortswords = weaponCounts['Shortsword'] || 0;
    const actualShortbows = weaponCounts['Shortbow'] || 0;

    console.log('\n🎯 Expected vs Actual:');
    console.log(`   Shortswords: ${expectedShortswords} expected, ${actualShortswords} actual ${expectedShortswords === actualShortswords ? '✅' : '❌'}`);
    console.log(`   Shortbows: ${expectedShortbows} expected, ${actualShortbows} actual ${expectedShortbows === actualShortbows ? '✅' : '❌'}`);
    
    if (expectedShortswords === actualShortswords && expectedShortbows === actualShortbows) {
      console.log('\n🎉 SUCCESS: No duplicate weapons found!');
    } else {
      console.log('\n💥 FAILURE: Duplicate weapons still exist!');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

testCharacterCreation(); 