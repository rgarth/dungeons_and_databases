import { NameComponents } from '../types'

export const humanNames: NameComponents = {
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
      'Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir',
      'Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn',
      'Randal', 'Stedd', 'Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef',
      'Mival', 'Orel', 'Pavel', 'Sergor',
      // Female names
      'Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida',
      'Arveene', 'Esvele', 'Jhessail', 'Kerri', 'Lureene', 'Miri', 'Rowan', 'Shandri',
      'Tessele', 'Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma', 'Tana',
      'Zora'
    ],
    familyName: [
      'Basha', 'Dumein', 'Jassan', 'Khalid', 'Mostana', 'Pashar', 'Rein', 'Amblecrown',
      'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag', 'Bersk', 'Chernin',
      'Dotsk', 'Kulenov', 'Marsk', 'Nemetsk', 'Shemov', 'Starag', 'Brightwood',
      'Helder', 'Hornraven', 'Lackman', 'Stormwind', 'Windrivver'
    ]
  },
  cultures: {
    calishite: {
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
          'Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir',
          'Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida'
        ],
        familyName: [
          'Basha', 'Dumein', 'Jassan', 'Khalid', 'Mostana', 'Pashar', 'Rein'
        ]
      }
    },
    chondathan: {
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
          'Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn',
          'Randal', 'Stedd', 'Arveene', 'Esvele', 'Jhessail', 'Kerri', 'Lureene',
          'Miri', 'Rowan', 'Shandri', 'Tessele'
        ],
        familyName: [
          'Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag',
          'Brightwood', 'Helder', 'Hornraven', 'Lackman', 'Stormwind', 'Windrivver'
        ]
      }
    },
    damaran: {
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
          'Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef', 'Mival', 'Orel',
          'Pavel', 'Sergor', 'Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma',
          'Tana', 'Zora'
        ],
        familyName: [
          'Bersk', 'Chernin', 'Dotsk', 'Kulenov', 'Marsk', 'Nemetsk', 'Shemov', 'Starag'
        ]
      }
    },
    shou: {
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
          'An', 'Chen', 'Chi', 'Fai', 'Jiang', 'Jun', 'Lian', 'Long', 'Meng', 'On',
          'Shan', 'Shui', 'Wen', 'Xiang', 'Xiao', 'Xue', 'Ying', 'Yong', 'Yun', 'Zhen'
        ],
        familyName: [
          'Chien', 'Huang', 'Kao', 'Kung', 'Lao', 'Ling', 'Mei', 'Pin', 'Shin', 'Sum',
          'Tan', 'Tao', 'Wan', 'Weng', 'Xiang', 'Zhang', 'Zhou'
        ]
      }
    },
    turami: {
      patterns: [
        {
          parts: [
            { type: 'givenName', gender: 'male' },
            { type: 'familyName' },
            { type: 'epithet' }
          ],
          separator: ' '
        }
      ],
      parts: {
        givenName: [
          'Arizima', 'Chathi', 'Nephis', 'Nulara', 'Murithi', 'Sefris', 'Thola',
          'Umara', 'Zolis', 'Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm',
          'Malark', 'Morn', 'Randal', 'Stedd'
        ],
        familyName: [
          'Ankhalab', 'Anskuld', 'Fezim', 'Hahpet', 'Nathandem', 'Sepret', 'Uuthrakt'
        ],
        epithet: [
          'the Sea Walker', 'the Wave Rider', 'the Ocean Child', 'the Tide Caller',
          'the Storm Bringer', 'the Wind Dancer', 'the Wave Dancer', 'the Sea Child'
        ]
      }
    }
  }
} 