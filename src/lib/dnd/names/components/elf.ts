import { NameComponents } from '../types'

export const elfNames: NameComponents = {
  patterns: [
    {
      parts: [
        { type: 'prefix' },
        { type: 'givenName', gender: 'male' },
        { type: 'familyName' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'prefix' },
        { type: 'givenName', gender: 'female' },
        { type: 'familyName' }
      ],
      separator: ' '
    }
  ],
  parts: {
    prefix: [
      'Ael', 'Aer', 'Aeth', 'Al', 'Am', 'Ar', 'Ara', 'Ari', 'Aur', 'Be',
      'Ber', 'Bhel', 'Car', 'Cela', 'Dae', 'Dar', 'Del', 'Eil', 'Eir', 'El',
      'Ela', 'Eli', 'Er', 'Ere', 'Fa', 'Fae', 'Far', 'Fen', 'Gal', 'Gar',
      'Gil', 'Hal', 'Har', 'Hel', 'Iar', 'Il', 'Ili', 'Im', 'In', 'Iri',
      'Kal', 'Kar', 'Kor', 'La', 'Lae', 'Lar', 'Lor', 'Mal', 'Mar', 'Mel',
      'Mer', 'Mir', 'Mor', 'Nal', 'Nar', 'Nor', 'Olo', 'Or', 'Ora', 'Ori',
      'Pha', 'Phel', 'Phor', 'Qua', 'Quar', 'Quel', 'Quor', 'Ral', 'Rar',
      'Rel', 'Ror', 'Sal', 'Sar', 'Sel', 'Ser', 'Sil', 'Sol', 'Syl', 'Tal',
      'Tar', 'Tel', 'Ter', 'Tha', 'Thal', 'Thar', 'Thel', 'Ther', 'Thil',
      'Thir', 'Thor', 'Til', 'Tir', 'Tor', 'Ula', 'Ulo', 'Ura', 'Uri', 'Val',
      'Var', 'Vel', 'Ver', 'Vil', 'Vir', 'Vor', 'Wil', 'Wir', 'Wor', 'Xal',
      'Xar', 'Xel', 'Xer', 'Xil', 'Xir', 'Xor', 'Yal', 'Yar', 'Yel', 'Yer',
      'Yil', 'Yir', 'Yor', 'Zal', 'Zar', 'Zel', 'Zer', 'Zil', 'Zir', 'Zor'
    ],
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
    high: {
      patterns: [
        {
          parts: [
            { type: 'prefix' },
            { type: 'givenName', gender: 'male' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        prefix: [
          'Ael', 'Aer', 'Aeth', 'Al', 'Am', 'Ar', 'Ara', 'Ari', 'Aur', 'Be',
          'Ber', 'Bhel', 'Car', 'Cela', 'Dae', 'Dar', 'Del', 'Eil', 'Eir', 'El'
        ]
      }
    },
    wood: {
      patterns: [
        {
          parts: [
            { type: 'prefix' },
            { type: 'givenName', gender: 'male' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        prefix: [
          'Fa', 'Fae', 'Far', 'Fen', 'Gal', 'Gar', 'Gil', 'Hal', 'Har', 'Hel',
          'Iar', 'Il', 'Ili', 'Im', 'In', 'Iri', 'Kal', 'Kar', 'Kor', 'La'
        ]
      }
    },
    drow: {
      patterns: [
        {
          parts: [
            { type: 'prefix' },
            { type: 'givenName', gender: 'male' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        prefix: [
          'Il', 'Ili', 'Im', 'In', 'Iri', 'Kal', 'Kar', 'Kor', 'La', 'Lae',
          'Lar', 'Lor', 'Mal', 'Mar', 'Mel', 'Mer', 'Mir', 'Mor', 'Nal', 'Nar',
          'Nor', 'Olo', 'Or', 'Ora', 'Ori', 'Pha', 'Phel', 'Phor', 'Qua', 'Quar'
        ],
        familyName: [
          'Amakiir', 'Amastacia', 'Galanodel', 'Holimion', 'Ilphelkiir', 'Liadon',
          'Meliamne', 'Naïlo', 'Siannodel', 'Xiloscient'
        ]
      }
    }
  }
} 