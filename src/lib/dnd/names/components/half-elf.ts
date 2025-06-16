import { NameComponents } from '../types'

export const halfElfNames: NameComponents = {
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
      'Adran', 'Aelar', 'Aramil', 'Arannis', 'Aust', 'Beiro', 'Berrian', 'Carric',
      'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Hadarai', 'Heian', 'Himo', 'Immeral',
      'Ivellios', 'Laucian', 'Mindartis', 'Paelias', 'Peren', 'Quarion', 'Riardon',
      'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Theren', 'Varis',
      // Female names
      'Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna', 'Birel',
      'Caelynn', 'Drusilia', 'Enna', 'Felosial', 'Ielenia', 'Jelenneth', 'Keyleth',
      'Leshanna', 'Lia', 'Meriele', 'Mialee', 'Naivara', 'Quelenna', 'Quillathe',
      'Sariel', 'Shanairra', 'Shava', 'Silaqui', 'Theirastra', 'Thia', 'Vadania',
      'Valanthe', 'Xanaphia'
    ],
    familyName: [
      'Amakiir', 'Amastacia', 'Galanodel', 'Holimion', 'Ilphelkiir', 'Liadon',
      'Meliamne', 'Naïlo', 'Siannodel', 'Xiloscient'
    ]
  },
  cultures: {
    elven: {
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
          'Adran', 'Aelar', 'Aramil', 'Arannis', 'Aust', 'Beiro', 'Berrian', 'Carric',
          'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Hadarai', 'Heian', 'Himo', 'Immeral',
          'Ivellios', 'Laucian', 'Mindartis', 'Paelias', 'Peren', 'Quarion', 'Riardon',
          'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Theren', 'Varis'
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
          'Adran', 'Aelar', 'Aramil', 'Arannis', 'Aust', 'Beiro', 'Berrian', 'Carric',
          'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Hadarai', 'Heian', 'Himo', 'Immeral',
          'Ivellios', 'Laucian', 'Mindartis', 'Paelias', 'Peren', 'Quarion', 'Riardon',
          'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Theren', 'Varis'
        ]
      }
    }
  }
} 