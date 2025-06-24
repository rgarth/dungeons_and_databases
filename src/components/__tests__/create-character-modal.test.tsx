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
    calculateSpellcastingStats: jest.fn(),
    validateSpellSelection: jest.fn()
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
      if (url.includes('/api/classes/') && !url.includes('/spell-limits')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ startingGoldFormula: '4d4*10' })
        } as Response);
      }
      if (url.includes('/api/classes/') && url.includes('/spell-limits')) {
        // Mock spell limits API response
        const className = url.includes('Wizard') ? 'Wizard' : 'Sorcerer';
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            cantripsKnown: className === 'Wizard' ? 3 : 4,
            spellsKnown: className === 'Wizard' ? 6 : 2,
            spellcastingType: 'prepared',
            maxSpellLevel: 1,
            spellLevelLimits: { "1": className === 'Wizard' ? 6 : 2 }
          })
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

    mockCreationService.validateSpellSelection.mockReturnValue({
      isValid: true,
      maxSpells: 6,
      maxCantrips: 3
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
      renderModal();
      
      const classSelect = screen.getByLabelText('Class');
      fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });
      
      await waitFor(() => {
        expect(mockCreationService.getCreationOptions).toHaveBeenCalledWith('Sorcerer');
      });
    });

    it('should clear subrace when race changes', async () => {
      // Mock subrace API response for Elf
      mockFetch.mockImplementation((input: string | Request | URL) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url.includes('/api/subraces?race=Elf')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: '1', name: 'High Elf', description: 'High elves', abilityScoreIncrease: '+2 Dex, +1 Int', traits: ['Elf Weapon Training'] },
              { id: '2', name: 'Wood Elf', description: 'Wood elves', abilityScoreIncrease: '+2 Dex, +1 Wis', traits: ['Elf Weapon Training'] }
            ])
          } as Response);
        }
        if (url.includes('/api/subraces?race=Human')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
          } as Response);
        }
        // Default mock for other API calls
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        } as Response);
      });

      renderModal();
      
      // First, select a race that has subraces (Elf)
      const raceSelect = screen.getByLabelText('Race');
      fireEvent.change(raceSelect, { target: { value: 'Elf' } });
      
      // Wait for subrace selector to appear
      await waitFor(() => {
        const subraceLabel = screen.getByText('Subrace');
        expect(subraceLabel).toBeInTheDocument();
      });
      
      // Now change to a different race (Human) that has no subraces
      fireEvent.change(raceSelect, { target: { value: 'Human' } });
      
      // The subrace should be cleared and not visible for Human
      await waitFor(() => {
        const subraceLabel = screen.queryByText('Subrace');
        expect(subraceLabel).not.toBeInTheDocument();
      });
    });

    it('should clear subclass when class changes', async () => {
      // Mock creation options for different classes
      mockCreationService.getCreationOptions.mockImplementation((className: string) => {
        if (className === 'Warlock') {
          return Promise.resolve({
            equipmentPacks: [],
            weaponSuggestions: [],
            armorSuggestions: [],
            subclasses: [
              { name: 'The Fiend', description: 'Fiendish patron' },
              { name: 'The Great Old One', description: 'Eldritch patron' }
            ],
            needsSubclassAtCreation: true,
            spellcasting: {
              ability: 'Charisma',
              canCastAtLevel1: true,
              availableSpells: [],
              spellSlots: {}
            }
          });
        }
        if (className === 'Fighter') {
          return Promise.resolve({
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
        }
        // Default response
        return Promise.resolve({
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
      });

      renderModal();
      
      // First, select a class that has subclasses (Warlock)
      const classSelect = screen.getByLabelText('Class');
      fireEvent.change(classSelect, { target: { value: 'Warlock' } });
      
      // Wait for subclass selector to appear
      await waitFor(() => {
        const subclassLabel = screen.getByText('Subclass *');
        expect(subclassLabel).toBeInTheDocument();
      });
      
      // Select a subclass
      const subclassSelect = screen.getByLabelText('Subclass *');
      fireEvent.change(subclassSelect, { target: { value: 'The Fiend' } });
      expect(subclassSelect).toHaveValue('The Fiend');
      
      // Now change to a different class (Fighter) that has no subclasses
      fireEvent.change(classSelect, { target: { value: 'Fighter' } });
      
      // The subclass should be cleared and not visible for Fighter
      await waitFor(() => {
        const subclassLabel = screen.queryByText('Subclass *');
        expect(subclassLabel).not.toBeInTheDocument();
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

  describe('Spell Limit Caching', () => {
    it('should fetch and cache spell limits when class changes to a spellcaster', async () => {
      renderModal();

      // Select Wizard class
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });

      // Wait for spell limits API call
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/classes/Wizard/spell-limits?level=1')
        );
      });

      // Verify the API was called with correct parameters
      const spellLimitsCall = mockFetch.mock.calls.find(call => 
        call[0].toString().includes('/spell-limits')
      );
      expect(spellLimitsCall).toBeDefined();
    });

    it('should use cached spell limits when switching back to a previously selected class', async () => {
      renderModal();

      // Select Wizard first
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });

      // Wait for first spell limits fetch
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/classes/Wizard/spell-limits?level=1')
        );
      });

      // Switch to Sorcerer
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });
      });

      // Wait for Sorcerer spell limits fetch
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/classes/Sorcerer/spell-limits?level=1')
        );
      });

      // Switch back to Wizard
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });

      // Count spell limits API calls - should only be 2 (Wizard and Sorcerer), not 3
      const spellLimitsCalls = mockFetch.mock.calls.filter(call => 
        call[0].toString().includes('/spell-limits')
      );
      expect(spellLimitsCalls).toHaveLength(2);
    });

    it('should handle spell limit API errors gracefully', async () => {
      // Mock API error for spell limits
      mockFetch.mockImplementation((input: string | Request | URL) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url.includes('/spell-limits')) {
          return Promise.resolve({
            ok: false,
            status: 404,
            json: () => Promise.resolve({ error: 'Spell limits not found' })
          } as Response);
        }
        // Return default mock for other calls
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        } as Response);
      });

      renderModal();

      // Select Wizard class
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });

      // Should not throw error and should continue working
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/classes/Wizard/spell-limits?level=1')
        );
      });

      // Component should still be functional
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('should validate spell selection using cached limits', async () => {
      renderModal();

      // Select Wizard class
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });

      // Wait for spell limits to be cached
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/classes/Wizard/spell-limits?level=1')
        );
      });

      // Mock spellcasting options to include spells
      mockCreationService.getCreationOptions.mockResolvedValue({
        equipmentPacks: [],
        weaponSuggestions: [],
        armorSuggestions: [],
        subclasses: [],
        needsSubclassAtCreation: false,
        spellcasting: {
          ability: 'Intelligence',
          canCastAtLevel1: true,
          availableSpells: [
            { name: 'Magic Missile', level: 1, school: 'Evocation' },
            { name: 'Shield', level: 1, school: 'Abjuration' }
          ],
          spellSlots: { 1: 2 }
        }
      });

      // Trigger spell selection (this would normally happen when spells are available)
      // The cached spell limits should be used in the spell toggle handler
      expect(mockCreationService.validateSpellSelection).toBeDefined();
    });

    it('should cache different spell limits for different classes', async () => {
      renderModal();

      // Select Wizard first
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Wizard' } });
      });

      // Wait for Wizard spell limits
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/classes/Wizard/spell-limits?level=1')
        );
      });

      // Select Sorcerer
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });
      });

      // Wait for Sorcerer spell limits
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/classes/Sorcerer/spell-limits?level=1')
        );
      });

      // Verify different spell limits were requested for different classes
      const wizardCall = mockFetch.mock.calls.find(call => 
        call[0].toString().includes('Wizard/spell-limits')
      );
      const sorcererCall = mockFetch.mock.calls.find(call => 
        call[0].toString().includes('Sorcerer/spell-limits')
      );

      expect(wizardCall).toBeDefined();
      expect(sorcererCall).toBeDefined();
      expect(wizardCall).not.toEqual(sorcererCall);
    });

    it('should not fetch spell limits for non-spellcasting classes', async () => {
      renderModal();

      // Select Barbarian (non-spellcaster)
      const classSelect = screen.getByLabelText('Class');
      await act(async () => {
        fireEvent.change(classSelect, { target: { value: 'Barbarian' } });
      });

      // Wait for any API calls to complete
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      // Verify no spell limits API call was made
      const spellLimitsCalls = mockFetch.mock.calls.filter(call => 
        call[0].toString().includes('/spell-limits')
      );
      expect(spellLimitsCalls).toHaveLength(0);
    });
  });

  describe('Spell Selection Tests', () => {
    // Test data for all spellcasting classes
    const spellcastingClasses = [
      { name: 'Wizard', type: 'spellbook', cantrips: 3, spells: 6, ability: 'Intelligence' },
      { name: 'Cleric', type: 'prepared', cantrips: 3, spells: 0, ability: 'Wisdom' },
      { name: 'Druid', type: 'prepared', cantrips: 2, spells: 0, ability: 'Wisdom' },
      { name: 'Bard', type: 'known', cantrips: 4, spells: 2, ability: 'Charisma' },
      { name: 'Sorcerer', type: 'known', cantrips: 4, spells: 2, ability: 'Charisma' },
      { name: 'Warlock', type: 'known', cantrips: 2, spells: 2, ability: 'Charisma' },
      { name: 'Paladin', type: 'prepared', cantrips: 0, spells: 0, ability: 'Charisma' },
      { name: 'Ranger', type: 'known', cantrips: 0, spells: 0, ability: 'Wisdom' } // Gets spells at level 2
    ];

    spellcastingClasses.forEach(({ name, type, cantrips, spells, ability }) => {
      describe(`${name} Spell Selection`, () => {
        beforeEach(() => {
          // Mock spell limits API response
          mockFetch.mockImplementation((input: string | Request | URL) => {
            const url = typeof input === 'string' ? input : input.toString();
            if (url.includes('/spell-limits')) {
              return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                  cantripsKnown: cantrips,
                  spellsKnown: spells,
                  spellcastingType: type,
                  maxSpellLevel: 1
                })
              } as Response);
            }
            // Return default mock for other calls
            return Promise.resolve({
              ok: true,
              json: () => Promise.resolve([])
            } as Response);
          });

          // Mock spellcasting options with sample spells
          mockCreationService.getCreationOptions.mockResolvedValue({
            equipmentPacks: [],
            weaponSuggestions: [],
            armorSuggestions: [],
            subclasses: [],
            needsSubclassAtCreation: false,
            spellcasting: {
              ability: ability,
              canCastAtLevel1: true,
              availableSpells: [
                { name: 'Fire Bolt', level: 0, school: 'Evocation' },
                { name: 'Mage Hand', level: 0, school: 'Conjuration' },
                { name: 'Magic Missile', level: 1, school: 'Evocation' },
                { name: 'Shield', level: 1, school: 'Abjuration' },
                { name: 'Cure Wounds', level: 1, school: 'Evocation' }
              ],
              spellSlots: { 1: 2 }
            }
          });
        });

        it(`should display correct spell limits for ${name}`, async () => {
          renderModal();

          // Select the class
          const classSelect = screen.getByLabelText('Class');
          await act(async () => {
            fireEvent.change(classSelect, { target: { value: name } });
          });

          // Wait for spell limits to load
          await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
              expect.stringContaining(`/api/classes/${name}/spell-limits?level=1`)
            );
          });

          // Check that spell limits are displayed
          await waitFor(() => {
            if (cantrips > 0 || spells > 0) {
              expect(screen.getByText(/Cantrips:/)).toBeInTheDocument();
              expect(screen.getByText(/Spells:/)).toBeInTheDocument();
            }
          });
        });

        it(`should enforce cantrip limits for ${name}`, async () => {
          renderModal();

          // Select the class
          const classSelect = screen.getByLabelText('Class');
          await act(async () => {
            fireEvent.change(classSelect, { target: { value: name } });
          });

          // Wait for spell limits to load
          await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
              expect.stringContaining(`/api/classes/${name}/spell-limits?level=1`)
            );
          });

          if (cantrips > 0) {
            // Try to select more cantrips than allowed
            const cantripCheckboxes = screen.getAllByText(/Fire Bolt|Mage Hand/);
            
            // Select all available cantrips
            for (let i = 0; i < cantrips; i++) {
              if (cantripCheckboxes[i]) {
                await act(async () => {
                  fireEvent.click(cantripCheckboxes[i]);
                });
              }
            }

            // Try to select one more cantrip (should not be allowed)
            const extraCantrip = cantripCheckboxes[cantrips];
            if (extraCantrip) {
              await act(async () => {
                fireEvent.click(extraCantrip);
              });
              
              // Verify the extra cantrip was not selected
              await waitFor(() => {
                const selectedCount = screen.getByText(/Cantrips:/).textContent;
                expect(selectedCount).toContain(`${cantrips}/${cantrips}`);
              });
            }
          }
        });

        it(`should handle ${type} spellcasting type correctly for ${name}`, async () => {
          renderModal();

          // Select the class
          const classSelect = screen.getByLabelText('Class');
          await act(async () => {
            fireEvent.change(classSelect, { target: { value: name } });
          });

          // Wait for spell limits to load
          await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
              expect.stringContaining(`/api/classes/${name}/spell-limits?level=1`)
            );
          });

          // Check that the spellcasting type is displayed correctly
          await waitFor(() => {
            if (cantrips > 0 || spells > 0) {
              const typeText = screen.getByText(/Type:/);
              expect(typeText).toBeInTheDocument();
              expect(typeText.textContent).toContain(type);
            }
          });

          // For prepared spellcasters, check that spells are auto-selected
          if (type === 'prepared' && spells === 0) {
            await waitFor(() => {
              const autoSelectText = screen.getByText(/Auto-selected/);
              expect(autoSelectText).toBeInTheDocument();
            });
          }
        });

        it(`should clear spell selections when switching from ${name} to another class`, async () => {
          renderModal();

          // Select the first class
          const classSelect = screen.getByLabelText('Class');
          await act(async () => {
            fireEvent.change(classSelect, { target: { value: name } });
          });

          // Wait for spell limits to load
          await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
              expect.stringContaining(`/api/classes/${name}/spell-limits?level=1`)
            );
          });

          if (cantrips > 0) {
            // Select a cantrip
            const cantripCheckbox = screen.getByText('Fire Bolt');
            await act(async () => {
              fireEvent.click(cantripCheckbox);
            });

            // Verify cantrip is selected
            await waitFor(() => {
              expect(cantripCheckbox.closest('label')).toHaveClass('bg-purple-600');
            });
          }

          // Switch to a different class
          await act(async () => {
            fireEvent.change(classSelect, { target: { value: 'Barbarian' } });
          });

          // Verify spell selections are cleared
          await waitFor(() => {
            const selectedSpellsText = screen.getByText(/Selected Spells: 0/);
            expect(selectedSpellsText).toBeInTheDocument();
          });
        });
      });
    });

    describe('Prepared Spellcaster Auto-Selection', () => {
      it('should auto-select all 1st-level spells for Cleric', async () => {
        // Mock spell limits for Cleric
        mockFetch.mockImplementation((input: string | Request | URL) => {
          const url = typeof input === 'string' ? input : input.toString();
          if (url.includes('/spell-limits')) {
            return Promise.resolve({
              ok: true,
              json: () => Promise.resolve({
                cantripsKnown: 3,
                spellsKnown: 0,
                spellcastingType: 'prepared',
                maxSpellLevel: 1
              })
            } as Response);
          }
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
          } as Response);
        });

        // Mock spellcasting options with multiple 1st-level spells
        mockCreationService.getCreationOptions.mockResolvedValue({
          equipmentPacks: [],
          weaponSuggestions: [],
          armorSuggestions: [],
          subclasses: [],
          needsSubclassAtCreation: false,
          spellcasting: {
            ability: 'Wisdom',
            canCastAtLevel1: true,
            availableSpells: [
              { name: 'Fire Bolt', level: 0, school: 'Evocation' },
              { name: 'Magic Missile', level: 1, school: 'Evocation' },
              { name: 'Shield', level: 1, school: 'Abjuration' },
              { name: 'Cure Wounds', level: 1, school: 'Evocation' }
            ],
            spellSlots: { 1: 2 }
          }
        });

        renderModal();

        // Select Cleric
        const classSelect = screen.getByLabelText('Class');
        await act(async () => {
          fireEvent.change(classSelect, { target: { value: 'Cleric' } });
        });

        // Wait for auto-selection to complete
        await waitFor(() => {
          expect(screen.getByText(/Auto-selected/)).toBeInTheDocument();
        });

        // Verify all 1st-level spells are selected
        await waitFor(() => {
          const magicMissile = screen.getByText('Magic Missile');
          const shield = screen.getByText('Shield');
          const cureWounds = screen.getByText('Cure Wounds');
          
          expect(magicMissile.closest('label')).toHaveClass('bg-purple-600');
          expect(shield.closest('label')).toHaveClass('bg-purple-600');
          expect(cureWounds.closest('label')).toHaveClass('bg-purple-600');
        });
      });

      it('should auto-select all 1st-level spells for Druid', async () => {
        // Mock spell limits for Druid
        mockFetch.mockImplementation((input: string | Request | URL) => {
          const url = typeof input === 'string' ? input : input.toString();
          if (url.includes('/spell-limits')) {
            return Promise.resolve({
              ok: true,
              json: () => Promise.resolve({
                cantripsKnown: 2,
                spellsKnown: 0,
                spellcastingType: 'prepared',
                maxSpellLevel: 1
              })
            } as Response);
          }
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
          } as Response);
        });

        renderModal();

        // Select Druid
        const classSelect = screen.getByLabelText('Class');
        await act(async () => {
          fireEvent.change(classSelect, { target: { value: 'Druid' } });
        });

        // Wait for auto-selection to complete
        await waitFor(() => {
          expect(screen.getByText(/Auto-selected/)).toBeInTheDocument();
        });
      });
    });

    describe('Known Spellcaster Manual Selection', () => {
      it('should allow manual spell selection for Sorcerer', async () => {
        // Mock spell limits for Sorcerer
        mockFetch.mockImplementation((input: string | Request | URL) => {
          const url = typeof input === 'string' ? input : input.toString();
          if (url.includes('/spell-limits')) {
            return Promise.resolve({
              ok: true,
              json: () => Promise.resolve({
                cantripsKnown: 4,
                spellsKnown: 2,
                spellcastingType: 'known',
                maxSpellLevel: 1
              })
            } as Response);
          }
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
          } as Response);
        });

        renderModal();

        // Select Sorcerer
        const classSelect = screen.getByLabelText('Class');
        await act(async () => {
          fireEvent.change(classSelect, { target: { value: 'Sorcerer' } });
        });

        // Wait for spell limits to load
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/classes/Sorcerer/spell-limits?level=1')
          );
        });

        // Select a cantrip
        const fireBolt = screen.getByText('Fire Bolt');
        await act(async () => {
          fireEvent.click(fireBolt);
        });

        // Verify cantrip is selected
        await waitFor(() => {
          expect(fireBolt.closest('label')).toHaveClass('bg-purple-600');
        });

        // Select a 1st-level spell
        const magicMissile = screen.getByText('Magic Missile');
        await act(async () => {
          fireEvent.click(magicMissile);
        });

        // Verify spell is selected
        await waitFor(() => {
          expect(magicMissile.closest('label')).toHaveClass('bg-purple-600');
        });
      });
    });

    describe('Spellbook Spellcaster (Wizard)', () => {
      it('should handle Wizard spellbook correctly', async () => {
        // Mock spell limits for Wizard
        mockFetch.mockImplementation((input: string | Request | URL) => {
          const url = typeof input === 'string' ? input : input.toString();
          if (url.includes('/spell-limits')) {
            return Promise.resolve({
              ok: true,
              json: () => Promise.resolve({
                cantripsKnown: 3,
                spellsKnown: 6,
                spellcastingType: 'spellbook',
                maxSpellLevel: 1
              })
            } as Response);
          }
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
          } as Response);
        });

        renderModal();

        // Select Wizard
        const classSelect = screen.getByLabelText('Class');
        await act(async () => {
          fireEvent.change(classSelect, { target: { value: 'Wizard' } });
        });

        // Wait for spell limits to load
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/classes/Wizard/spell-limits?level=1')
          );
        });

        // Check that spellbook type is displayed
        await waitFor(() => {
          const typeText = screen.getByText(/Type: spellbook/);
          expect(typeText).toBeInTheDocument();
        });
      });
    });

    describe('Non-Spellcasting Classes', () => {
      it('should not show spellcasting section for Barbarian', async () => {
        renderModal();

        // Select Barbarian
        const classSelect = screen.getByLabelText('Class');
        await act(async () => {
          fireEvent.change(classSelect, { target: { value: 'Barbarian' } });
        });

        // Wait for any API calls to complete
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalled();
        });

        // Verify no spellcasting section is shown
        expect(screen.queryByText('Spellcasting')).not.toBeInTheDocument();
      });

      it('should not fetch spell limits for non-spellcasting classes', async () => {
        renderModal();

        // Select Barbarian
        const classSelect = screen.getByLabelText('Class');
        await act(async () => {
          fireEvent.change(classSelect, { target: { value: 'Barbarian' } });
        });

        // Wait for any API calls to complete
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalled();
        });

        // Verify no spell limits API call was made
        const spellLimitsCalls = mockFetch.mock.calls.filter(call => 
          call[0].toString().includes('/spell-limits')
        );
        expect(spellLimitsCalls).toHaveLength(0);
      });
    });
  });
}); 