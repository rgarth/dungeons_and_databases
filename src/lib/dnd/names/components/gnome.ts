import { NameComponents } from '../types'

export const gnomeNames: NameComponents = {
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
    },
    {
      parts: [
        { type: 'givenName', gender: 'male' },
        { type: 'nickname' },
        { type: 'familyName' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'givenName', gender: 'female' },
        { type: 'nickname' },
        { type: 'familyName' }
      ],
      separator: ' '
    }
  ],
  parts: {
    givenName: [
      // Male names
      'Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon',
      'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble', 'Glim', 'Jebeddo', 'Kellen',
      'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri', 'Warryn', 'Wrenn',
      'Zook',
      // Female names
      'Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Duvamil',
      'Ella', 'Ellyjobell', 'Ellywick', 'Lilli', 'Loopmottin', 'Lorilla',
      'Mardnab', 'Nissa', 'Nyx', 'Oda', 'Orla', 'Roywyn', 'Shamil', 'Tana',
      'Waywocket', 'Zanna'
    ],
    nickname: [
      'Aleslosh', 'Ashhearth', 'Badger', 'Cloak', 'Doublelock', 'Filchbatter',
      'Fnipper', 'Ku', 'Nim', 'Oneshoe', 'Pock', 'Sparklegem', 'Stumbleduck'
    ],
    familyName: [
      'Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig', 'Ningel',
      'Raulnor', 'Scheppen', 'Timbers', 'Turen'
    ]
  },
  cultures: {
    rock: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'nickname' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        nickname: [
          'Gemcutter', 'Sparklegem', 'Crystaleye', 'Stoneshaper', 'Mineshaft',
          'Deepdelver', 'Rockseeker', 'Cavefinder', 'Tunneldigger', 'Oreheart',
          'Crystalheart', 'Gemheart', 'Stoneheart', 'Rockheart', 'Mineheart',
          'Caveheart', 'Tunnelheart', 'Oreheart', 'Crystaleye', 'Gemeye',
          'Stoneeye', 'Rockeye', 'Mineeye', 'Caveeye', 'Tunneleye', 'Oreeye',
          'Crystalhand', 'Gemhand', 'Stonehand', 'Rockhand'
        ]
      }
    },
    forest: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'nickname' },
            { type: 'familyName' }
          ],
          separator: ' '
        }
      ],
      parts: {
        nickname: [
          'Leafwhisper', 'Treewalker', 'Forestheart', 'Woodsinger', 'Branchdancer',
          'Rootseeker', 'Mossfoot', 'Barkheart', 'Leafheart', 'Treeheart',
          'Forestheart', 'Woodheart', 'Branchheart', 'Rootheart', 'Mossheart',
          'Barkheart', 'Leafeye', 'Treeeye', 'Foresteye', 'Woodeye', 'Brancheye',
          'Rooteye', 'Mosseye', 'Barkeye', 'Leafhand', 'Treehand', 'Forestand',
          'Woodhand', 'Branchhand', 'Roothand'
        ]
      }
    }
  }
} 