import { render, screen, waitFor } from '@testing-library/react';
import { BackgroundTab } from '../character-sheet/tabs/BackgroundTab';

// Mock the dependencies
jest.mock('@/services/character/character-story', () => ({
  createCharacterStoryService: () => ({
    getBackstoryPrompts: () => [],
    getGuidedAnswerCountInfo: () => ({ count: 0, limit: 100, displayClass: 'text-green-400' }),
    compileGuidedAnswers: () => '',
    validateGuidedAnswer: () => true,
    isWithinLimit: () => true,
    getCharacterCountInfo: () => ({ count: 0, limit: 100, displayClass: 'text-green-400' })
  })
}));

jest.mock('@/lib/dnd/languages', () => ({
  getRacialLanguages: () => ['Common'],
  getLanguages: () => Promise.resolve([
    { name: 'Elvish', category: 'Standard', description: 'Elvish language' },
    { name: 'Dwarvish', category: 'Standard', description: 'Dwarvish language' },
    { name: 'Draconic', category: 'Exotic', description: 'Draconic language' }
  ]),
  getLanguageStyling: () => ({
    bg: 'bg-blue-900/30',
    text: 'text-blue-300',
    border: 'border-blue-600/30',
    hover: 'hover:text-blue-200'
  })
}));

// Mock fetch for background data
global.fetch = jest.fn();

const mockCharacter = {
  id: '1',
  name: 'Test Character',
  race: 'Human',
  class: 'Fighter',
  level: 1,
  background: 'Sage',
  alignment: 'Neutral',
  languages: []
};

const mockOnUpdate = jest.fn();

describe('BackgroundTab Language Requirements', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock background data response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([
        {
          name: 'Sage',
          description: 'You spent years learning the lore of the multiverse.',
          skillProficiencies: ['Arcana', 'History'],
          languages: ['Two of your choice'],
          equipment: ['Bottle of Black Ink', 'Quill', 'Small Knife', 'Letter', 'Common Clothes', 'Belt Pouch'],
          startingGold: 10,
          feature: 'Researcher',
          featureDescription: 'When you attempt to learn or recall a piece of lore...'
        }
      ])
    });
  });

  it('should show language requirement tooltip for Sage background with no languages selected', async () => {
    render(<BackgroundTab character={mockCharacter} onUpdate={mockOnUpdate} />);
    
    // Wait for the background data to load and component to re-render
    await waitFor(() => {
      expect(screen.getByText('Background Language Requirement')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText(/Your Sage background allows you to choose 2 additional languages/)).toBeInTheDocument();
    expect(screen.getByText(/You need to select 2 more languages below/)).toBeInTheDocument();
  });

  it('should show language requirement tooltip for Sage background with 1 language selected', async () => {
    const characterWithOneLanguage = {
      ...mockCharacter,
      languages: ['Elvish']
    };

    render(<BackgroundTab character={characterWithOneLanguage} onUpdate={mockOnUpdate} />);
    
    await waitFor(() => {
      expect(screen.getByText('Background Language Requirement')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText(/You have selected 1 of 2/)).toBeInTheDocument();
    expect(screen.getByText(/You need to select 1 more language below/)).toBeInTheDocument();
  });

  it('should show success message when all language requirements are met', async () => {
    const characterWithAllLanguages = {
      ...mockCharacter,
      languages: ['Elvish', 'Dwarvish']
    };

    render(<BackgroundTab character={characterWithAllLanguages} onUpdate={mockOnUpdate} />);
    
    await waitFor(() => {
      expect(screen.getByText('Background Language Requirement Met')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText(/Your Sage background language requirement has been satisfied/)).toBeInTheDocument();
  });

  it('should show language indicator in background summary', async () => {
    render(<BackgroundTab character={mockCharacter} onUpdate={mockOnUpdate} />);
    
    await waitFor(() => {
      expect(screen.getByText('2 languages needed')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should show "Languages complete" when requirements are met', async () => {
    const characterWithAllLanguages = {
      ...mockCharacter,
      languages: ['Elvish', 'Dwarvish']
    };

    render(<BackgroundTab character={characterWithAllLanguages} onUpdate={mockOnUpdate} />);
    
    await waitFor(() => {
      expect(screen.getByText('Languages complete')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
}); 