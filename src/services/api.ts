// src/services/api.ts

import { itemsCacheService, itemCacheService } from './offlineCache';

export const API_PREFIX = 'https://6943ce467dd335f4c35e2feb.mockapi.io/api/v1/'; 

export interface Item {
  id: string;
  name: string;
  description?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Get all items - with offline-first support
export const getItems = async (): Promise<Item[]> => {
  try {
    const res = await fetch(`${API_PREFIX}/items`);
    if (!res.ok) throw new Error('Failed to fetch items');
    const data = await res.json();
    
    // Cache successful response
    itemsCacheService.save(data);
    console.log('📡 Items fetched from API');
    return data;
  } catch (error) {
    // Fall back to cache if API fails
    console.warn('⚠️ API failed, checking cache...');
    const cached = itemsCacheService.get();
    if (cached) {
      console.log('💾 Using cached items');
      return cached;
    }
    throw error;
  }
};

// Get single item by id - with offline-first support
export const getItem = async (id: string): Promise<Item> => {
  try {
    const res = await fetch(`${API_PREFIX}/items/${id}`);
    if (!res.ok) throw new Error('Failed to fetch item');
    const data = await res.json();
    
    // Cache successful response
    itemCacheService.save(id, data);
    console.log(`📡 Item ${id} fetched from API`);
    return data;
  } catch (error) {
    // Fall back to cache if API fails
    console.warn(`⚠️ API failed for item ${id}, checking cache...`);
    const cached = itemCacheService.get(id);
    if (cached) {
      console.log(`💾 Using cached item ${id}`);
      return cached;
    }
    throw error;
  }
};

// Create a new item
export const createItem = async (
  data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Item> => {
  const res = await fetch(`${API_PREFIX}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
};

// Update existing item
export const updateItem = async (
  id: string,
  data: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Item> => {
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
