import { NameComponents } from '../types'

export const halflingNames: NameComponents = {
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
      'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret',
      'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe',
      'Wellby',
      // Female names
      'Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia',
      'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym',
      'Vani', 'Verna'
    ],
    nickname: [
      'Appleblossom', 'Bigheart', 'Brightmoon', 'Brushgather', 'Cherrycheeks',
      'Copperkettle', 'Deephollow', 'Easyshoulder', 'Fastrabbit', 'Glenfellow',
      'Goldfound', 'Goodbarrel', 'Goodearth', 'Greenbottle', 'High-hill', 'Hilltopple',
      'Hogcollar', 'Honeypot', 'Jamjar', 'Kettlewhistle', 'Leagallow', 'Lilypond',
      'Littlefoot', 'Nimblefingers', 'Pintsize', 'Quickfoot', 'Reedfellow', 'Shadowquick',
      'Silvereyes', 'Smoothhands', 'Stonebridge', 'Stoutbridge', 'Stoutman', 'Strongbones',
      'Sunmeadow', 'Swiftwhistle', 'Tallfellow', 'Tealeaf', 'Tenpenny', 'Thistletop',
      'Thorngage', 'Tosscobble', 'Underbough', 'Underfoot', 'Warmwater', 'Whispermouse',
      'Wildcloak', 'Wildheart', 'Wiseacre'
    ],
    familyName: [
      'Appleblossom', 'Bigheart', 'Brightmoon', 'Brushgather', 'Cherrycheeks',
      'Copperkettle', 'Deephollow', 'Easyshoulder', 'Fastrabbit', 'Glenfellow',
      'Goldfound', 'Goodbarrel', 'Goodearth', 'Greenbottle', 'High-hill', 'Hilltopple',
      'Hogcollar', 'Honeypot', 'Jamjar', 'Kettlewhistle', 'Leagallow', 'Lilypond',
      'Littlefoot', 'Nimblefingers', 'Pintsize', 'Quickfoot', 'Reedfellow', 'Shadowquick',
      'Silvereyes', 'Smoothhands', 'Stonebridge', 'Stoutbridge', 'Stoutman', 'Strongbones',
      'Sunmeadow', 'Swiftwhistle', 'Tallfellow', 'Tealeaf', 'Tenpenny', 'Thistletop',
      'Thorngage', 'Tosscobble', 'Underbough', 'Underfoot', 'Warmwater', 'Whispermouse',
      'Wildcloak', 'Wildheart', 'Wiseacre'
    ]
  },
  cultures: {
    lightfoot: {
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
          'Appleblossom', 'Brightmoon', 'Cherrycheeks', 'Copperkettle', 'Easyshoulder',
          'Fastrabbit', 'Glenfellow', 'Goldfound', 'Goodbarrel', 'Greenbottle',
          'High-hill', 'Honeypot', 'Jamjar', 'Kettlewhistle', 'Lilypond', 'Littlefoot',
          'Nimblefingers', 'Pintsize', 'Quickfoot', 'Reedfellow', 'Shadowquick',
          'Silvereyes', 'Smoothhands', 'Sunmeadow', 'Swiftwhistle', 'Tallfellow',
          'Tealeaf', 'Tenpenny', 'Thistletop', 'Thorngage', 'Tosscobble', 'Underbough',
          'Underfoot', 'Warmwater', 'Whispermouse', 'Wildcloak', 'Wildheart', 'Wiseacre'
        ]
      }
    },
    stout: {
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
          'Bigheart', 'Brushgather', 'Deephollow', 'Fastrabbit', 'Glenfellow',
          'Goodearth', 'Hilltopple', 'Hogcollar', 'Leagallow', 'Littlefoot',
          'Quickfoot', 'Stonebridge', 'Stoutbridge', 'Stoutman', 'Strongbones',
          'Sunmeadow', 'Tallfellow', 'Underbough', 'Underfoot', 'Warmwater',
          'Wildheart', 'Wiseacre'
        ]
      }
    }
  }
} 