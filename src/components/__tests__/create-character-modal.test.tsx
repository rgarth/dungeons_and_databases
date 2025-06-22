import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateCharacterModal } from '../create-character-modal';
import { CharacterCreationService } from '@/services/character/creation';
import { useDndData } from '@/components/providers/dnd-data-provider';

// Mock the providers and services
jest.mock('@/components/providers/dnd-data-provider');
jest.mock('@/services/character/creation');
jest.mock('@/lib/dnd/subclasses', () => ({
  getSubclassesForClass: jest.fn(),
  choosesSubclassAtCreation: jest.fn()
}));

const mockUseDndData = useDndData as jest.MockedFunction<typeof useDndData>;
const mockCharacterCreationService = CharacterCreationService.getInstance as jest.MockedFunction<typeof CharacterCreationService.getInstance>;

describe('CreateCharacterModal', () => {
  const mockOnClose = jest.fn();
  const mockOnCharacterCreated = jest.fn();

  const mockDndData = {
    races: [
      { id: '1', name: 'Human' },
      { id: '2', name: 'Elf' }
    ],
    classes: [
      { id: '1', name: 'Barbarian' },
      { id: '2', name: 'Sorcerer' },
      { id: '3', name: 'Warlock' }
    ],
    backgrounds: [
      { 
        name: 'Folk Hero',
        description: 'A humble beginning',
        skillProficiencies: ['Animal Handling', 'Survival'],
        languages: ['Common'],
        equipment: ['Shovel', 'Iron pot'],
        feature: 'Rustic Hospitality',
        featureDescription: 'You can find a place to hide, rest, or recuperate among other commoners.'
      },
      { 
        name: 'Sage',
        description: 'A scholar of ancient lore',
        skillProficiencies: ['Arcana', 'History'],
        languages: ['Common', 'Elvish'],
        equipment: ['Bottle of black ink', 'Quill'],
        feature: 'Researcher',
        featureDescription: 'When you attempt to learn or recall a piece of lore, you can consult your research.'
      }
    ],
    alignments: [
      { id: '1', name: 'Lawful Good' },
      { id: '2', name: 'True Neutral' }
    ]
  };

  const mockCreationService = {
    getCreationOptions: jest.fn(),
    generateAbilityScores: jest.fn(),
    validatePointBuy: jest.fn(),
    calculateSpellcastingStats: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseDndData.mockReturnValue(mockDndData);
    mockCharacterCreationService.mockReturnValue(mockCreationService as unknown as CharacterCreationService);
    
    // Default mock implementations
    mockCreationService.getCreationOptions.mockResolvedValue({
      equipmentPacks: [],
      weaponSuggestions: [],
      armorSuggestions: [],
      subclasses: [],
      needsSubclassAtCreation: false,
      spellcasting: {
        ability: null,
        canCastAtLevel1: false,
        availableSpells: [],
        spellSlots: {}
      }
    });
    
    mockCreationService.generateAbilityScores.mockReturnValue({
      scores: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      randomArray: [10, 10, 10, 10, 10, 10]
    });
    
    mockCreationService.validatePointBuy.mockReturnValue({
      isValid: true,
      remaining: 0
    });
    
    mockCreationService.calculateSpellcastingStats.mockReturnValue({
      spellSaveDC: 13,
      spellAttackBonus: 3
    });
  });

  const renderModal = () => {
    return render(
      <CreateCharacterModal 
        onClose={mockOnClose} 
        onCharacterCreated={mockOnCharacterCreated} 
      />
    );
  };

  describe('Basic Functionality', () => {
    it('should render all required form fields', () => {
      renderModal();

      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Race')).toBeInTheDocument();
      expect(screen.getByLabelText('Class')).toBeInTheDocument();
      expect(screen.getByLabelText('Alignment')).toBeInTheDocument();
    });

    it('should close modal when cancel button is clicked', () => {
      renderModal();
      
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);
      
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should allow form field interactions', () => {
      renderModal();
      
      // Test name input
      const nameInput = screen.getByLabelText('Name');
      fireEvent.change(nameInput, { target: { value: 'Test Character' } });
      expect(nameInput).toHaveValue('Test Character');
      
      // Test class selection
      const classSelect = screen.getByLabelText('Class');
      fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });
      expect(classSelect).toHaveValue('Sorcerer');
      
      // Test race selection
      const raceSelect = screen.getByLabelText('Race');
      fireEvent.change(raceSelect, { target: { value: 'Human' } });
      expect(raceSelect).toHaveValue('Human');
    });
  });

  describe('Subclass Selector', () => {
    it('should show subclass selector when needsSubclassAtCreation is true', async () => {
      // Mock the service to return data that indicates subclass is needed
      const mockGetCreationOptions = jest.fn().mockResolvedValue({
        equipmentPacks: [],
        weaponSuggestions: [],
        armorSuggestions: [],
        subclasses: [
          { name: 'Draconic Bloodline', description: 'Magic flows from draconic ancestry' }
        ],
        needsSubclassAtCreation: true,
        spellcasting: {
          ability: 'Charisma',
          canCastAtLevel1: true,
          availableSpells: [
            { name: 'Fire Bolt', level: 0, school: 'Evocation' },
            { name: 'Mage Hand', level: 0, school: 'Conjuration' }
          ],
          spellSlots: { 1: 2 }
        }
      });

      mockCreationService.getCreationOptions = mockGetCreationOptions;

      renderModal();

      // Debug: Check initial state
      console.log('🔍 INITIAL STATE - Class select value:', (screen.getByLabelText('Class') as HTMLSelectElement).value);

      // Select a class that needs subclass
      const classSelect = screen.getByLabelText('Class');
      fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });

      // Debug: Check state after change
      console.log('🔍 AFTER CHANGE - Class select value:', (classSelect as HTMLSelectElement).value);

      // Wait for the service to be called
      await waitFor(() => {
        expect(mockGetCreationOptions).toHaveBeenCalledWith('Sorcerer');
      });

      // Debug: Check what's rendered after service call
      console.log('🔍 AFTER SERVICE CALL - DOM contains subclass label:', screen.queryByLabelText(/Subclass/) !== null);

      // Wait for the subclass selector to appear
      await waitFor(() => {
        expect(screen.getByLabelText(/Subclass/)).toBeInTheDocument();
      });
    });

    it('should not show subclass selector when needsSubclassAtCreation is false', async () => {
      // Mock the service to return data that indicates subclass is not needed
      mockCreationService.getCreationOptions.mockResolvedValue({
        equipmentPacks: [],
        weaponSuggestions: [],
        armorSuggestions: [],
        subclasses: [
          { name: 'Berserker', description: 'Frenzied warrior' }
        ],
        needsSubclassAtCreation: false,
        spellcasting: {
          ability: null,
          canCastAtLevel1: false,
          availableSpells: [],
          spellSlots: {}
        }
      });

      renderModal();

      // Select a class that doesn't need subclass
      const classSelect = screen.getByLabelText('Class');
      fireEvent.change(classSelect, { target: { value: 'Barbarian' } });

      // Wait for the service to be called
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Barbarian');
      });

      // Verify subclass selector is not present
      await waitFor(() => {
        expect(screen.queryByLabelText(/Subclass/)).not.toBeInTheDocument();
      });
    });
  });
}); 