import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LevelUpWizard } from '../LevelUpWizard';
import { createLevelUpService } from '@/services/character/level-up';

// Mock the level-up service
jest.mock('@/services/character/level-up', () => ({
  createLevelUpService: jest.fn(() => ({
    getLevelUpOptions: jest.fn(),
    processLevelUp: jest.fn(),
    canMulticlass: jest.fn(),
  })),
}));

const mockCharacter = {
  id: 'test-character',
  name: 'Test Character',
  race: 'Human',
  class: 'Fighter',
  level: 1,
  strength: 16,
  dexterity: 14,
  constitution: 15,
  intelligence: 10,
  wisdom: 12,
  charisma: 8,
  hitPoints: 12,
  maxHitPoints: 12,
  spellsKnown: [],
  spellsPrepared: [],
};

const mockLevelUpOptions = {
  availableChoices: [
    {
      type: 'fightingStyle',
      required: true,
      options: ['Archery', 'Defense', 'Dueling'],
      maxSelections: 1,
      description: 'Choose a fighting style',
    },
  ],
  newFeatures: ['Fighting Style', 'Second Wind'],
  hitPointOptions: {
    fixed: 7,
    roll: { min: 2, max: 12 },
  },
  spellOptions: {
    availableSpells: [],
    cantripsAvailable: [],
    spellsToLearn: 0,
    cantripsToLearn: 0,
  },
};

describe('LevelUpWizard', () => {
  let mockService: {
    getLevelUpOptions: jest.Mock;
    processLevelUp: jest.Mock;
    canMulticlass: jest.Mock;
  };

  beforeEach(() => {
    mockService = {
      getLevelUpOptions: jest.fn().mockResolvedValue(mockLevelUpOptions),
      processLevelUp: jest.fn().mockResolvedValue({
        newClassLevel: { class: 'Fighter', level: 2 },
        selectedFeatures: [],
        hitPointsGained: 7,
      }),
      canMulticlass: jest.fn().mockReturnValue(true),
    };
    (createLevelUpService as jest.Mock).mockReturnValue(mockService);
  });

  it('renders target selection step by default', () => {
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    expect(screen.getByText('Choose Your Level Up Target')).toBeInTheDocument();
    expect(screen.getByText('Target Level')).toBeInTheDocument();
    expect(screen.getByText('Target Class')).toBeInTheDocument();
  });

  it('allows selecting target level', () => {
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Should start at level 2 (current level + 1)
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Click the plus button to increase level
    const plusButton = screen.getByRole('button', { name: /increase level/i });
    fireEvent.click(plusButton);
    
    // Should now show level 3
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('allows selecting target class for multiclassing', () => {
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Should show available classes
    expect(screen.getByText('Fighter')).toBeInTheDocument();
    expect(screen.getByText('Wizard')).toBeInTheDocument();
    
    // Click on a different class
    const wizardButton = screen.getByText('Wizard').closest('button');
    fireEvent.click(wizardButton!);
    
    // Should show as selected
    expect(wizardButton).toHaveClass('border-[var(--color-accent)]');
  });

  it('proceeds to overview step when target is selected', async () => {
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Click next to proceed to overview
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Level 2 Features')).toBeInTheDocument();
    });
  });

  it('shows multiclass prerequisites', () => {
    mockService.canMulticlass.mockReturnValue(false);
    
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Classes that don't meet prerequisites should be disabled
    const wizardButton = screen.getByText('Wizard').closest('button');
    expect(wizardButton).toHaveClass('opacity-50');
    expect(wizardButton).toHaveClass('cursor-not-allowed');
  });

  it('validates target level range', () => {
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Should not allow going below current level + 1
    const minusButton = screen.getByRole('button', { name: /decrease level/i });
    expect(minusButton).toBeDisabled();
    
    // Should allow going up to level 20
    const plusButton = screen.getByRole('button', { name: /increase level/i });
    
    // Click plus button 18 times to reach level 20
    for (let i = 0; i < 18; i++) {
      fireEvent.click(plusButton);
    }
    
    // Should now be at level 20
    expect(screen.getByText('20')).toBeInTheDocument();
    
    // Plus button should be disabled at level 20
    expect(plusButton).toBeDisabled();
  });

  it('should handle multiple level jumps', async () => {
    const testCharacter = {
      ...mockCharacter,
      level: 1,
      class: 'Fighter'
    };

    const mockOptions = {
      availableChoices: [
        {
          type: 'fightingStyle',
          description: 'Choose a Fighting Style (Level 2)',
          required: true,
          options: ['Archery', 'Defense']
        },
        {
          type: 'abilityScoreIncrease',
          description: 'Ability Score Improvement (Level 4)',
          required: true
        }
      ],
      newFeatures: [
        'Action Surge (Level 2)',
        'Martial Archetype (Level 3)',
        'Ability Score Improvement (Level 4)'
      ],
      hitPointOptions: {
        fixed: 12, // 3 levels * 4 HP average
        roll: { min: 3, max: 12 }
      },
      spellOptions: undefined
    };

    mockService.getLevelUpOptions.mockResolvedValue(mockOptions);

    render(<LevelUpWizard character={testCharacter} onClose={jest.fn()} onLevelUp={jest.fn()} />);

    // Set target level to 4
    const plusButton = screen.getByRole('button', { name: /increase level/i });
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);

    // Proceed through steps
    fireEvent.click(screen.getByText('Next')); // Overview
    
    // Wait for options to load
    await waitFor(() => {
      expect(screen.getByText('Level 4 Features')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Next')); // Hit Points
    fireEvent.click(screen.getByText('Next')); // Choices

    // Should show choices for both levels
    expect(screen.getByText('Choose a Fighting Style (Level 2)')).toBeInTheDocument();
    expect(screen.getByText('Ability Score Improvement (Level 4)')).toBeInTheDocument();

    // Select fighting style
    fireEvent.click(screen.getByLabelText(/Archery/));
    
    // Select ability score increase (allocate 2 points)
    const strSelect = screen.getByDisplayValue('+0');
    fireEvent.change(strSelect, { target: { value: '1' } });
    const dexSelect = screen.getAllByDisplayValue('+0')[1];
    fireEvent.change(dexSelect, { target: { value: '1' } });
    
    fireEvent.click(screen.getByText('Next')); // Review

    // Complete level up
    fireEvent.click(screen.getByText('Level Up!'));

    expect(mockService.processLevelUp).toHaveBeenCalledWith(
      testCharacter,
      expect.objectContaining({
        'fightingStyle_level_2': 'Archery',
        'abilityScoreIncrease_level_4': expect.any(String)
      }),
      12,
      'Fighter',
      4
    );
  });
}); 