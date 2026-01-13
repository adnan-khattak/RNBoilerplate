/**
 * useThemedStyles Hook
 * 
 * A utility hook for creating dynamic styles that respond to theme changes.
 * This is useful when you need to create StyleSheet styles that depend on theme colors.
 * 
 * @example
 * ```tsx
 * import { useThemedStyles } from '@utils/useThemedStyles';
 * 
 * function MyComponent() {
 *   const styles = useThemedStyles(createStyles);
 *   return <View style={styles.container} />;
 * }
 * 
 * const createStyles = (colors: ThemeColors) => StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.background,
 *     borderColor: colors.border,
 *   },
 * });
 * ```
 */

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, type ThemeColors } from '@theme';

type StylesCreator<T> = (colors: ThemeColors, isDark: boolean) => T;

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  createStyles: StylesCreator<T>
): T {
  const { colors, isDark } = useTheme();

  return useMemo(() => createStyles(colors, isDark), [colors, isDark, createStyles]);
}

export default useThemedStyles;
