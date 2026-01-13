/**
 * useStatusBar Hook
 * 
 * Automatically sets StatusBar style based on current theme
 * Import and use in your root component or screens
 * 
 * @example
 * ```tsx
 * import { useStatusBar } from '@utils/useStatusBar';
 * 
 * function MyScreen() {
 *   useStatusBar(); // Automatically handles light/dark mode
 *   return <View>...</View>;
 * }
 * ```
 */

import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@theme';

export function useStatusBar() {
  const { isDark, colors } = useTheme();

  useEffect(() => {
    // Set status bar style based on theme
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
    
    // Set background color (Android only)
    StatusBar.setBackgroundColor(colors.background, true);
  }, [isDark, colors.background]);
}

export default useStatusBar;
