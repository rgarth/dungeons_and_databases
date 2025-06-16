import { NameComponents } from '../types'

export const goliathNames: NameComponents = {
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
      'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
      'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
      'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak',
      // Female names
      'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
      'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
      'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
    ],
    epithet: [
      'the Strong', 'the Mighty', 'the Fierce', 'the Brave', 'the Bold',
      'the Daring', 'the Courageous', 'the Valiant', 'the Proud', 'the Noble',
      'the Honorable', 'the Just', 'the Righteous', 'the Pure', 'the Blessed',
      'the Chosen', 'the Favored', 'the Exalted', 'the Glorious', 'the Great',
      'the Wise', 'the Learned', 'the Knowledgeable', 'the Scholarly', 'the Studious',
      'the Kind', 'the Gentle', 'the Sweet', 'the Loving', 'the Caring'
    ]
  },
  cultures: {
    mountain: {
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
          'the Mountain', 'the Peak', 'the Summit', 'the High', 'the Tall',
          'the Great', 'the Mighty', 'the Strong', 'the Brave', 'the Bold',
          'the Daring', 'the Courageous', 'the Valiant', 'the Proud', 'the Noble'
        ]
      }
    },
    valley: {
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
          'the Valley', 'the Low', 'the Deep', 'the Wide', 'the Broad',
          'the Great', 'the Mighty', 'the Strong', 'the Brave', 'the Bold',
          'the Daring', 'the Courageous', 'the Valiant', 'the Proud', 'the Noble'
        ]
      }
    }
  }
} 