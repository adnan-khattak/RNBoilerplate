/**
 * i18n Configuration
 * 
 * Production-ready i18n setup with:
 * - Device language auto-detection
 * - Fallback language handling
 * - React-i18next integration
 */

import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '../../locales/en.json';
import fr from '../../locales/fr.json';
import ar from '../../locales/ar.json';

// Language resources
const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
};

// Get device language on first launch
export const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  
  if (Array.isArray(locales) && locales.length > 0) {
    const deviceLang = locales[0].languageCode;
    
    // Check if we support this language, otherwise use English
    if (Object.keys(resources).includes(deviceLang)) {
      return deviceLang;
    }
  }
  
  return 'en'; // Default fallback
};

// RTL languages
const RTL_LANGUAGES = ['ar'];

/**
 * Check if language is RTL
 */
export const isRTL = (language: string): boolean => {
  return RTL_LANGUAGES.includes(language);
};

// i18next configuration
const i18nConfig: InitOptions = {
  compatibilityJSON: 'v4', // Required for JSON imports
  resources,
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr', 'ar'],
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // React already handles XSS
  },
  // Production settings
  debug: false, // Set to true for debugging
  react: {
    useSuspense: false, // Important for React Native
    transEmptyNodeValue: '',
  },
};

/**
 * Initialize i18next
 * Should be called once during app startup before rendering
 */
export const initializeI18n = async (savedLanguage?: string): Promise<void> => {
  // Use saved language or auto-detect device language
  const languageToUse = savedLanguage || getDeviceLanguage();
  
  await i18next
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      lng: languageToUse,
    });
};

/**
 * Change language at runtime
 * @param language - Language code (e.g., 'en', 'fr')
 */
export const changeLanguage = async (language: string): Promise<void> => {
  try {
    await i18next.changeLanguage(language);
  } catch (error) {
    console.error(`Error changing language to ${language}:`, error);
    throw error;
  }
};

/**
 * Get current language
 */
export const getCurrentLanguage = (): string => {
  return i18next.language || 'en';
};

/**
 * Get all available languages
 */
export const getAvailableLanguages = (): string[] => {
  return Object.keys(resources);
};

export default i18next;
