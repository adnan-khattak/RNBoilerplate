/**
 * Language Context & Provider
 * 
 * Manages global language state and provides utilities for:
 * - Getting current language
 * - Changing language
 * - Language initialization
 * 
 * Must be placed after i18n initialization
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initializeI18n, changeLanguage, getCurrentLanguage, getAvailableLanguages } from '@services/i18n/i18nConfig';
import { languageStorageService } from '@services/languageStorage';

interface LanguageContextType {
  language: string;
  availableLanguages: string[];
  changeLanguage: (language: string) => Promise<void>;
  isInitialized: boolean;
  error: Error | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: string;
}

/**
 * Language Provider Component
 * 
 * Usage:
 * <LanguageProvider>
 *   <YourApp />
 * </LanguageProvider>
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage }) => {
  const [language, setLanguage] = useState<string>('en');
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Initialize i18n on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Try to get saved language preference
        let languageToUse = initialLanguage || await languageStorageService.getSavedLanguage();
        
        // Initialize i18n with the selected language
        await initializeI18n(languageToUse);
        
        // Get the actual language that was set
        const currentLang = getCurrentLanguage();
        setLanguage(currentLang);
        setError(null);
        setIsInitialized(true);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize language');
        console.error('Language initialization error:', error);
        setError(error);
        setIsInitialized(true); // Mark as initialized even on error
      }
    };

    initializeLanguage();
  }, [initialLanguage]);

  // Handle language change
  const handleChangeLanguage = useCallback(async (newLanguage: string) => {
    try {
      // Validate language
      const available = getAvailableLanguages();
      if (!available.includes(newLanguage)) {
        throw new Error(`Language '${newLanguage}' is not available`);
      }

      // Change language in i18next
      await changeLanguage(newLanguage);
      
      // Save preference to storage
      await languageStorageService.saveLanguage(newLanguage);
      
      // Update state
      setLanguage(newLanguage);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to change language');
      console.error('Language change error:', error);
      setError(error);
      throw error;
    }
  }, []);

  const value: LanguageContextType = {
    language,
    availableLanguages: getAvailableLanguages(),
    changeLanguage: handleChangeLanguage,
    isInitialized,
    error,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to use language context
 * Must be used inside LanguageProvider
 * 
 * Usage:
 * const { language, changeLanguage } = useLanguageContext();
 */
export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used inside LanguageProvider');
  }
  return context;
};
