/**
 * Auth Storage Service
 * Handles persisting auth data (token, user) to device storage
 * 
 * CUSTOMIZATION: 
 * - Install @react-native-async-storage/async-storage for production
 * - Or use react-native-keychain / expo-secure-store for secure token storage
 * 
 * Current implementation uses a simple in-memory store for demo purposes.
 * Replace with AsyncStorage for persistence across app restarts.
 */

import { User } from '../state/authTypes';
import { STORAGE_KEYS } from '../config/constants';

// =============================================================================
// IN-MEMORY STORAGE (Demo/Development)
// Replace this section with AsyncStorage for production
// =============================================================================

let memoryStore: { [key: string]: string } = {};

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    return memoryStore[key] || null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    memoryStore[key] = value;
  },
  removeItem: async (key: string): Promise<void> => {
    delete memoryStore[key];
  },
  clear: async (): Promise<void> => {
    memoryStore = {};
  },
};

// =============================================================================
// UNCOMMENT BELOW FOR ASYNCSTORAGE (Production)
// First install: npm install @react-native-async-storage/async-storage
// =============================================================================
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const storage = AsyncStorage;

// =============================================================================
// AUTH STORAGE API
// =============================================================================

export const authStorage = {
  /**
   * Get stored authentication data
   */
  getAuth: async (): Promise<{ user: User; token: string } | null> => {
    try {
      const [userJson, token] = await Promise.all([
        storage.getItem(STORAGE_KEYS.USER_PREFERENCES),
        storage.getItem(STORAGE_KEYS.AUTH_TOKEN),
      ]);

      if (userJson && token) {
        const user = JSON.parse(userJson) as User;
        return { user, token };
      }
      return null;
    } catch (error) {
      console.error('Error reading auth from storage:', error);
      return null;
    }
  },

  /**
   * Store authentication data
   */
  setAuth: async (user: User, token: string): Promise<void> => {
    try {
      await Promise.all([
        storage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(user)),
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
      ]);
    } catch (error) {
      console.error('Error saving auth to storage:', error);
      throw error;
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuth: async (): Promise<void> => {
    try {
      await Promise.all([
        storage.removeItem(STORAGE_KEYS.USER_PREFERENCES),
        storage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      ]);
    } catch (error) {
      console.error('Error clearing auth from storage:', error);
      throw error;
    }
  },

  /**
   * Get just the auth token
   */
  getToken: async (): Promise<string | null> => {
    try {
      return await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error reading token from storage:', error);
      return null;
    }
  },
};
