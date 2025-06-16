import { NameComponents } from '../types'

export const aasimarNames: NameComponents = {
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
        'Aritian', 'Beltin', 'Cernan', 'Domitian', 'Elian', 'Gareth', 'Harken',
        'Icarus', 'Jareth', 'Kael', 'Lucian', 'Marius', 'Nerius', 'Oren', 'Pelius',
        'Quillan', 'Rael', 'Soren', 'Tavian', 'Uriel', 'Varian', 'Xander', 'Zareth'
      ],
      female: [
        'Aria', 'Brielle', 'Celeste', 'Diana', 'Elena', 'Faye', 'Gwen', 'Helena',
        'Iris', 'Jade', 'Kira', 'Luna', 'Mira', 'Nova', 'Ophelia', 'Phoebe',
        'Quinn', 'Raven', 'Serena', 'Talia', 'Uma', 'Vera', 'Xena', 'Zara'
      ],
      neutral: [
        'Aritian', 'Beltin', 'Cernan', 'Domitian', 'Elian', 'Gareth', 'Harken',
        'Icarus', 'Jareth', 'Kael', 'Lucian', 'Marius', 'Nerius', 'Oren', 'Pelius',
        'Quillan', 'Rael', 'Soren', 'Tavian', 'Uriel', 'Varian', 'Xander', 'Zareth'
      ]
    },
    familyName: [
      'Brightwing', 'Celestial', 'Dawnbringer', 'Eveningstar', 'Heavenly',
      'Lightbringer', 'Morningstar', 'Radiant', 'Shining', 'Starborn'
    ]
  },
  cultures: {
    celestial: {
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
            'Aritian', 'Beltin', 'Cernan', 'Domitian', 'Elian', 'Gareth', 'Harken',
            'Icarus', 'Jareth', 'Kael', 'Lucian', 'Marius', 'Nerius', 'Oren', 'Pelius',
            'Quillan', 'Rael', 'Soren', 'Tavian', 'Uriel', 'Varian', 'Xander', 'Zareth'
          ],
          female: [
            'Aria', 'Brielle', 'Celeste', 'Diana', 'Elena', 'Faye', 'Gwen', 'Helena',
            'Iris', 'Jade', 'Kira', 'Luna', 'Mira', 'Nova', 'Ophelia', 'Phoebe',
            'Quinn', 'Raven', 'Serena', 'Talia', 'Uma', 'Vera', 'Xena', 'Zara'
          ],
          neutral: [
            'Aritian', 'Beltin', 'Cernan', 'Domitian', 'Elian', 'Gareth', 'Harken',
            'Icarus', 'Jareth', 'Kael', 'Lucian', 'Marius', 'Nerius', 'Oren', 'Pelius',
            'Quillan', 'Rael', 'Soren', 'Tavian', 'Uriel', 'Varian', 'Xander', 'Zareth'
          ]
        }
      }
    },
    fallen: {
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
            'Aritian', 'Beltin', 'Cernan', 'Domitian', 'Elian', 'Gareth', 'Harken',
            'Icarus', 'Jareth', 'Kael', 'Lucian', 'Marius', 'Nerius', 'Oren', 'Pelius',
            'Quillan', 'Rael', 'Soren', 'Tavian', 'Uriel', 'Varian', 'Xander', 'Zareth'
          ],
          female: [
            'Aria', 'Brielle', 'Celeste', 'Diana', 'Elena', 'Faye', 'Gwen', 'Helena',
            'Iris', 'Jade', 'Kira', 'Luna', 'Mira', 'Nova', 'Ophelia', 'Phoebe',
            'Quinn', 'Raven', 'Serena', 'Talia', 'Uma', 'Vera', 'Xena', 'Zara'
          ],
          neutral: [
            'Aritian', 'Beltin', 'Cernan', 'Domitian', 'Elian', 'Gareth', 'Harken',
            'Icarus', 'Jareth', 'Kael', 'Lucian', 'Marius', 'Nerius', 'Oren', 'Pelius',
            'Quillan', 'Rael', 'Soren', 'Tavian', 'Uriel', 'Varian', 'Xander', 'Zareth'
          ]
        }
      }
    }
  }
} 