import { NameComponents } from '../types'

export const halfOrcNames: NameComponents = {
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
        { type: 'familyName' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' },
        { type: 'familyName' }
      ],
      separator: ' '
    }
  ],
  parts: {
    givenName: [
      // Male names
      'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren',
      'Ront', 'Shump', 'Thokk',
      // Female names
      'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha',
      'Sutha', 'Vola', 'Volen', 'Yevelda'
    ],
    familyName: [
      'Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag',
      'Bersk', 'Chernin', 'Dotsk', 'Kulenov', 'Marsk', 'Nemetsk', 'Shemov', 'Starag',
      'Brightwood', 'Helder', 'Hornraven', 'Lackman', 'Stormwind', 'Windrivver'
    ]
  },
  cultures: {
    tribal: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        givenName: [
          'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren',
          'Ront', 'Shump', 'Thokk'
        ]
      }
    },
    human: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        givenName: [
          'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren',
          'Ront', 'Shump', 'Thokk'
        ]
      }
    }
  }
} 