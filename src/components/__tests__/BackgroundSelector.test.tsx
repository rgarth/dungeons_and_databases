import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackgroundSelector } from '../shared/BackgroundSelector';

// Mock the backgrounds data
const mockBackgrounds = [
  {
    name: 'Acolyte',
    description: 'You have spent your life in the service of a temple.',
    skillProficiencies: ['Insight', 'Religion'],
    languages: ['Two of your choice'],
    equipment: ['A holy symbol', 'A prayer book or prayer wheel'],
    feature: 'Shelter of the Faithful',
    featureDescription: 'You and your adventuring companions can expect to receive free healing and care at a temple.',
    suggestedCharacteristics: {
      personalityTraits: [
        'I idolize a particular hero of my faith.',
        'I can find common ground between the fiercest enemies.',
        'I see omens in every event and action.',
        'Nothing can shake my optimistic attitude.'
      ],
      ideals: [
        'Tradition. The ancient traditions of worship must be preserved.',
        'Charity. I always try to help those in need.',
        'Change. We must help bring about the changes the gods are constantly working in the world.'
      ],
      bonds: [
        'I would die to recover an ancient relic of my faith.',
        'I will someday get revenge on the corrupt temple hierarchy.',
        'Everything I do is for the common people.'
      ],
      flaws: [
        'I judge others harshly, and myself even more severely.',
        'I put too much trust in those who wield power.',
        'My piety sometimes leads me to blindly trust those that profess faith.'
      ]
    }
  }
];

// Mock the useDndData hook
jest.mock('../providers/dnd-data-provider', () => ({
  useDndData: () => ({
    backgrounds: mockBackgrounds,
    races: [],
    classes: [],
    alignments: []
  })
}));

describe('BackgroundSelector', () => {
  const defaultProps = {
    selectedBackground: '',
    onBackgroundChange: jest.fn(),
    showCharacteristics: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders background selection dropdown', () => {
    render(<BackgroundSelector {...defaultProps} />);

    expect(screen.getByText('Select Background')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Select a background...')).toBeInTheDocument();
  });

  it('shows characteristics dropdowns when background is selected', () => {
    render(<BackgroundSelector {...defaultProps} selectedBackground="Acolyte" />);

    expect(screen.getByText('Character Traits')).toBeInTheDocument();
    expect(screen.getByText('Personality Traits')).toBeInTheDocument();
    expect(screen.getByText('Ideals')).toBeInTheDocument();
    expect(screen.getByText('Bonds')).toBeInTheDocument();
    expect(screen.getByText('Flaws')).toBeInTheDocument();
  });

  it('renders two personality trait dropdowns', () => {
    render(<BackgroundSelector {...defaultProps} selectedBackground="Acolyte" />);

    const traitDropdowns = screen.getAllByDisplayValue('Select a trait...');
    expect(traitDropdowns).toHaveLength(2);
  });

  it('disables selected personality traits in other dropdown', () => {
    const onCharacteristicsChange = jest.fn();
    
    render(
      <BackgroundSelector 
        {...defaultProps} 
        selectedBackground="Acolyte"
        onCharacteristicsChange={onCharacteristicsChange}
      />
    );

    const traitDropdowns = screen.getAllByDisplayValue('Select a trait...');
    
    // Select first trait
    fireEvent.change(traitDropdowns[0], { target: { value: 'I idolize a particular hero of my faith.' } });
    
    expect(onCharacteristicsChange).toHaveBeenCalledWith({
      personalityTraits: ['I idolize a particular hero of my faith.'],
      ideals: [],
      bonds: [],
      flaws: []
    });
  });

  it('handles single selection for ideals, bonds, and flaws', () => {
    const onCharacteristicsChange = jest.fn();
    
    render(
      <BackgroundSelector 
        {...defaultProps} 
        selectedBackground="Acolyte"
        onCharacteristicsChange={onCharacteristicsChange}
      />
    );

    // Select an ideal
    const idealDropdown = screen.getByDisplayValue('Select an ideal...');
    fireEvent.change(idealDropdown, { target: { value: 'Tradition. The ancient traditions of worship must be preserved.' } });
    
    expect(onCharacteristicsChange).toHaveBeenCalledWith({
      personalityTraits: [],
      ideals: ['Tradition. The ancient traditions of worship must be preserved.'],
      bonds: [],
      flaws: []
    });
  });
}); 