# Dungeons & Databases 🎲

A beautiful D&D character management application built with Next.js, featuring Google OAuth authentication and comprehensive character creation tools.

## Features

### Phase 1 (Current) ✅
- **Google OAuth Authentication** - Secure login with Google accounts
- **Character Creation** - Build D&D characters with:
  - Race, Class, and Alignment selection
  - Randomized ability score generation (4d6 drop lowest)
  - Automatic hit point and armor class calculation
  - Background and character details
- **Character Management** - View and organize multiple characters
- **Beautiful UI** - Modern, responsive design with dark theme

### Phase 2 (Planned) 🔄
- Party management system
- Encounter builder with monster database
- Turn-based combat management
- Character progression tracking

### Phase 3 (Future) 🚀
- AI Dungeon Master chatbot
- Campaign management
- Advanced encounter tools

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Prisma with SQLite (development) / PostgreSQL (production)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dungeons_and_databases
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"  
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

5. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
npm run dev
```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy the Client ID and Client Secret to your `.env` file

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   └── page.tsx        # Main dashboard
├── components/         # React components
│   ├── character-card.tsx
│   ├── create-character-modal.tsx
│   └── providers/      # Context providers
├── lib/                # Utilities
│   ├── auth.ts         # NextAuth configuration
│   ├── dnd.ts          # D&D game mechanics
│   └── prisma.ts       # Database client
└── prisma/             # Database schema
```

## D&D Mechanics

The application implements official D&D 5e rules including:

- **Ability Scores**: STR, DEX, CON, INT, WIS, CHA (3-18 range)
- **Ability Modifiers**: Calculated as `(score - 10) / 2` (rounded down)
- **Hit Points**: Class hit die + CON modifier per level
- **Armor Class**: Base 10 + DEX modifier
- **Proficiency Bonus**: Scales with character level

## Development Guidelines

- **Minimal Code**: Prioritize simplicity and readability
- **No Fallbacks**: Let failures surface rather than hide them
- **Component Reuse**: Rewrite existing components instead of creating new ones
- **Type Safety**: Full TypeScript coverage
- **Race Condition Prevention**: Careful state management

## Contributing

1. Follow the established code style
2. Ensure TypeScript compatibility
3. Test all character creation flows
4. Maintain the beautiful UI/UX standards

## License

MIT License - see LICENSE file for details
