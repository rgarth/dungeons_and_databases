import { NameComponents } from '../types'

export const halfOrcNames: NameComponents = {
  patterns: [
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
    },
    {
      parts: [
        { type: 'givenName', gender: 'neutral' },
        { type: 'familyName' }
      ],
      separator: ' '
    }
  ],
  parts: {
    givenName: {
      male: [
        'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront',
        'Shump', 'Thokk'
      ],
      female: [
        'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha',
        'Vola', 'Volen', 'Yevelda'
      ],
      neutral: [
        'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront',
        'Shump', 'Thokk'
      ]
    },
    familyName: [
      'Bersk', 'Chernin', 'Dotsk', 'Kulenov', 'Marsk', 'Nemetsk', 'Shemov', 'Starag'
    ]
  },
  cultures: {
    orcish: {
      patterns: [
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
        },
        {
          parts: [
            { type: 'givenName', gender: 'neutral' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        givenName: {
          male: [
            'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront',
            'Shump', 'Thokk'
          ],
          female: [
            'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha',
            'Vola', 'Volen', 'Yevelda'
          ],
          neutral: [
            'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront',
            'Shump', 'Thokk'
          ]
        }
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
        },
        {
          parts: [
            { type: 'givenName', gender: 'female' },
            { type: 'familyName' }
          ],
          separator: ' '
        },
        {
          parts: [
            { type: 'givenName', gender: 'neutral' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        givenName: {
          male: [
            'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront',
            'Shump', 'Thokk'
          ],
          female: [
            'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha',
            'Vola', 'Volen', 'Yevelda'
          ],
          neutral: [
            'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront',
            'Shump', 'Thokk'
          ]
        }
      }
    }
  }
} 