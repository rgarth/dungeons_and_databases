import { NameComponents } from '../types'

export const tabaxiNames: NameComponents = {
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
        'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
        'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
        'Thunder', 'Wind', 'Winter'
      ],
      female: [
        'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
        'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
        'Thunder', 'Wind', 'Winter'
      ],
      neutral: [
        'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
        'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
        'Thunder', 'Wind', 'Winter'
      ]
    },
    familyName: [
      'of the Claw', 'of the Fang', 'of the Paw', 'of the Tail', 'of the Whisker',
      'of the Eye', 'of the Ear', 'of the Nose', 'of the Tongue', 'of the Heart'
    ]
  },
  cultures: {
    jungle: {
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
            'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
            'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
            'Thunder', 'Wind', 'Winter'
          ],
          female: [
            'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
            'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
            'Thunder', 'Wind', 'Winter'
          ],
          neutral: [
            'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
            'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
            'Thunder', 'Wind', 'Winter'
          ]
        }
      }
    },
    mountain: {
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
            'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
            'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
            'Thunder', 'Wind', 'Winter'
          ],
          female: [
            'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
            'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
            'Thunder', 'Wind', 'Winter'
          ],
          neutral: [
            'Cloud', 'Dawn', 'Dusk', 'Flame', 'Frost', 'Haze', 'Mist', 'Moon',
            'Night', 'Rain', 'River', 'Sky', 'Snow', 'Star', 'Storm', 'Sun',
            'Thunder', 'Wind', 'Winter'
          ]
        }
      }
    }
  }
} 