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

    expect(screen.getByText('How would you like to level up?')).toBeInTheDocument();
    expect(screen.getByText('Target Level')).toBeInTheDocument();
    expect(screen.getByText('Level Up Fighter')).toBeInTheDocument();
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

  it('allows selecting target class for multiclassing', async () => {
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Click the multiclass button to proceed to class selection
    const multiclassButton = screen.getByText('Multiclass into New Class');
    fireEvent.click(multiclassButton);

    // Should proceed to overview step where class selection happens
    await waitFor(() => {
      expect(screen.getByText('Multiclass Selection')).toBeInTheDocument();
    });
  });

  it('proceeds to overview step when target is selected', async () => {
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Click continue to proceed to overview
    const continueButton = screen.getByText('Continue to Level 2');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText('Level 2 Features')).toBeInTheDocument();
    });
  });

  it('shows multiclass prerequisites', async () => {
    mockService.canMulticlass.mockReturnValue(false);
    
    render(
      <LevelUpWizard
        character={mockCharacter}
        onClose={jest.fn()}
        onLevelUp={jest.fn()}
      />
    );

    // Click multiclass button to see class selection
    const multiclassButton = screen.getByText('Multiclass into New Class');
    fireEvent.click(multiclassButton);

    // Should show class selection dropdown after loading
    await waitFor(() => {
      expect(screen.getByText('Choose Multiclass Class')).toBeInTheDocument();
    });
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
      level: 1
    };

    const mockOptions = {
      availableChoices: [
        {
          type: 'fightingStyle',
          description: 'Choose a Fighting Style (Level 2)',
          required: true,
          options: ['Archery', 'Defense'],
          maxSelections: 1
        },
        {
          type: 'abilityScoreIncrease',
          description: 'Ability Score Improvement (Level 4)',
          required: true
        }
      ],
      newFeatures: ['Fighting Style', 'Ability Score Improvement'],
      hitPointOptions: {
        fixed: 4,
        roll: { min: 1, max: 10 }
      },
      spellOptions: undefined
    };

    mockService.getLevelUpOptions.mockResolvedValue(mockOptions);

    render(<LevelUpWizard character={testCharacter} onClose={jest.fn()} onLevelUp={jest.fn()} />);

    // Complete level up
    fireEvent.click(screen.getByText('Continue to Level 2'));

    // Wait for options to load
    await waitFor(() => {
      expect(screen.getByText('Level 2 Features')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Next')); // Hit Points
    fireEvent.click(screen.getByText('Next')); // Choices

    // Should show choices for both levels
    expect(screen.getByText('Choose a Fighting Style (Level 2)')).toBeInTheDocument();
    expect(screen.getByText('Ability Score Improvement (Level 4)')).toBeInTheDocument();

    // Select fighting style
    fireEvent.click(screen.getByLabelText(/Archery/));
    
    // Select ability score improvement type
    const improvementTypeSelect = screen.getByDisplayValue('Choose improvement type...');
    fireEvent.change(improvementTypeSelect, { target: { value: 'ability' } });

    // Select ability score increase (allocate 2 points)
    const strSelect = screen.getAllByDisplayValue('+0')[0];
    fireEvent.change(strSelect, { target: { value: '1' } });
    const dexSelect = screen.getAllByDisplayValue('+0')[1];
    fireEvent.change(dexSelect, { target: { value: '1' } });
    
    fireEvent.click(screen.getByText('Next')); // Review
    fireEvent.click(screen.getAllByText('Level Up!')[1]); // Use the button, not the header

    expect(mockService.processLevelUp).toHaveBeenCalledWith(
      testCharacter,
      expect.objectContaining({
        'fightingStyle_level_2': 'Archery',
        'abilityScoreIncrease': expect.any(String)
      }),
      4,
      'Fighter',
      2
    );
  });

  it('should handle roguish archetype choice correctly', async () => {
    const rogueCharacter = {
      ...mockCharacter,
      class: 'Rogue',
      level: 2
    };

    const mockRogueOptions = {
      availableChoices: [
        {
          type: 'classFeature',
          description: 'Choose your Roguish Archetype (Level 3)',
          required: true,
          options: ['Thief', 'Assassin', 'Arcane Trickster'],
          maxSelections: 1
        }
      ],
      newFeatures: ['Roguish Archetype'],
      hitPointOptions: {
        fixed: 5,
        roll: { min: 1, max: 8 }
      },
      spellOptions: undefined
    };

    mockService.getLevelUpOptions.mockResolvedValue(mockRogueOptions);

    render(<LevelUpWizard character={rogueCharacter} onClose={jest.fn()} onLevelUp={jest.fn()} />);

    // Proceed to choices step
    fireEvent.click(screen.getByText('Continue to Level 3'));
    await waitFor(() => {
      expect(screen.getByText('Level 3 Features')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Next')); // Hit Points
    fireEvent.click(screen.getByText('Next')); // Choices

    // Should show roguish archetype options
    expect(screen.getByText('Choose your Roguish Archetype (Level 3)')).toBeInTheDocument();
    expect(screen.getByText('Thief')).toBeInTheDocument();
    expect(screen.getByText('Assassin')).toBeInTheDocument();
    expect(screen.getByText('Arcane Trickster')).toBeInTheDocument();

    // Select an archetype
    fireEvent.click(screen.getByLabelText(/Thief/));
    
    // Should be able to proceed
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('should enforce mutual exclusion between ability score increase and feat choice', async () => {
    const testCharacter = {
      ...mockCharacter,
      level: 3
    };

    const mockOptions = {
      availableChoices: [
        {
          type: 'abilityScoreIncrease',
          description: 'Increase one ability score by 2, or two ability scores by 1 each, or take a feat. (Level 4)',
          required: true
        }
      ],
      newFeatures: ['Ability Score Improvement'],
      hitPointOptions: {
        fixed: 4,
        roll: { min: 1, max: 10 }
      },
      spellOptions: undefined
    };

    mockService.getLevelUpOptions.mockResolvedValue(mockOptions);

    render(<LevelUpWizard character={testCharacter} onClose={jest.fn()} onLevelUp={jest.fn()} />);

    // Proceed to choices step
    fireEvent.click(screen.getByText('Continue to Level 4'));
    await waitFor(() => {
      expect(screen.getByText('Level 4 Features')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Next')); // Hit Points
    fireEvent.click(screen.getByText('Next')); // Choices

    // Initially, neither should be selected, so Next should be disabled
    expect(screen.getByText('Next')).toBeDisabled();

    // Select ability score improvement type
    const improvementTypeSelect = screen.getByDisplayValue('Choose improvement type...');
    fireEvent.change(improvementTypeSelect, { target: { value: 'ability' } });

    // Should show ability score interface
    expect(screen.getByText('Ability Score Increase')).toBeInTheDocument();

    // Select ability score increase
    const strSelect = screen.getAllByDisplayValue('+0')[0];
    fireEvent.change(strSelect, { target: { value: '1' } });
    const dexSelect = screen.getAllByDisplayValue('+0')[1];
    fireEvent.change(dexSelect, { target: { value: '1' } });

    // Should be able to proceed
    expect(screen.getByText('Next')).not.toBeDisabled();

    // Switch to feat selection
    fireEvent.change(improvementTypeSelect, { target: { value: 'feat' } });

    // Should show feat interface (use getAllByText since there are multiple elements)
    expect(screen.getAllByText('Take a Feat')[1]).toBeInTheDocument();

    // Select a feat
    const featSelect = screen.getByDisplayValue('Choose a feat...');
    fireEvent.change(featSelect, { target: { value: 'Alert' } });

    // Should be able to proceed
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('should allow clearing feat selection to switch back to ability scores', async () => {
    const testCharacter = {
      ...mockCharacter,
      level: 3
    };

    const mockOptions = {
      availableChoices: [
        {
          type: 'abilityScoreIncrease',
          description: 'Increase one ability score by 2, or two ability scores by 1 each, or take a feat. (Level 4)',
          required: true
        }
      ],
      newFeatures: ['Ability Score Improvement'],
      hitPointOptions: {
        fixed: 4,
        roll: { min: 1, max: 10 }
      },
      spellOptions: undefined
    };

    mockService.getLevelUpOptions.mockResolvedValue(mockOptions);

    render(<LevelUpWizard character={testCharacter} onClose={jest.fn()} onLevelUp={jest.fn()} />);

    // Proceed to choices step
    fireEvent.click(screen.getByText('Continue to Level 4'));
    await waitFor(() => {
      expect(screen.getByText('Level 4 Features')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Next')); // Hit Points
    fireEvent.click(screen.getByText('Next')); // Choices

    // Select feat improvement type
    const improvementTypeSelect = screen.getByDisplayValue('Choose improvement type...');
    fireEvent.change(improvementTypeSelect, { target: { value: 'feat' } });

    // Initially select a feat
    const featSelect = screen.getByDisplayValue('Choose a feat...');
    fireEvent.change(featSelect, { target: { value: 'Alert' } });

    // Should be able to proceed
    expect(screen.getByText('Next')).not.toBeDisabled();

    // Clear the feat selection
    const clearButton = screen.getByText('Clear feat selection');
    fireEvent.click(clearButton);

    // Feat should be cleared and interface should be hidden
    expect(screen.queryByDisplayValue('Choose a feat...')).not.toBeInTheDocument();

    // Switch back to ability scores
    fireEvent.change(improvementTypeSelect, { target: { value: 'ability' } });

    // Should show ability score interface
    expect(screen.getByText('Ability Score Increase')).toBeInTheDocument();

    // Should not be able to proceed until ability scores are allocated
    expect(screen.getByText('Next')).toBeDisabled();

    // Allocate ability scores
    const strSelect = screen.getAllByDisplayValue('+0')[0];
    fireEvent.change(strSelect, { target: { value: '1' } });
    const dexSelect = screen.getAllByDisplayValue('+0')[1];
    fireEvent.change(dexSelect, { target: { value: '1' } });

    // Should be able to proceed
    expect(screen.getByText('Next')).not.toBeDisabled();
  });
}); 