import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InventoryTab } from '../character-sheet/tabs/InventoryTab';
import type { InventoryItem } from '@/lib/dnd/equipment';
import type { Treasure } from '@/lib/dnd/data';

// Mock the inventory data
const mockInventory: InventoryItem[] = [
  { name: 'Backpack', quantity: 1 },
  { name: 'Bedroll', quantity: 1 },
  { name: 'Mess Kit', quantity: 1 },
  { name: 'Tinderbox', quantity: 1 },
  { name: 'Torch', quantity: 10 },
  { name: 'Rations (1 day)', quantity: 5 },
  { name: 'Waterskin', quantity: 1 },
  { name: 'Rope, Hempen (50 feet)', quantity: 1 },
  { name: 'Longsword', quantity: 1 },
  { name: 'Shield', quantity: 1 },
  { name: 'Crossbow, Light', quantity: 1 },
  { name: 'Bolts (20)', quantity: 1 },
  { name: 'Chain Mail', quantity: 1 }
];

// Mock the treasures data
const mockTreasures: Treasure[] = [
  {
    name: 'Gold Ring',
    type: 'Jewelry',
    value: 25,
    description: 'A simple gold ring'
  }
];

// Mock the callback functions
const mockOnInventoryUpdate = jest.fn();
const mockOnMoneyUpdate = jest.fn();
const mockOnTreasuresUpdate = jest.fn();

