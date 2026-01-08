/**
 * Offline Cache Service
 * Handles caching and retrieval of data using MMKV for offline-first support
 */

import { createMMKV } from 'react-native-mmkv';
import { Item } from './api';

const cacheStorage = createMMKV({ id: 'offline-cache' });

const CACHE_KEYS = {
  ITEMS: '@cache_items',
  ITEM: (id: string) => `@cache_item_${id}`,
  TIMESTAMP: (key: string) => `${key}_timestamp`,
} as const;

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

/**
 * Save data to cache
 */
export const saveToCache = <T>(key: string, data: T): void => {
  try {
    const cacheData: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };
    cacheStorage.set(key, JSON.stringify(cacheData));
    console.log(`📦 Cached: ${key}`);
  } catch (error) {
    console.error(`❌ Error saving to cache (${key}):`, error);
  }
};

/**
 * Retrieve data from cache
 * Returns null if cache is expired or doesn't exist
 */
export const getFromCache = <T>(key: string): T | null => {
  try {
    const cached = cacheStorage.getString(key);
    if (!cached) return null;

    const cacheData: CachedData<T> = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;

    if (isExpired) {
      console.log(`⏰ Cache expired: ${key}`);
      return null;
    }

    console.log(`✅ Using cached: ${key}`);
    return cacheData.data;
  } catch (error) {
    console.error(`❌ Error reading from cache (${key}):`, error);
    return null;
  }
};

/**
 * Check if cache exists and is valid
 */
export const isCacheValid = (key: string): boolean => {
  try {
    const cached = cacheStorage.getString(key);
    if (!cached) return false;

    const cacheData = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;
    return !isExpired;
  } catch {
    return false;
  }
};

/**
 * Clear specific cache
 */
export const clearCache = (key: string): void => {
  try {
    cacheStorage.remove(key);
    console.log(`🗑️ Cleared cache: ${key}`);
  } catch (error) {
    console.error(`❌ Error clearing cache (${key}):`, error);
  }
};

/**
 * Clear all offline cache
 */
export const clearAllCache = (): void => {
  try {
    const allKeys = cacheStorage.getAllKeys();
    allKeys.forEach(key => {
      if (key.startsWith('@cache_')) {
        cacheStorage.remove(key);
      }
    });
    console.log('🗑️ Cleared all offline cache');
  } catch (error) {
    console.error('❌ Error clearing all cache:', error);
  }
};

/**
 * Items cache operations
 */
export const itemsCacheService = {
  save: (items: Item[]) => saveToCache(CACHE_KEYS.ITEMS, items),
  get: () => getFromCache<Item[]>(CACHE_KEYS.ITEMS),
  isValid: () => isCacheValid(CACHE_KEYS.ITEMS),
  clear: () => clearCache(CACHE_KEYS.ITEMS),
};

/**
 * Single item cache operations
 */
export const itemCacheService = {
  save: (id: string, item: Item) => saveToCache(CACHE_KEYS.ITEM(id), item),
  get: (id: string) => getFromCache<Item>(CACHE_KEYS.ITEM(id)),
  isValid: (id: string) => isCacheValid(CACHE_KEYS.ITEM(id)),
  clear: (id: string) => clearCache(CACHE_KEYS.ITEM(id)),
};
