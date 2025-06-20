import { render, screen } from '@testing-library/react'
import { CharacterCard } from '../character-card'
import { Character } from '@/types/character'

// Simple mock for components with external dependencies
jest.mock('../character-sheet', () => ({
  CharacterSheet: () => <div data-testid="character-sheet">Character Sheet</div>,
}))

jest.mock('../delete-confirmation-dialog', () => ({
  DeleteConfirmationDialog: () => <div data-testid="delete-dialog">Delete Dialog</div>,
}))

// Mock the hooks with a simple implementation
jest.mock('@/hooks/use-character-mutations', () => ({
  useCharacterMutations: () => ({
    deleteCharacter: {
      mutateAsync: jest.fn(),
    },
  }),
}))

describe('CharacterCard', () => {
  const mockCharacter: Character = {
    id: '1',
    name: 'Test Character',
    race: 'Human',
    class: 'Fighter',
    level: 1,
    hitPoints: 10,
    maxHitPoints: 10,
    armorClass: 15,
    background: 'Soldier',
    alignment: 'Lawful Good',
    strength: 16,
    dexterity: 14,
    constitution: 12,
    intelligence: 10,
    wisdom: 8,
    charisma: 6,
    speed: 30,
    proficiencyBonus: 2,
    skills: ['Athletics', 'Intimidation'],
    inventory: [],
    weapons: [],
    spellsKnown: [],
    spellsPrepared: [],
    spellSlots: {},
    spellcastingAbility: '',
    spellSaveDC: 0,
    spellAttackBonus: 0,
    actions: [],
    bonusActions: [],
    reactions: [],
    appearance: '',
    personality: '',
    backstory: '',
    avatar: '',
    fullBodyAvatar: '',
    backgroundCharacteristics: {
      personalityTraits: [],
      ideals: [],
      bonds: [],
      flaws: [],
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    userId: 'user1',
  }

  it('renders character information correctly', () => {
    render(<CharacterCard character={mockCharacter} />)
    
    expect(screen.getByText('Test Character')).toBeInTheDocument()
    expect(screen.getByText('Human Fighter')).toBeInTheDocument()
    expect(screen.getByText('Level 1')).toBeInTheDocument()
    expect(screen.getByText('Hit Points')).toBeInTheDocument()
    expect(screen.getByText('10/10')).toBeInTheDocument()
    expect(screen.getByText('Armor Class')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('shows syncing indicator when character is optimistic', () => {
    const optimisticCharacter = { ...mockCharacter, isOptimistic: true }
    render(<CharacterCard character={optimisticCharacter} />)
    
    expect(screen.getByText('Syncing...')).toBeInTheDocument()
  })

  it('shows fallback avatar when no avatar is provided', () => {
    render(<CharacterCard character={mockCharacter} />)
    
    // Should show the first letter of the character name in a gradient circle
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('shows actual avatar when provided', () => {
    const characterWithAvatar = { ...mockCharacter, avatar: 'test-avatar.jpg' }
    render(<CharacterCard character={characterWithAvatar} />)
    
    const avatarImage = screen.getByAltText("Test Character's avatar")
    expect(avatarImage).toBeInTheDocument()
    expect(avatarImage).toHaveAttribute('src', 'test-avatar.jpg')
  })
}) 