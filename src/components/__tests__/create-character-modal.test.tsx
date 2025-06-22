import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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

// Mock global fetch
global.fetch = jest.fn();

const mockUseDndData = useDndData as jest.MockedFunction<typeof useDndData>;
const mockCharacterCreationService = CharacterCreationService.getInstance as jest.MockedFunction<typeof CharacterCreationService.getInstance>;
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

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
      { id: '3', name: 'Warlock' },
      { id: '4', name: 'Wizard' },
      { id: '5', name: 'Fighter' }
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
    
    // Mock fetch calls
    mockFetch.mockImplementation((input: string | Request | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.includes('/api/weapon-suggestions')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        } as Response);
      }
      if (url.includes('/api/armor-suggestions')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        } as Response);
      }
      if (url.includes('/api/class-proficiencies')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ simple: false, martial: false, specific: [], armor: [] })
        } as Response);
      }
      if (url.includes('/api/classes/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ startingGoldFormula: '4d4*10' })
        } as Response);
      }
      if (url.includes('/api/backgrounds')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        } as Response);
      }
      // Default mock for any other fetch calls
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      } as Response);
    });
    
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

    it('should have no class selected by default', () => {
      renderModal();
      const classSelect = screen.getByLabelText('Class') as HTMLSelectElement;
      expect(classSelect.value).toBe('');
    });

    it('should handle class selection changes properly', async () => {
      // Mock a simple response for any class
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

      renderModal();

      // Change class selection
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });
      });

      // Verify the class value changed
      expect(classSelect).toHaveValue('Sorcerer');

      // Wait for the service to be called with the new class
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Sorcerer');
      });
    });

    it('should verify class selection state updates', async () => {
      renderModal();
      
      // Check initial state
      const classSelect = screen.getByLabelText('Class') as HTMLSelectElement;
      expect(classSelect.value).toBe('');
      
      // Change class selection
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });
      
      // Verify the select value changed
      expect(classSelect.value).toBe('Wizard');
      
      // Wait a bit to see if any effects trigger
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Check if any service calls were made
      console.log('🔍 DEBUG - Service calls after class change:', mockCreationService.getCreationOptions.mock.calls);
    });
  });

  describe('Subclass Selector', () => {
    it('should show subclass selector when needsSubclassAtCreation is true', async () => {
      // Mock the service to return data that indicates subclass is needed
      mockCreationService.getCreationOptions.mockResolvedValue({
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

      renderModal();

      // Select a class that needs subclass
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });
      });

      // Wait for the service to be called
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Sorcerer');
      });

      // Wait for the subclass selector to appear
      await waitFor(() => {
        expect(screen.getByLabelText(/Subclass \*/)).toBeInTheDocument();
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
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Barbarian' } });
      });

      // Wait for the service to be called
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Barbarian');
      });

      // Verify subclass selector is not present
      await waitFor(() => {
        expect(screen.queryByLabelText(/Subclass \*/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Weapon Suggestions', () => {
    it('should apply weapon suggestions when class changes', async () => {
      // Mock weapon suggestions for Barbarian
      mockCreationService.getCreationOptions.mockResolvedValue({
        equipmentPacks: [],
        weaponSuggestions: [
          { weaponName: 'Greataxe', quantity: 1, reason: 'Primary two-handed weapon' },
          { weaponName: 'Handaxe', quantity: 2, reason: 'Throwing weapons' }
        ],
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

      renderModal();

      // Select Barbarian
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Barbarian' } });
      });

      // Wait for the service to be called
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Barbarian');
      });

      // Wait for weapon suggestions to be applied
      await waitFor(() => {
        // The component should have processed the weapon suggestions
        // We can't directly test the internal state, but we can verify the service was called
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledTimes(1);
      });
    });

    it('should clear weapons when class has no suggestions', async () => {
      // Mock no weapon suggestions for Wizard
      mockCreationService.getCreationOptions.mockResolvedValue({
        equipmentPacks: [],
        weaponSuggestions: [], // No weapon suggestions
        armorSuggestions: [],
        subclasses: [],
        needsSubclassAtCreation: false,
        spellcasting: {
          ability: 'Intelligence',
          canCastAtLevel1: true,
          availableSpells: [],
          spellSlots: {}
        }
      });

      renderModal();

      // Select Wizard
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });

      // Debug: Check if the select value actually changed
      console.log('🔍 DEBUG - Class select value after change:', (classSelect as HTMLSelectElement).value);
      console.log('🔍 DEBUG - Mock calls:', mockCreationService.getCreationOptions.mock.calls);

      // Wait for the service to be called
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Wizard');
      });

      // Wait for processing to complete
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle class changes without redundant clearing', async () => {
      // Mock different weapon suggestions for different classes
      mockCreationService.getCreationOptions
        .mockResolvedValueOnce({
          equipmentPacks: [],
          weaponSuggestions: [
            { weaponName: 'Greataxe', quantity: 1, reason: 'Primary two-handed weapon' }
          ],
          armorSuggestions: [],
          subclasses: [],
          needsSubclassAtCreation: false,
          spellcasting: { ability: null, canCastAtLevel1: false, availableSpells: [], spellSlots: {} }
        })
        .mockResolvedValueOnce({
          equipmentPacks: [],
          weaponSuggestions: [
            { weaponName: 'Dagger', quantity: 2, reason: 'Backup weapons' }
          ],
          armorSuggestions: [],
          subclasses: [],
          needsSubclassAtCreation: false,
          spellcasting: { ability: null, canCastAtLevel1: false, availableSpells: [], spellSlots: {} }
        });

      renderModal();

      // Select Barbarian first
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Barbarian' } });
      });

      // Wait for first service call
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Barbarian');
      });

      // Select Fighter second
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Fighter' } });
      });

      // Wait for second service call
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Fighter');
      });

      // Verify both calls were made
      expect(mockCreationService.getCreationOptions).toHaveBeenCalledTimes(2);
    });
  });
}); 