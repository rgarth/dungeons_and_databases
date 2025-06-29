import { NextRequest } from 'next/server';
import { GET } from './route';

// Mock the database query
jest.mock('@/lib/prisma', () => ({
  prisma: {
    trait: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  }
}));

import { prisma } from '@/lib/prisma';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('/api/traits', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return all traits when no query parameters are provided', async () => {
      const mockTraits = [
        {
          id: '1',
          name: 'Darkvision',
          description: 'You can see in dim light within 60 feet of you as if it were bright light.',
          type: 'passive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Fey Ancestry',
          description: 'You have advantage on saving throws against being charmed.',
          type: 'passive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrisma.trait.findMany.mockResolvedValue(mockTraits);

      const request = new NextRequest('http://localhost:3000/api/traits');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTraits);
      expect(mockPrisma.trait.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
    });

    it('should filter traits by type when type parameter is provided', async () => {
      const mockTraits = [
        {
          id: '1',
          name: 'Breath Weapon',
          description: 'You can use your action to exhale destructive energy.',
          type: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrisma.trait.findMany.mockResolvedValue(mockTraits);

      const request = new NextRequest('http://localhost:3000/api/traits?type=active');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTraits);
      expect(mockPrisma.trait.findMany).toHaveBeenCalledWith({
        where: { type: 'active' },
        orderBy: { name: 'asc' },
      });
    });

    it('should filter traits by race when race parameter is provided', async () => {
      const mockTraits = [
        {
          id: '1',
          name: 'Darkvision',
          description: 'You can see in dim light within 60 feet of you.',
          type: 'passive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrisma.trait.findMany.mockResolvedValue(mockTraits);

      const request = new NextRequest('http://localhost:3000/api/traits?race=Elf');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTraits);
      expect(mockPrisma.trait.findMany).toHaveBeenCalledWith({
        where: {
          raceTraits: {
            some: {
              race: {
                name: 'Elf',
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      });
    });

    it('should handle database errors gracefully', async () => {
      mockPrisma.trait.findMany.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/traits');
      const response = await GET(request);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe('Failed to fetch traits');
    });

    it('should return empty array when no traits are found', async () => {
      mockPrisma.trait.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/traits');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });
  });
}); 