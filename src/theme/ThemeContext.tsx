/**
 * Theme Context
 * Manages theme state with light/dark mode support
 * - Uses Appearance API for system theme detection
 * - Persists theme preference with MMKV
 * - Provides theme colors and toggle functionality
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import {
  lightColors,
  darkColors,
  type ThemeColors,
  type ColorScheme,
} from './colors.theme';
import { themeStorage } from './themeStorage';

interface ThemeContextType {
  /** Current color scheme: 'light', 'dark', or 'system' */
  colorScheme: ColorScheme;
  /** Current theme colors based on active mode */
  colors: ThemeColors;
  /** Whether dark mode is currently active */
  isDark: boolean;
  /** Set a specific theme */
  setTheme: (scheme: ColorScheme) => void;
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Get system color scheme
  const systemColorScheme = Appearance.getColorScheme();

  // Initialize theme from storage or system default
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const savedTheme = themeStorage.getTheme();
    return savedTheme || 'system';
  });

  // Determine actual theme (resolve 'system' to 'light' or 'dark')
  const actualTheme = useMemo<'light' | 'dark'>(() => {
    if (colorScheme === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return colorScheme;
  }, [colorScheme, systemColorScheme]);

  // Get current theme colors
  const colors = useMemo<ThemeColors>(() => {
    return actualTheme === 'dark' ? darkColors : lightColors;
  }, [actualTheme]);

  // Check if dark mode is active
  const isDark = actualTheme === 'dark';

  /**
   * Set theme and persist to storage
   */
  const setTheme = useCallback((scheme: ColorScheme) => {
    setColorScheme(scheme);
    themeStorage.setTheme(scheme);
  }, []);

  /**
   * Toggle between light and dark mode
   * If current scheme is 'system', switches to opposite of system theme
   */
  const toggleTheme = useCallback(() => {
    const newTheme = actualTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [actualTheme, setTheme]);

  /**
   * Listen to system theme changes
   * Only affects UI if colorScheme is set to 'system'
   */
  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme: _newScheme }: { colorScheme: ColorSchemeName }) => {
        // Force re-render to update actualTheme
        setColorScheme(prev => prev);
      }
    );

    return () => subscription.remove();
  }, []);

  const value = useMemo(
    () => ({
      colorScheme,
      colors,
      isDark,
      setTheme,
      toggleTheme,
    }),
    [colorScheme, colors, isDark, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
