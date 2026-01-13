/**
 * Theme Colors - Light and Dark Mode
 * Defines color palettes for both light and dark themes
 */

export type ColorScheme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Secondary colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // Accent colors
  accent: string;
  accentLight: string;
  accentDark: string;

  // Semantic colors
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  error: string;
  errorLight: string;
  errorDark: string;
  info: string;
  infoLight: string;
  infoDark: string;

  // Neutral colors
  white: string;
  black: string;

  // Gray scale
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;

  // Background colors
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceElevated: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  textLink: string;

  // Border colors
  border: string;
  borderLight: string;
  borderDark: string;
  borderFocused: string;

  // Input colors
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;

  // Card colors
  card: string;
  cardBorder: string;

  // Navigation colors
  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;

  // Other
  transparent: string;
  overlay: string;
  shadow: string;
}

/**
 * Light Theme Colors
 */
export const lightColors: ThemeColors = {
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

  // Semantic colors
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

  // Neutral colors
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

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // Text colors
  text: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',
  textLink: '#007AFF',

  // Border colors
  border: '#E0E0E0',
  borderLight: '#EEEEEE',
  borderDark: '#BDBDBD',
  borderFocused: '#007AFF',

  // Input colors
  inputBackground: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputPlaceholder: '#BDBDBD',

  // Card colors
  card: '#FFFFFF',
  cardBorder: '#E0E0E0',

  // Navigation colors
  tabBar: '#FFFFFF',
  tabBarActive: '#007AFF',
  tabBarInactive: '#9E9E9E',

  // Other
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: '#000000',
};

/**
 * Dark Theme Colors
 */
export const darkColors: ThemeColors = {
  // Primary colors
  primary: '#0A84FF',
  primaryLight: '#409CFF',
  primaryDark: '#0066CC',

  // Secondary colors
  secondary: '#5E5CE6',
  secondaryLight: '#7D7AFF',
  secondaryDark: '#4A48B8',

  // Accent colors
  accent: '#FF9F0A',
  accentLight: '#FFB340',
  accentDark: '#CC7F00',

  // Semantic colors
  success: '#32D74B',
  successLight: '#A8E6CF',
  successDark: '#28A745',
  warning: '#FF9F0A',
  warningLight: '#FFD60A',
  warningDark: '#CC7F00',
  error: '#FF453A',
  errorLight: '#FF6961',
  errorDark: '#CC3630',
  info: '#64D2FF',
  infoLight: '#A0E7FF',
  infoDark: '#409CFF',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',

  // Gray scale (inverted for dark theme)
  gray50: '#1C1C1E',
  gray100: '#2C2C2E',
  gray200: '#3A3A3C',
  gray300: '#48484A',
  gray400: '#636366',
  gray500: '#8E8E93',
  gray600: '#AEAEB2',
  gray700: '#C7C7CC',
  gray800: '#D1D1D6',
  gray900: '#E5E5EA',

  // Background colors
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  surface: '#1C1C1E',
  surfaceElevated: '#2C2C2E',

  // Text colors
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  textTertiary: '#8E8E93',
  textDisabled: '#636366',
  textInverse: '#000000',
  textLink: '#0A84FF',

  // Border colors
  border: '#38383A',
  borderLight: '#2C2C2E',
  borderDark: '#48484A',
  borderFocused: '#0A84FF',

  // Input colors
  inputBackground: '#1C1C1E',
  inputBorder: '#38383A',
  inputPlaceholder: '#8E8E93',

  // Card colors
  card: '#1C1C1E',
  cardBorder: '#38383A',

  // Navigation colors
  tabBar: '#1C1C1E',
  tabBarActive: '#0A84FF',
  tabBarInactive: '#8E8E93',

  // Other
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: '#000000',
};
