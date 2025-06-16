import { NameComponents } from '../types'

export const goliathNames: NameComponents = {
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
        'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
        'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
        'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
      ],
      female: [
        'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
        'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
        'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
      ],
      neutral: [
        'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
        'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
        'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
      ]
    },
    familyName: [
      'Anakalathai', 'Elanithino', 'Gathakanathi', 'Kalagiano', 'Katho-Olavi',
      'Kolae-Gileana', 'Ogolakanu', 'Thuliaga', 'Thunukalathi', 'Vaimei-Laga'
    ]
  },
  cultures: {
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
            'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
            'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
            'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
          ],
          female: [
            'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
            'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
            'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
          ],
          neutral: [
            'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
            'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
            'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
          ]
        }
      }
    },
    hill: {
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
            'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
            'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
            'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
          ],
          female: [
            'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
            'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
            'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
          ],
          neutral: [
            'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori',
            'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani',
            'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'
          ]
        }
      }
    }
  }
} 