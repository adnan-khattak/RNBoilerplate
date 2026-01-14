/**
 * Language Storage Service
 * 
 * Handles persistent storage of user's language preference using MMKV
 * This ensures the selected language is remembered across app sessions
 */

import { createMMKV } from 'react-native-mmkv';

// Create a dedicated storage for language preferences
const languageStorage = createMMKV({ id: 'language-storage' });

// Storage key
const LANGUAGE_KEY = 'user_language_preference';

export const languageStorageService = {
  /**
   * Get the saved language preference
   * Returns null if no preference has been saved yet
   */
  getSavedLanguage: async (): Promise<string | null> => {
    try {
      const saved = languageStorage.getString(LANGUAGE_KEY);
      return saved || null;
    } catch (error) {
      console.error('Error reading saved language:', error);
      return null;
    }
  },

  /**
   * Save the user's language preference
   * @param language - Language code (e.g., 'en', 'fr')
   */
  saveLanguage: async (language: string): Promise<void> => {
    try {
      languageStorage.set(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error saving language preference:', error);
      throw error;
    }
  },

  /**
   * Clear the saved language preference
   * Useful when user resets app or logs out
   */
  clearLanguagePreference: async (): Promise<void> => {
    try {
      languageStorage.delete(LANGUAGE_KEY);
    } catch (error) {
      console.error('Error clearing language preference:', error);
      throw error;
    }
  },
};
