import { render, screen, fireEvent } from '@testing-library/react';
import { ActionsTab } from '../ActionsTab';
import { createCharacterCalculations } from '@/services/character/calculations';

// Mock the theme hooks
jest.mock('@/hooks/use-theme', () => ({
  useConditionSeverityStyles: () => ({
    getStyles: () => ({})
  }),
  useOpacityStyles: () => ({}),
  useBorderLeftStyles: () => ({}),
  useInteractiveButtonStyles: () => ({})
}));

// Mock the equipment service
jest.mock('@/services/character/equipment', () => ({
  createCharacterEquipment: () => ({
    getEquippedWeapons: () => [],
    getEquippedArmor: () => [],
    getEquippedMagicalItems: () => []
  })
}));

// Mock the magical items service
jest.mock('@/lib/dnd/magical-items', () => ({
  getSpellsFromMagicalItems: () => []
}));

// Mock the spells service
jest.mock('@/lib/dnd/spells', () => ({
  getClassSpells: jest.fn().mockResolvedValue([])
}));

// Mock the spell data helper
jest.mock('@/lib/dnd/spell-data-helper', () => ({
  findSpellByName: jest.fn().mockResolvedValue(null)
}));

// Mock the level-up service
jest.mock('@/lib/dnd/level-up', () => ({
  getSpellcastingType: () => 'known',
  canPrepareSpells: () => false,
  getSpellsPreparedCount: () => 0
}));

// Mock the conditions
jest.mock('@/lib/dnd/conditions', () => ({
  CONDITIONS: [],
  getCondition: () => null
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
  armorClass: 16,
  speed: 30,
  actions: [],
  bonusActions: [],
  reactions: [],
  conditions: [],
  ammunition: []
};

const mockProps = {
  character: mockCharacter,
  equippedWeapons: [],
  equippedMagicalItems: [],
  inventoryMagicalItems: [],
  currentArmorClass: 16,
  onOpenSpellPreparation: jest.fn(),
  onRollSavingThrow: jest.fn()
};

describe('ActionsTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ActionsTab {...mockProps} />);
    expect(screen.getByText('Combat Summary')).toBeInTheDocument();
  });

  it('shows compact saving throws when HP is 0', () => {
    const characterWithZeroHP = { ...mockCharacter, hitPoints: 0 };
    render(<ActionsTab {...mockProps} character={characterWithZeroHP} />);
    
    // Should show the compact saving throws in the HP tile (not the full section)
    expect(screen.getByText('STR')).toBeInTheDocument();
    expect(screen.getByText('DEX')).toBeInTheDocument();
    expect(screen.getByText('CON')).toBeInTheDocument();
    expect(screen.getByText('INT')).toBeInTheDocument();
    expect(screen.getByText('WIS')).toBeInTheDocument();
    expect(screen.getByText('CHA')).toBeInTheDocument();
  });

  it('shows full saving throws section when HP is low', () => {
    const characterWithLowHP = { ...mockCharacter, hitPoints: 2, maxHitPoints: 12 };
    render(<ActionsTab {...mockProps} character={characterWithLowHP} />);
    
    // Should show the full saving throws section
    expect(screen.getByText('Saving Throws')).toBeInTheDocument();
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('Dexterity')).toBeInTheDocument();
    expect(screen.getByText('Constitution')).toBeInTheDocument();
  });

  it('shows toggle button for saving throws when HP is normal', () => {
    render(<ActionsTab {...mockProps} />);
    
    // Should show the toggle button
    expect(screen.getByText('Show Saving Throws')).toBeInTheDocument();
  });

  it('calls onRollSavingThrow when clicking a saving throw', () => {
    const characterWithZeroHP = { ...mockCharacter, hitPoints: 0 };
    render(<ActionsTab {...mockProps} character={characterWithZeroHP} />);
    
    // Click on the STR saving throw
    const strButton = screen.getByText('STR').closest('div');
    fireEvent.click(strButton!);
    
    expect(mockProps.onRollSavingThrow).toHaveBeenCalledWith('Strength', expect.any(Number));
  });

  it('displays correct saving throw bonuses', () => {
    const characterWithZeroHP = { ...mockCharacter, hitPoints: 0 };
    render(<ActionsTab {...mockProps} character={characterWithZeroHP} />);
    
    // Fighter gets STR and CON saving throw proficiencies
    const calc = createCharacterCalculations(characterWithZeroHP);
    const strBonus = calc.getSavingThrowBonus('strength');
    const dexBonus = calc.getSavingThrowBonus('dexterity');
    
    // Should display the correct bonuses (use getAllByText to handle multiple instances)
    const strElements = screen.getAllByText(`+${strBonus}`);
    const dexElements = screen.getAllByText(`${dexBonus >= 0 ? '+' : ''}${dexBonus}`);
    expect(strElements.length).toBeGreaterThan(0);
    expect(dexElements.length).toBeGreaterThan(0);
  });

  it('shows proficiency indicator for proficient saving throws', () => {
    const characterWithZeroHP = { ...mockCharacter, hitPoints: 0 };
    render(<ActionsTab {...mockProps} character={characterWithZeroHP} />);
    
    // Find the STR and CON tile divs by traversing up from the label
    const strLabel = screen.getByText('STR');
    const conLabel = screen.getByText('CON');
    const strTile = strLabel.closest('.p-1');
    const conTile = conLabel.closest('.p-1');
    
    // These should have the proficiency background color
    expect(strTile).toHaveClass('bg-[var(--color-success)]/20');
    expect(conTile).toHaveClass('bg-[var(--color-success)]/20');
    
    // Also check that the bonus text is green for proficient saves
    const strBonus = screen.getByText('+5'); // STR bonus for Fighter with 16 STR + proficiency
    const conBonus = screen.getByText('+4'); // CON bonus for Fighter with 15 CON + proficiency
    expect(strBonus).toHaveClass('text-[var(--color-success)]');
    expect(conBonus).toHaveClass('text-[var(--color-success)]');
  });
}); 