import { NameComponents } from '../types'

export const aasimarNames: NameComponents = {
  patterns: [
    {
      parts: [
        { type: 'givenName', gender: 'male' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'male' },
        { type: 'epithet' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' },
        { type: 'epithet' }
      ],
      separator: ' '
    }
  ],
  parts: {
    givenName: [
      // Male names
      'Aritian', 'Beltin', 'Cernan', 'Dorn', 'Erdan', 'Falken', 'Gryphero',
      'Hacian', 'Icarus', 'Jirus', 'Kosj', 'Lasker', 'Mantis', 'Namen', 'Ormus',
      'Peregrine', 'Quillan', 'Rezen', 'Sontar', 'Tarkus', 'Uther', 'Varis',
      'Wolvar', 'Xavian', 'Zethus',
      // Female names
      'Arianna', 'Beltina', 'Cerna', 'Dorna', 'Erdana', 'Falka', 'Gryphena',
      'Hacia', 'Icarina', 'Jira', 'Kosja', 'Laskera', 'Mantisa', 'Namena',
      'Ormusa', 'Peregrina', 'Quilla', 'Rezena', 'Sontara', 'Tarkusa', 'Uthera',
      'Varisa', 'Wolvara', 'Xaviana', 'Zethusa'
    ],
    epithet: [
      'the Celestial', 'the Divine', 'the Holy', 'the Sacred', 'the Blessed',
      'the Chosen', 'the Favored', 'the Exalted', 'the Glorious', 'the Great',
      'the Pure', 'the Righteous', 'the Just', 'the Noble', 'the Honorable',
      'the True', 'the Faithful', 'the Loyal', 'the Steadfast', 'the Resolute',
      'the Determined', 'the Strong', 'the Brave', 'the Bold', 'the Daring',
      'the Courageous', 'the Valiant', 'the Proud', 'the Noble', 'the Wise'
    ]
  },
  cultures: {
    celestial: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'epithet' }
          ],
          separator: ' '
        }
      ],
      parts: {
        epithet: [
          'the Celestial', 'the Divine', 'the Holy', 'the Sacred', 'the Blessed',
          'the Chosen', 'the Favored', 'the Exalted', 'the Glorious', 'the Great',
          'the Pure', 'the Righteous', 'the Just', 'the Noble', 'the Honorable'
        ]
      }
    },
    mortal: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' }
          ],
          separator: ' '
        }
      ]
    }
  }
} 