import { NameComponents } from '../types'

export const dragonbornNames: NameComponents = {
  patterns: [
    {
      parts: [
        { type: 'givenName', gender: 'male' },
        { type: 'clanName' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' },
        { type: 'clanName' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'male' },
        { type: 'clanName' },
        { type: 'epithet' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' },
        { type: 'clanName' },
        { type: 'epithet' }
      ],
      separator: ' '
    }
  ],
  parts: {
    givenName: [
      // Male names
      'Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Kriv', 'Medrash',
      'Mehen', 'Nadarr', 'Pandjed', 'Patrin', 'Rhogar', 'Shamash', 'Shedinn', 'Tarhun',
      'Torinn',
      // Female names
      'Akra', 'Biri', 'Daar', 'Farideh', 'Harann', 'Havilar', 'Jheri', 'Kava',
      'Korinn', 'Mishann', 'Nala', 'Perra', 'Raiann', 'Sora', 'Surina', 'Thava',
      'Uadjit'
    ],
    clanName: [
      'Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion', 'Fenkenkabradon',
      'Kepeshkmolik', 'Kerrhylon', 'Kimbatuul', 'Linxakasendalor', 'Myastan', 'Nemmonis',
      'Norixius', 'Ophinshtalajiir', 'Prexijandilin', 'Shestendeliath', 'Turnuroth',
      'Verthisathurgiesh', 'Yarjerit', 'Akambherylliax', 'Brimstone', 'Cinder', 'Draconis',
      'Fyre', 'Inferno', 'Magma', 'Pyre', 'Scorch', 'Smoke', 'Tinder', 'Volcanis'
    ],
    epithet: [
      'the Scaled', 'the Winged', 'the Fierce', 'the Mighty', 'the Proud',
      'the Noble', 'the Ancient', 'the Wise', 'the Strong', 'the Brave',
      'the Valiant', 'the Honorable', 'the Just', 'the Righteous', 'the Pure',
      'the Blessed', 'the Chosen', 'the Favored', 'the Exalted', 'the Glorious'
    ]
  },
  cultures: {
    chromatic: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'clanName' },
            { type: 'epithet' }
          ],
          separator: ' '
        }
      ],
      parts: {
        clanName: [
          'Akambherylliax', 'Brimstone', 'Cinder', 'Draconis', 'Fyre',
          'Inferno', 'Magma', 'Pyre', 'Scorch', 'Smoke', 'Tinder', 'Volcanis'
        ],
        epithet: [
          'the Black', 'the Red', 'the Blue', 'the Green', 'the White',
          'the Shadow', 'the Dark', 'the Night', 'the Void', 'the Abyss'
        ]
      }
    },
    metallic: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'clanName' },
            { type: 'epithet' }
          ],
          separator: ' '
        }
      ],
      parts: {
        clanName: [
          'Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion',
          'Fenkenkabradon', 'Kepeshkmolik', 'Kerrhylon', 'Kimbatuul',
          'Linxakasendalor', 'Myastan', 'Nemmonis', 'Norixius'
        ],
        epithet: [
          'the Gold', 'the Silver', 'the Bronze', 'the Copper', 'the Brass',
          'the Light', 'the Bright', 'the Shining', 'the Radiant', 'the Glorious'
        ]
      }
    }
  }
} 