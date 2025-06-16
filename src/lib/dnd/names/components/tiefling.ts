import { NameComponents } from '../types'

export const tieflingNames: NameComponents = {
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
      'Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon',
      'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios', 'Skamos', 'Therai',
      // Female names
      'Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea', 'Kallista',
      'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta'
    ],
    epithet: [
      'the Virtuous', 'the Pure', 'the Righteous', 'the Just', 'the Noble',
      'the Honorable', 'the True', 'the Faithful', 'the Loyal', 'the Steadfast',
      'the Resolute', 'the Determined', 'the Strong', 'the Brave', 'the Bold',
      'the Daring', 'the Courageous', 'the Valiant', 'the Proud', 'the Noble',
      'the Wise', 'the Learned', 'the Knowledgeable', 'the Scholarly', 'the Studious',
      'the Kind', 'the Gentle', 'the Sweet', 'the Loving', 'the Caring'
    ]
  },
  cultures: {
    infernal: {
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
          'the Infernal', 'the Hellborn', 'the Fiendish', 'the Diabolic', 'the Demonic',
          'the Abyssal', 'the Nether', 'the Dark', 'the Shadow', 'the Void',
          'the Cursed', 'the Marked', 'the Branded', 'the Scarred', 'the Tainted'
        ]
      }
    },
    virtuous: {
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
          'the Virtuous', 'the Pure', 'the Righteous', 'the Just', 'the Noble',
          'the Honorable', 'the True', 'the Faithful', 'the Loyal', 'the Steadfast',
          'the Resolute', 'the Determined', 'the Strong', 'the Brave', 'the Bold'
        ]
      }
    }
  }
} 