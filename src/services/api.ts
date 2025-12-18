/**
 * API Service for CRUD operations
 * Mock implementation - replace with actual API calls
 */

// Item type definition
export interface Item {
  id: number;
  name: string;
  description: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data storage
let mockItems: Item[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone with A17 Pro chip',
    price: 999,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop with M3 Max chip',
    price: 2499,
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
  },
  {
    id: 3,
    name: 'AirPods Pro',
    description: 'Wireless earbuds with active noise cancellation',
    price: 249,
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all items
 */
export const getItems = async (): Promise<Item[]> => {
  await delay(300); // Simulate network delay
  return [...mockItems];
};

/**
 * Get single item by ID
 */
export const getItemById = async (id: number): Promise<Item | undefined> => {
  await delay(200);
  return mockItems.find(item => item.id === id);
};

/**
 * Create a new item
 */
export const createItem = async (
  data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Item> => {
  await delay(400);
  
  const newItem: Item = {
    ...data,
    id: Math.max(...mockItems.map(i => i.id), 0) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockItems.push(newItem);
  return newItem;
};

/**
 * Update an existing item
 */
export const updateItem = async (
  id: number,
  data: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Item | undefined> => {
  await delay(400);
  
  const index = mockItems.findIndex(item => item.id === id);
  if (index === -1) return undefined;
  
  mockItems[index] = {
    ...mockItems[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  return mockItems[index];
};

/**
 * Delete an item
 */
export const deleteItem = async (id: number): Promise<boolean> => {
  await delay(300);
  
  const index = mockItems.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  mockItems.splice(index, 1);
  return true;
};
