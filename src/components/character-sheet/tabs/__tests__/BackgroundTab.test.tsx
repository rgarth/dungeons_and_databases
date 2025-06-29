import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BackgroundTab } from '../BackgroundTab';

// Mock the RacialFeaturesService
jest.mock('@/services/character/racial-features', () => ({
  RacialFeaturesService: {
    getRacialTraits: jest.fn(),
  },
}));

import { RacialFeaturesService } from '@/services/character/racial-features';

const mockRacialFeaturesService = RacialFeaturesService as jest.Mocked<typeof RacialFeaturesService>;

describe('BackgroundTab', () => {
  const mockCharacter = {
    id: '1',
    name: 'Test Character',
    race: 'Elf',
    subrace: null,
    class: 'Fighter',
    level: 1,
    background: 'Folk Hero',
    alignment: 'True Neutral',
    abilityScores: {
      strength: 15,
      dexterity: 14,
      constitution: 14,
      intelligence: 12,
      wisdom: 10,
      charisma: 8,
    },
    traits: [],
    languages: ['Common', 'Elvish'],
    proficiencies: [],
    inventory: [],
    hitPoints: { maximum: 12, current: 12, temporary: 0 },
    armorClass: 16,
    initiative: 2,
    speed: 30,
    experience: 0,
    personalityTraits: [],
    ideals: [],
    bonds: [],
    flaws: [],
    appearance: '',
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user1',
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display character background information', () => {
    render(<BackgroundTab character={mockCharacter} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('Folk Hero')).toBeInTheDocument();
    expect(screen.getByText('True Neutral')).toBeInTheDocument();
  });

  it('should display racial traits when available', async () => {
    const mockTraits = [
      {
        name: 'Darkvision',
        description: 'You can see in dim light within 60 feet of you.',
        type: 'passive' as const,
      },
      {
        name: 'Fey Ancestry',
        description: 'You have advantage on saving throws against being charmed.',
        type: 'passive' as const,
      },
    ];

    mockRacialFeaturesService.getRacialTraits.mockResolvedValue(mockTraits);

    render(<BackgroundTab character={mockCharacter} onUpdate={mockOnUpdate} />);

    await waitFor(() => {
      expect(screen.getByText('Racial Traits')).toBeInTheDocument();
      expect(screen.getByText('Darkvision')).toBeInTheDocument();
      expect(screen.getByText('Fey Ancestry')).toBeInTheDocument();
    });
  });

  it('should handle empty racial traits gracefully', async () => {
    mockRacialFeaturesService.getRacialTraits.mockResolvedValue([]);

    render(<BackgroundTab character={mockCharacter} onUpdate={mockOnUpdate} />);

    await waitFor(() => {
      expect(screen.getByText('Racial Traits')).toBeInTheDocument();
      expect(screen.getByText('No racial traits found.')).toBeInTheDocument();
    });
  });

  it('should handle errors when fetching racial traits', async () => {
    mockRacialFeaturesService.getRacialTraits.mockRejectedValue(new Error('Failed to fetch'));

    render(<BackgroundTab character={mockCharacter} onUpdate={mockOnUpdate} />);

    await waitFor(() => {
      expect(screen.getByText('Racial Traits')).toBeInTheDocument();
      expect(screen.getByText('Error loading racial traits.')).toBeInTheDocument();
    });
  });

  it('should display languages', () => {
    render(<BackgroundTab character={mockCharacter} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Common')).toBeInTheDocument();
    expect(screen.getByText('Elvish')).toBeInTheDocument();
  });

  it('should display personality traits when available', () => {
    const characterWithTraits = {
      ...mockCharacter,
      personalityTraits: ['I stand up for what I believe in.', 'I work hard so I can play hard.'],
    };

    render(<BackgroundTab character={characterWithTraits} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Personality Traits')).toBeInTheDocument();
    expect(screen.getByText('I stand up for what I believe in.')).toBeInTheDocument();
    expect(screen.getByText('I work hard so I can play hard.')).toBeInTheDocument();
  });

  it('should display ideals when available', () => {
    const characterWithIdeals = {
      ...mockCharacter,
      ideals: ['Community. It is the duty of all civilized people to strengthen the bonds of community.'],
    };

    render(<BackgroundTab character={characterWithIdeals} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Ideals')).toBeInTheDocument();
    expect(screen.getByText(/Community/)).toBeInTheDocument();
  });

  it('should display bonds when available', () => {
    const characterWithBonds = {
      ...mockCharacter,
      bonds: ['I protect those who cannot protect themselves.'],
    };

    render(<BackgroundTab character={characterWithBonds} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Bonds')).toBeInTheDocument();
    expect(screen.getByText('I protect those who cannot protect themselves.')).toBeInTheDocument();
  });

  it('should display flaws when available', () => {
    const characterWithFlaws = {
      ...mockCharacter,
      flaws: ['I have a weakness for the vices of the city.'],
    };

    render(<BackgroundTab character={characterWithFlaws} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Flaws')).toBeInTheDocument();
    expect(screen.getByText('I have a weakness for the vices of the city.')).toBeInTheDocument();
  });
}); 