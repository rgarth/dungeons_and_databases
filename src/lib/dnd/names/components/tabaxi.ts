import { NameComponents } from '../types'

export const tabaxiNames: NameComponents = {
  patterns: [
    {
      parts: [
        { type: 'personalName' },
        { type: 'clanName' }
      ],
      separator: ' '
    },
    {
      parts: [
        { type: 'personalName' },
        { type: 'clanName' },
        { type: 'epithet' }
      ],
      separator: ' '
    }
  ],
  parts: {
    personalName: [
      // Sound-based names
      'Chirr', 'Purr', 'Hiss', 'Mrow', 'Yowl', 'Meow', 'Snarl', 'Growl', 'Roar',
      'Whisk', 'Pounce', 'Leap', 'Dash', 'Sprint', 'Stalk', 'Prowl', 'Creep',
      'Slink', 'Glide', 'Sneak', 'Prowl', 'Stalk', 'Hunt', 'Chase', 'Pursue',
      // Action-based names
      'Swift', 'Quick', 'Fleet', 'Rapid', 'Agile', 'Nimble', 'Grace', 'Elegant',
      'Silent', 'Stealth', 'Shadow', 'Night', 'Dusk', 'Dawn', 'Twilight', 'Moon',
      // Nature-based names
      'Leaf', 'Branch', 'Tree', 'Forest', 'Jungle', 'River', 'Stream', 'Mountain',
      'Valley', 'Cave', 'Cliff', 'Rock', 'Stone', 'Crystal', 'Gem', 'Pearl'
    ],
    clanName: [
      // Territory-based
      'of the High Trees', 'of the Deep Forest', 'of the Misty Mountains',
      'of the Hidden Valley', 'of the Sacred Grove', 'of the Ancient Woods',
      'of the Whispering Pines', 'of the Emerald Canopy', 'of the Golden Plains',
      'of the Silver Stream', 'of the Crystal Cave', 'of the Obsidian Peak',
      // Feature-based
      'of the Sharp Claws', 'of the Bright Eyes', 'of the Long Whiskers',
      'of the Silent Paws', 'of the Swift Tail', 'of the Golden Mane',
      'of the Silver Fur', 'of the Dark Stripes', 'of the Spotted Coat',
      'of the Striped Hide', 'of the Spotted Pelt', 'of the Marbled Fur'
    ],
    epithet: [
      // Achievement-based
      'the Hunter', 'the Stalker', 'the Prowler', 'the Shadow', 'the Ghost',
      'the Phantom', 'the Whisper', 'the Silent', 'the Swift', 'the Quick',
      'the Agile', 'the Nimble', 'the Graceful', 'the Elegant', 'the Fierce',
      // Characteristic-based
      'the Curious', 'the Wise', 'the Clever', 'the Cunning', 'the Crafty',
      'the Patient', 'the Calm', 'the Serene', 'the Peaceful', 'the Gentle',
      'the Kind', 'the Merciful', 'the Just', 'the Fair', 'the Noble'
    ]
  },
  cultures: {
    jungle: {
      patterns: [
        {
          parts: [
            { type: 'personalName' },
            { type: 'clanName' },
            { type: 'epithet' }
          ],
          separator: ' '
        }
      ],
      parts: {
        clanName: [
          'of the Emerald Canopy', 'of the Hidden Temple', 'of the Lost City',
          'of the Ancient Ruins', 'of the Sacred Pool', 'of the Golden Idol',
          'of the Crystal Cave', 'of the Obsidian Peak', 'of the Jade Valley'
        ],
        epithet: [
          'the Explorer', 'the Discoverer', 'the Seeker', 'the Wanderer',
          'the Traveler', 'the Voyager', 'the Adventurer', 'the Pioneer',
          'the Trailblazer', 'the Pathfinder'
        ]
      }
    },
    mountain: {
      patterns: [
        {
          parts: [
            { type: 'personalName' },
            { type: 'clanName' },
            { type: 'epithet' }
          ],
          separator: ' '
        }
      ],
      parts: {
        clanName: [
          'of the High Peaks', 'of the Misty Mountains', 'of the Cloud Tops',
          'of the Windy Heights', 'of the Snowy Summit', 'of the Rocky Crags',
          'of the Crystal Caverns', 'of the Echoing Valleys', 'of the Hidden Pass'
        ],
        epithet: [
          'the Climber', 'the Mountaineer', 'the Peak Walker', 'the Summit Seeker',
          'the Cloud Dancer', 'the Wind Runner', 'the Storm Chaser', 'the Thunder Caller',
          'the Lightning Striker', 'the Frost Walker'
        ]
      }
    }
  }
} 