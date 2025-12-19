/**
 * Global Color Palette
 * Centralized colors for the entire app
 * 
 * CUSTOMIZATION:
 * - Update these colors to match your brand
 * - All components and screens import colors from here
 * 
 * Usage:
 *   import { COLORS } from '@config/colors';
 *   style={{ backgroundColor: COLORS.primary }}
 */

export const COLORS = {
  // ============================================
  // BRAND COLORS - Customize these for your app
  // ============================================
  
  // Primary - Main brand color
  primary: '#007AFF',
  primaryLight: '#4DA2FF',
  primaryDark: '#0056B3',

  // Secondary - Supporting brand color
  secondary: '#5856D6',
  secondaryLight: '#7A79E0',
  secondaryDark: '#3F3E9E',

  // Accent - Highlights and CTAs
  accent: '#FF9500',
  accentLight: '#FFB340',
  accentDark: '#CC7700',

  // ============================================
  // SEMANTIC COLORS
  // ============================================
  
  success: '#34C759',
  successLight: '#A8E6CF',
  successDark: '#248A3D',
  
  warning: '#FF9500',
  warningLight: '#FFD60A',
  warningDark: '#CC7700',
  
  error: '#FF3B30',
  errorLight: '#FF6961',
  errorDark: '#D70015',
  
  info: '#5AC8FA',
  infoLight: '#A0E7FF',
  infoDark: '#0A84FF',

  // ============================================
  // NEUTRAL COLORS
  // ============================================
  
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray scale
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // ============================================
  // UI COLORS - Used throughout the app
  // ============================================
  
  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // Text
  text: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',
  textLink: '#007AFF',

  // Borders
  border: '#E0E0E0',
  borderLight: '#EEEEEE',
  borderDark: '#BDBDBD',
  borderFocused: '#007AFF',

  // Input
  inputBackground: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputPlaceholder: '#BDBDBD',
  inputDisabled: '#F5F5F5',

  // Button
  buttonPrimary: '#007AFF',
  buttonSecondary: '#5856D6',
  buttonDanger: '#FF3B30',
  buttonDisabled: '#BDBDBD',

  // Card
  cardBackground: '#FFFFFF',
  cardBorder: '#E0E0E0',
  cardShadow: '#000000',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',

  // Misc
  transparent: 'transparent',
  divider: '#E0E0E0',
  skeleton: '#E0E0E0',
  ripple: 'rgba(0, 0, 0, 0.1)',

} as const;

// ============================================
// DARK THEME COLORS (Optional - for dark mode)
// ============================================

export const COLORS_DARK = {
  ...COLORS,
  
  // Override for dark mode
  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  surface: '#1E1E1E',
  surfaceElevated: '#2C2C2C',
  
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textTertiary: '#808080',
  textDisabled: '#666666',
  
  border: '#333333',
  borderLight: '#2C2C2C',
  borderDark: '#444444',
  
  inputBackground: '#1E1E1E',
  inputBorder: '#333333',
  inputDisabled: '#2C2C2C',
  
  cardBackground: '#1E1E1E',
  cardBorder: '#333333',
  
  divider: '#333333',
} as const;

// Type exports
export type Colors = typeof COLORS;
export type ColorKeys = keyof typeof COLORS;
