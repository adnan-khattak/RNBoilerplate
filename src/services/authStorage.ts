import { createMMKV } from 'react-native-mmkv';
import { User } from '@state/authTypes';
import { STORAGE_KEYS } from '@config';

const storage = createMMKV({ id: 'auth-storage' });

export const authStorage = {
  getAuth: async (): Promise<{ user: User; token: string } | null> => {
    try {
      const userJson = storage.getString(STORAGE_KEYS.USER_PREFERENCES);
      const token = storage.getString(STORAGE_KEYS.AUTH_TOKEN);
      if (userJson && token) {
        return { user: JSON.parse(userJson), token };
      }
      return null;
    } catch (error) {
      console.error('Error reading auth from storage:', error);
      return null;
    }
  },

  setAuth: async (user: User, token: string) => {
    try {
      storage.set(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(user));
      storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving auth:', error);
      throw error;
    }
  },

  clearAuth: async () => {
    try {
      storage.remove(STORAGE_KEYS.USER_PREFERENCES);
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error clearing auth:', error);
      throw error;
    }
  },

  getToken: async () => storage.getString(STORAGE_KEYS.AUTH_TOKEN) || null,
};
