import { render, screen, fireEvent } from '@testing-library/react';
import { HitPointsDisplay } from '../HitPointsDisplay';

// Mock the damage service
jest.mock('@/services/character/damage', () => ({
  createDamageService: jest.fn().mockImplementation(() => ({
    takeDamage: jest.fn(),
    heal: jest.fn(),
    adjustTemporaryHP: jest.fn(),
    shortRest: jest.fn(),
    longRest: jest.fn(),
    updateDeathSaves: jest.fn()
  }))
}));

describe('HitPointsDisplay - Death Saves', () => {
  const mockOnUpdate = jest.fn();
  
  const createCharacter = (overrides = {}) => ({
    id: 'test-character',
    class: 'Fighter',
    hitPoints: 0, // Start at 0 HP to trigger death saves
    maxHitPoints: 12,
    constitution: 14,
    deathSaveSuccesses: 0,
    deathSaveFailures: 0,
    ...overrides
  });

  beforeEach(() => {
    mockOnUpdate.mockClear();
  });

  it('shows death save interface when HP is 0', () => {
    const character = createCharacter();
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Death Saving Throws')).toBeInTheDocument();
    expect(screen.getByText('Successes')).toBeInTheDocument();
    expect(screen.getByText('Failures')).toBeInTheDocument();
  });

  it('marks individual success circles correctly', () => {
    const character = createCharacter();
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    // Click the second success circle
    const successCircles = screen.getAllByTitle(/Mark success/);
    fireEvent.click(successCircles[1]); // Second circle (index 1)
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      deathSaveSuccesses: 2,
      deathSaveFailures: 0
    });
  });

  it('marks individual failure circles correctly', () => {
    const character = createCharacter();
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    // Click the third failure circle
    const failureCircles = screen.getAllByTitle(/Mark failure/);
    fireEvent.click(failureCircles[2]); // Third circle (index 2)
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      deathSaveSuccesses: 0,
      deathSaveFailures: 3
    });
  });

  it('removes success circles when clicking filled ones', () => {
    const character = createCharacter({ deathSaveSuccesses: 3 });
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    // Click the second success circle to remove it and the third
    const successCircles = screen.getAllByTitle(/Remove success/);
    fireEvent.click(successCircles[1]); // Second circle (index 1)
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      deathSaveSuccesses: 1,
      deathSaveFailures: 0
    });
  });

  it('removes failure circles when clicking filled ones', () => {
    const character = createCharacter({ deathSaveFailures: 2 });
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    // Click the first failure circle to remove it and the second
    const failureCircles = screen.getAllByTitle(/Remove failure/);
    fireEvent.click(failureCircles[0]); // First circle (index 0)
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      deathSaveSuccesses: 0,
      deathSaveFailures: 0
    });
  });

  it('auto-stabilizes when 3 successes are reached', () => {
    const character = createCharacter({ deathSaveSuccesses: 2 });
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    // Click the third success circle to reach 3 successes
    const successCircles = screen.getAllByTitle(/Mark success/);
    fireEvent.click(successCircles[2]); // Third circle (index 2)
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      deathSaveSuccesses: 3,
      deathSaveFailures: 0
    });
  });

  it('shows stabilization message when 3 successes are reached', () => {
    const character = createCharacter({ deathSaveSuccesses: 3 });
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Stabilized - gaining 1 HP!')).toBeInTheDocument();
  });

  it('shows death message when 3 failures are reached', () => {
    const character = createCharacter({ deathSaveFailures: 3 });
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('DEAD')).toBeInTheDocument();
  });

  it('provides clear instructions about how to use the circles', () => {
    const character = createCharacter();
    render(<HitPointsDisplay character={character} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText(/💡 Click any circle to mark that saving throw/)).toBeInTheDocument();
  });
}); 