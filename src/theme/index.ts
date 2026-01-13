/**
 * Theme exports - Single entry point for all theme related imports
 */

// Theme Context (NEW - for dark/light mode)
export { ThemeProvider, useTheme } from './ThemeContext';
export type { ColorScheme, ThemeColors } from './colors.theme';
export { lightColors, darkColors } from './colors.theme';

// Design tokens (legacy - still available)
export {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  zIndex,
  animation,
  breakpoints,
  theme,
  default as themeDefault,
} from './theme';

export type { Theme, Colors, Spacing, Typography } from './theme';

// Reusable styles
export {
  layout,
  margins,
  paddings,
  textStyles,
  buttonStyles,
  inputStyles,
  cardStyles,
  dividerStyles,
  imageStyles,
  borderStyles,
  common,
  styles,
  default as stylesDefault,
} from './styles';
