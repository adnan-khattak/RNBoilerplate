// src/services/api.ts

export const API_PREFIX = 'https://6943ce467dd335f4c35e2feb.mockapi.io/api/v1/'; 

export interface Item {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

// Get all items
export const getItems = async (): Promise<Item[]> => {
  const res = await fetch(`${API_PREFIX}/items`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};

// Get single item by id
export const getItem = async (id: string): Promise<Item> => {
  const res = await fetch(`${API_PREFIX}/items/${id}`);
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
};

// Create a new item
export const createItem = async (data: Omit<Item, 'id' | 'createdAt'>): Promise<Item> => {
  const res = await fetch(`${API_PREFIX}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
};

// Update existing item
export const updateItem = async (id: string, data: Partial<Omit<Item, 'id' | 'createdAt'>>): Promise<Item> => {
  const res = await fetch(`${API_PREFIX}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
};

// Delete item
export const deleteItem = async (id: string): Promise<void> => {
  const res = await fetch(`${API_PREFIX}/items/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
};
