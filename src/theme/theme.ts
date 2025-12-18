/**
 * Design Tokens - Centralized theme configuration
 * Contains all design constants: colors, spacing, typography, etc.
 */

// Color Palette
export const colors = {
  // Primary colors
  primary: '#007AFF',
  primaryLight: '#4DA2FF',
  primaryDark: '#0056B3',

  // Secondary colors
  secondary: '#5856D6',
  secondaryLight: '#7A79E0',
  secondaryDark: '#3F3E9E',

  // Accent colors
  accent: '#FF9500',
  accentLight: '#FFB340',
  accentDark: '#CC7700',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Semantic colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  surface: '#FFFFFF',

  // Text colors
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',

  // Border colors
  border: '#E0E0E0',
  borderLight: '#EEEEEE',
  borderDark: '#BDBDBD',

  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

// Spacing Scale (based on 4px grid)
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
} as const;

// Typography
export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;

// Border Radius
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// Shadows
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Z-Index
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
  toast: 60,
} as const;

// Animation durations
export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
} as const;

// Breakpoints (for responsive design)
export const breakpoints = {
  sm: 320,
  md: 375,
  lg: 428,
  xl: 768,
  '2xl': 1024,
} as const;

// Default theme object
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  zIndex,
  animation,
  breakpoints,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;

export default theme;