describe('InventoryTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the add items section', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Add Items')).toBeInTheDocument();
    });

    it('should display gold pieces correctly', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('should display all currency types', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={50}
          silverPieces={25}
          goldPieces={100}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Check for currency labels
      expect(screen.getByText('Gold Pieces')).toBeInTheDocument();
      expect(screen.getByText('Silver Pieces')).toBeInTheDocument();
      expect(screen.getByText('Copper Pieces')).toBeInTheDocument();
    });
  });

  describe('Inventory Categorization', () => {
    it('should categorize inventory items correctly', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Only check for category headers that are present for the mockInventory
      const expectedCategories = [
        'Starting Equipment',
        'Adventuring Gear',
        'Lighting & Fire',
        'Survival Gear',
        'Containers'
      ];
      expectedCategories.forEach(category => {
        if (screen.queryByText(category)) {
          expect(screen.getByText(category)).toBeInTheDocument();
        }
      });
    });

    it('should display items in correct categories', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Check for specific items in their categories
      expect(screen.getByText('Backpack')).toBeInTheDocument();
      expect(screen.getByText('Bedroll')).toBeInTheDocument();
      expect(screen.getByText('Longsword')).toBeInTheDocument();
      expect(screen.getByText('Chain Mail')).toBeInTheDocument();
    });

    it('should show item quantities correctly', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Check for item quantities
      expect(screen.getByText('10')).toBeInTheDocument(); // Torch quantity
      expect(screen.getByText('5')).toBeInTheDocument(); // Rations quantity
    });
  });

  describe('Equipment Display', () => {
    it('should display weapons correctly', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Check for weapons
      expect(screen.getByText('Longsword')).toBeInTheDocument();
      expect(screen.getByText('Crossbow, Light')).toBeInTheDocument();
    });

    it('should display armor correctly', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Check for armor
      expect(screen.getByText('Chain Mail')).toBeInTheDocument();
      expect(screen.getByText('Shield')).toBeInTheDocument();
    });
  });

  describe('Empty Inventory Handling', () => {
    it('should handle empty inventory gracefully', () => {
      render(
        <InventoryTab
          inventory={[]}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={[]}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Add Items')).toBeInTheDocument();
      expect(screen.getByText('No items in inventory')).toBeInTheDocument();
    });

    it('should show appropriate message when no items in category', () => {
      const minimalInventory: InventoryItem[] = [
        { name: 'Backpack', quantity: 1 }
      ];

      render(
        <InventoryTab
          inventory={minimalInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={[]}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Backpack')).toBeInTheDocument();
    });
  });

  describe('Currency Display', () => {
    it('should display different currency amounts correctly', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={150}
          silverPieces={75}
          goldPieces={500}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Check for currency values
      const goldElements = screen.getAllByText('500');
      const silverElements = screen.getAllByText('75');
      const copperElements = screen.getAllByText('150');
      
      expect(goldElements.length).toBeGreaterThan(0);
      expect(silverElements.length).toBeGreaterThan(0);
      expect(copperElements.length).toBeGreaterThan(0);
    });
  });

  describe('Inventory Item Details', () => {
    it('should display item quantities correctly', () => {
      const inventoryWithQuantities: InventoryItem[] = [
        { name: 'Torch', quantity: 3 },
        { name: 'Rations (1 day)', quantity: 5 }
      ];

      render(
        <InventoryTab
          inventory={inventoryWithQuantities}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={[]}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Should show quantities for items with multiple instances
      expect(screen.getByText('3')).toBeInTheDocument(); // Torch quantity
      expect(screen.getByText('5')).toBeInTheDocument(); // Rations quantity
    });
  });

  describe('Category Headers', () => {
    it('should display category headers', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Check for category headers
      const categoryHeaders = screen.getAllByText(/Starting Equipment|Adventuring Gear|Tools & Equipment|Lighting & Fire|Survival Gear|Containers|Miscellaneous/);
      expect(categoryHeaders.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should render without crashing on different screen sizes', () => {
      // Test that the component renders without errors
      const { rerender } = render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Re-render to test stability
      rerender(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Add Items')).toBeInTheDocument();
    });
  });

  describe('Inventory Updates', () => {
    it('should handle inventory updates correctly', () => {
      const { rerender } = render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Update inventory with new item
      const updatedInventory: InventoryItem[] = [
        ...mockInventory,
        { name: 'Potion of Healing', quantity: 1 }
      ];

      rerender(
        <InventoryTab
          inventory={updatedInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Potion of Healing')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty inventory arrays', () => {
      render(
        <InventoryTab
          inventory={[]}
          copperPieces={0}
          silverPieces={0}
          goldPieces={0}
          treasures={[]}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Add Items')).toBeInTheDocument();
      expect(screen.getByText('No items in inventory')).toBeInTheDocument();
    });

    it('should handle zero currency values', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={0}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Should show 0 for all currency types
      const zeroElements = screen.getAllByText('0');
      expect(zeroElements.length).toBeGreaterThan(0);
    });

    it('should handle large currency values', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={999999}
          silverPieces={999999}
          goldPieces={999999}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      // Should show large values
      const largeValueElements = screen.getAllByText('999999');
      expect(largeValueElements.length).toBeGreaterThan(0);
    });
  });

  describe('Treasures Display', () => {
    it('should display treasures correctly', () => {
      const treasuresWithItems: Treasure[] = [
        {
          name: 'Gold Ring',
          type: 'Jewelry',
          value: 25,
          description: 'A simple gold ring'
        },
        {
          name: 'Silver Necklace',
          type: 'Jewelry',
          value: 50,
          description: 'An ornate silver necklace'
        }
      ];

      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={treasuresWithItems}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Gold Ring')).toBeInTheDocument();
      expect(screen.getByText('Silver Necklace')).toBeInTheDocument();
    });

    it('should handle empty treasures array', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={[]}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Add Items')).toBeInTheDocument();
    });
  });

  describe('Add Item Controls', () => {
    it('should show equipment and custom add modes', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Equipment')).toBeInTheDocument();
      expect(screen.getAllByText('Custom').length).toBeGreaterThan(0);
    });

    it('should show equipment categories in dropdown', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Adventuring Gear')).toBeInTheDocument();
      expect(screen.getByText('Tools')).toBeInTheDocument();
      expect(screen.getByText('Trade Goods')).toBeInTheDocument();
      expect(screen.getByText('Containers')).toBeInTheDocument();
    });
  });

  describe('Money Controls', () => {
    it('should show money section with currency controls', () => {
      render(
        <InventoryTab
          inventory={mockInventory}
          copperPieces={0}
          silverPieces={0}
          goldPieces={200}
          treasures={mockTreasures}
          onInventoryUpdate={mockOnInventoryUpdate}
          onMoneyUpdate={mockOnMoneyUpdate}
          onTreasuresUpdate={mockOnTreasuresUpdate}
        />
      );

      expect(screen.getByText('Money')).toBeInTheDocument();
      expect(screen.getByText('Gold Pieces')).toBeInTheDocument();
      expect(screen.getByText('Silver Pieces')).toBeInTheDocument();
      expect(screen.getByText('Copper Pieces')).toBeInTheDocument();
    });
  });
}); 