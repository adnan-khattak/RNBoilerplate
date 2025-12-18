/**
 * Theme exports - Single entry point for all theme related imports
 */

// Design tokens
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
