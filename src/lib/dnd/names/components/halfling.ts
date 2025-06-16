import { NameComponents } from '../types'

export const halflingNames: NameComponents = {
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
        'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal',
        'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'
      ],
      female: [
        'Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda',
        'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna'
      ],
      neutral: [
        'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal',
        'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'
      ]
    },
    familyName: [
      'Brushgather', 'Goodbarrel', 'Greenbottle', 'High-hill', 'Hilltopple', 'Leagallow',
      'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough'
    ]
  },
  cultures: {
    lightfoot: {
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
            'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal',
            'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'
          ],
          female: [
            'Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda',
            'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna'
          ],
          neutral: [
            'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal',
            'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'
          ]
        }
      }
    },
    stout: {
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
            'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal',
            'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'
          ],
          female: [
            'Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda',
            'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna'
          ],
          neutral: [
            'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal',
            'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'
          ]
        }
      }
    }
  }
} 