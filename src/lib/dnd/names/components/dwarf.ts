import { NameComponents } from '../types'

export const dwarfNames: NameComponents = {
  patterns: [
    {
      parts: [
        { type: 'givenName', gender: 'male' },
        { type: 'clanName' }
      ],
      separator: ' ',
      weight: 3 // Higher weight for full names
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' },
        { type: 'clanName' }
      ],
      separator: ' ',
      weight: 3 // Higher weight for full names
    },
    {
      parts: [
        { type: 'givenName', gender: 'male' }
      ],
      separator: ' ',
      weight: 1 // Lower weight for single names
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' }
      ],
      separator: ' ',
      weight: 1 // Lower weight for single names
    }
  ],
  parts: {
    givenName: [
      // Male names from D&D 5e PHB
      'Adrik', 'Alberich', 'Baern', 'Barendd', 'Brottor', 'Bruenor', 'Dain',
      'Darrak', 'Delg', 'Eberk', 'Einkil', 'Fargrim', 'Flint', 'Gardain',
      'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Oskar', 'Rangrim', 'Rurik',
      'Taklinn', 'Thoradin', 'Tordek', 'Traubon', 'Travok', 'Ulfgar', 'Veit',
      'Vondal', 'Bardin', 'Borin', 'Dorin', 'Durin', 'Garin', 'Gimli', 'Gloin',
      'Grimm', 'Harbin', 'Korin', 'Mardin', 'Nain', 'Narvi', 'Norin', 'Orik',
      'Rorin', 'Thorin', 'Thrain', 'Thror', 'Torin', 'Urin', 'Vorin',
      // Additional male names
      'Balin', 'Bifur', 'Bofur', 'Bombur', 'Dori', 'Dwalin', 'Fili', 'Gloin',
      'Kili', 'Nori', 'Oin', 'Ori', 'Thrain', 'Thror', 'Fundin', 'Gróin',
      'Farin', 'Borin', 'Nain', 'Grór', 'Frór',
      // Female names from D&D 5e PHB
      'Amber', 'Artin', 'Audhild', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth',
      'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja', 'Hlin', 'Kathra',
      'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn', 'Sannl', 'Torbera',
      'Torgga', 'Vistra', 'Dís', 'Frída', 'Hilda', 'Lóna', 'Náli', 'Rósa',
      'Thóra', 'Vígdís', 'Yngvild', 'Ása', 'Bergljót', 'Dagrún', 'Eiríkr',
      'Freyja', 'Geirríðr', 'Helga', 'Ingibjörg', 'Jórunn', 'Ragnhildr',
      'Sigríðr', 'Þóra', 'Þórunn'
    ],
    clanName: [
      // Clan names from D&D 5e PHB
      'Balderk', 'Battlehammer', 'Brawnanvil', 'Dankil', 'Fireforge', 'Frostbeard',
      'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Lutgehr', 'Rumnaheim',
      'Strakeln', 'Torunn', 'Ungart',
      // Additional clan names
      'Barrelhelm', 'Copperbeard', 'Goldaxe', 'Ironbeard', 'Silverhand',
      'Steelheart', 'Stonefist', 'Thunderforge', 'Bronzebeard', 'Copperaxe',
      'Goldbeard', 'Ironaxe', 'Silverbeard', 'Steelaxe', 'Stonebeard',
      'Thunderaxe', 'Bronzehelm', 'Copperheart', 'Goldhelm', 'Ironheart',
      'Silverhelm', 'Steelheart', 'Stonehelm', 'Thunderheart', 'Bronzefist',
      'Copperfist', 'Goldfist', 'Ironfist', 'Silverfist', 'Steelfist',
      'Stonefist', 'Thunderfist'
    ]
  },
  cultures: {
    mountain: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'clanName' }
          ],
          separator: ' ',
          weight: 3
        }
      ],
      parts: {
        clanName: [
          'Battlehammer', 'Brawnanvil', 'Fireforge', 'Frostbeard', 'Ironfist',
          'Strakeln', 'Torunn', 'Barrelhelm', 'Copperbeard', 'Goldaxe',
          'Ironbeard', 'Silverhand', 'Steelheart', 'Stonefist', 'Thunderforge',
          'Bronzebeard', 'Copperaxe', 'Goldbeard', 'Ironaxe', 'Silverbeard',
          'Steelaxe', 'Stonebeard', 'Thunderaxe', 'Bronzehelm', 'Copperheart',
          'Goldhelm', 'Ironheart', 'Silverhelm', 'Steelheart', 'Stonehelm'
        ]
      }
    },
    hill: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'clanName' }
          ],
          separator: ' ',
          weight: 3
        }
      ],
      parts: {
        clanName: [
          'Balderk', 'Dankil', 'Gorunn', 'Holderhek', 'Loderr', 'Lutgehr',
          'Rumnaheim', 'Ungart', 'Bronzefist', 'Copperfist', 'Goldfist',
          'Ironfist', 'Silverfist', 'Steelfist', 'Stonefist', 'Thunderfist',
          'Bronzehelm', 'Copperheart', 'Goldhelm', 'Ironheart', 'Silverhelm',
          'Steelheart', 'Stonehelm', 'Thunderheart', 'Bronzebeard', 'Copperaxe',
          'Goldbeard', 'Ironaxe', 'Silverbeard', 'Steelaxe', 'Stonebeard'
        ]
      }
    }
  }
} 