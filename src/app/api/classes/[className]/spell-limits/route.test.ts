import { NextRequest } from 'next/server';
import { GET } from './route';

// Mock the database query
jest.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: jest.fn()
  }
}));

import { prisma } from '@/lib/prisma';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('/api/classes/[className]/spell-limits', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return spell limits for a valid class and level', async () => {
    const mockSpellLimits = {
      cantripsKnown: 3,
      spellsKnown: 6,
      spellcastingType: 'prepared',
      maxSpellLevel: 1,
      spellLevelLimits: { "1": 6 }
    };

    mockPrisma.$queryRaw.mockResolvedValue([mockSpellLimits]);

    const request = new NextRequest('http://localhost:3000/api/classes/Wizard/spell-limits?level=1');
    const response = await GET(request, { params: { className: 'Wizard' } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockSpellLimits);
    expect(mockPrisma.$queryRaw).toHaveBeenCalledWith(
      expect.stringContaining('SELECT')
    );
  });

  it('should return 404 for non-existent class', async () => {
    mockPrisma.$queryRaw.mockResolvedValue([]);

    const request = new NextRequest('http://localhost:3000/api/classes/NonExistentClass/spell-limits?level=1');
    const response = await GET(request, { params: { className: 'NonExistentClass' } });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Spell limits not found for this class and level');
  });

  it('should use default level 1 when no level parameter is provided', async () => {
    const mockSpellLimits = {
      cantripsKnown: 3,
      spellsKnown: 6,
      spellcastingType: 'prepared',
      maxSpellLevel: 1,
      spellLevelLimits: { "1": 6 }
    };

    mockPrisma.$queryRaw.mockResolvedValue([mockSpellLimits]);

    const request = new NextRequest('http://localhost:3000/api/classes/Wizard/spell-limits');
    const response = await GET(request, { params: { className: 'Wizard' } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockSpellLimits);
  });

  it('should handle database errors gracefully', async () => {
    mockPrisma.$queryRaw.mockRejectedValue(new Error('Database connection failed'));

    const request = new NextRequest('http://localhost:3000/api/classes/Wizard/spell-limits?level=1');
    const response = await GET(request, { params: { className: 'Wizard' } });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to fetch spell limits');
  });

  it('should handle invalid level parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/classes/Wizard/spell-limits?level=invalid');
    await GET(request, { params: { className: 'Wizard' } });

    // Should default to level 1
    expect(mockPrisma.$queryRaw).toHaveBeenCalledWith(
      expect.stringContaining('csl."level" = 1')
    );
  });

  it('should handle URL-encoded class names', async () => {
    const mockSpellLimits = {
      cantripsKnown: 4,
      spellsKnown: 2,
      spellcastingType: 'known',
      maxSpellLevel: 1,
      spellLevelLimits: { "1": 2 }
    };

    mockPrisma.$queryRaw.mockResolvedValue([mockSpellLimits]);

    const request = new NextRequest('http://localhost:3000/api/classes/Sorcerer%20%28Wild%20Magic%29/spell-limits?level=1');
    const response = await GET(request, { params: { className: 'Sorcerer (Wild Magic)' } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockSpellLimits);
  });
}); 