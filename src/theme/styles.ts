/**
 * Global Reusable StyleSheet Styles
 * Contains common styles that can be reused across the app
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from './theme';

// ============================================
// LAYOUT STYLES
// ============================================

export const layout = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  containerPadded: {
    flex: 1,
    padding: spacing.base,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Flex utilities
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowEvenly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },

  // Flex grow/shrink
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },

  // Width/Height
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
});

// ============================================
// SPACING UTILITY STYLES
// ============================================

export const margins = StyleSheet.create({
  // Margin all
  m0: { margin: spacing.none },
  mXs: { margin: spacing.xs },
  mSm: { margin: spacing.sm },
  mMd: { margin: spacing.md },
  mBase: { margin: spacing.base },
  mLg: { margin: spacing.lg },
  mXl: { margin: spacing.xl },
  m2xl: { margin: spacing['2xl'] },

  // Margin horizontal
  mxXs: { marginHorizontal: spacing.xs },
  mxSm: { marginHorizontal: spacing.sm },
  mxMd: { marginHorizontal: spacing.md },
  mxBase: { marginHorizontal: spacing.base },
  mxLg: { marginHorizontal: spacing.lg },
  mxXl: { marginHorizontal: spacing.xl },

  // Margin vertical
  myXs: { marginVertical: spacing.xs },
  mySm: { marginVertical: spacing.sm },
  myMd: { marginVertical: spacing.md },
  myBase: { marginVertical: spacing.base },
  myLg: { marginVertical: spacing.lg },
  myXl: { marginVertical: spacing.xl },

  // Margin top
  mtXs: { marginTop: spacing.xs },
  mtSm: { marginTop: spacing.sm },
  mtMd: { marginTop: spacing.md },
  mtBase: { marginTop: spacing.base },
  mtLg: { marginTop: spacing.lg },
  mtXl: { marginTop: spacing.xl },
  mt2xl: { marginTop: spacing['2xl'] },

  // Margin bottom
  mbXs: { marginBottom: spacing.xs },
  mbSm: { marginBottom: spacing.sm },
  mbMd: { marginBottom: spacing.md },
  mbBase: { marginBottom: spacing.base },
  mbLg: { marginBottom: spacing.lg },
  mbXl: { marginBottom: spacing.xl },
  mb2xl: { marginBottom: spacing['2xl'] },

  // Margin left
  mlXs: { marginLeft: spacing.xs },
  mlSm: { marginLeft: spacing.sm },
  mlMd: { marginLeft: spacing.md },
  mlBase: { marginLeft: spacing.base },
  mlLg: { marginLeft: spacing.lg },

  // Margin right
  mrXs: { marginRight: spacing.xs },
  mrSm: { marginRight: spacing.sm },
  mrMd: { marginRight: spacing.md },
  mrBase: { marginRight: spacing.base },
  mrLg: { marginRight: spacing.lg },
});

export const paddings = StyleSheet.create({
  // Padding all
  p0: { padding: spacing.none },
  pXs: { padding: spacing.xs },
  pSm: { padding: spacing.sm },
  pMd: { padding: spacing.md },
  pBase: { padding: spacing.base },
  pLg: { padding: spacing.lg },
  pXl: { padding: spacing.xl },
  p2xl: { padding: spacing['2xl'] },

  // Padding horizontal
  pxXs: { paddingHorizontal: spacing.xs },
  pxSm: { paddingHorizontal: spacing.sm },
  pxMd: { paddingHorizontal: spacing.md },
  pxBase: { paddingHorizontal: spacing.base },
  pxLg: { paddingHorizontal: spacing.lg },
  pxXl: { paddingHorizontal: spacing.xl },

  // Padding vertical
  pyXs: { paddingVertical: spacing.xs },
  pySm: { paddingVertical: spacing.sm },
  pyMd: { paddingVertical: spacing.md },
  pyBase: { paddingVertical: spacing.base },
  pyLg: { paddingVertical: spacing.lg },
  pyXl: { paddingVertical: spacing.xl },

  // Padding top
  ptXs: { paddingTop: spacing.xs },
  ptSm: { paddingTop: spacing.sm },
  ptMd: { paddingTop: spacing.md },
  ptBase: { paddingTop: spacing.base },
  ptLg: { paddingTop: spacing.lg },
  ptXl: { paddingTop: spacing.xl },

  // Padding bottom
  pbXs: { paddingBottom: spacing.xs },
  pbSm: { paddingBottom: spacing.sm },
  pbMd: { paddingBottom: spacing.md },
  pbBase: { paddingBottom: spacing.base },
  pbLg: { paddingBottom: spacing.lg },
  pbXl: { paddingBottom: spacing.xl },

  // Padding left
  plXs: { paddingLeft: spacing.xs },
  plSm: { paddingLeft: spacing.sm },
  plMd: { paddingLeft: spacing.md },
  plBase: { paddingLeft: spacing.base },

  // Padding right
  prXs: { paddingRight: spacing.xs },
  prSm: { paddingRight: spacing.sm },
  prMd: { paddingRight: spacing.md },
  prBase: { paddingRight: spacing.base },
});

// ============================================
// TEXT STYLES
// ============================================

export const textStyles = StyleSheet.create({
  // Headings
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  h4: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },
  h5: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  h6: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },

  // Body text
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  bodyLarge: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },

  // Caption/Label
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },

  // Text alignment
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },

  // Text colors
  textPrimary: {
    color: colors.primary,
  },
  textSecondary: {
    color: colors.textSecondary,
  },
  textWhite: {
    color: colors.white,
  },
  textSuccess: {
    color: colors.success,
  },
  textError: {
    color: colors.error,
  },
  textWarning: {
    color: colors.warning,
  },

  // Text decorations
  underline: {
    textDecorationLine: 'underline',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});

// ============================================
// BUTTON STYLES
// ============================================

export const buttonStyles = StyleSheet.create({
  // Base button
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  // Button variants
  primary: {
    backgroundColor: colors.primary,
    ...shadows.sm,
  },
  secondary: {
    backgroundColor: colors.secondary,
    ...shadows.sm,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  danger: {
    backgroundColor: colors.error,
    ...shadows.sm,
  },
  success: {
    backgroundColor: colors.success,
    ...shadows.sm,
  },

  // Button sizes
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  large: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
  },

  // Button states
  disabled: {
    backgroundColor: colors.gray[300],
    opacity: 0.6,
  },

  // Button text
  text: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  textFilled: {
    color: colors.white,
  },
  textOutline: {
    color: colors.primary,
  },
  textGhost: {
    color: colors.primary,
  },
  textSmall: {
    fontSize: typography.fontSize.sm,
  },
  textMedium: {
    fontSize: typography.fontSize.md,
  },
  textLarge: {
    fontSize: typography.fontSize.lg,
  },
  textWithLeftIcon: {
    marginLeft: spacing.xs,
  },
  textWithRightIcon: {
    marginRight: spacing.xs,
  },

  // Full width
  fullWidth: {
    width: '100%',
  },
});

// ============================================
// INPUT STYLES
// ============================================

export const inputStyles = StyleSheet.create({
  // Container
  container: {
    marginBottom: spacing.base,
  },

  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },

  // Label
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  required: {
    color: colors.error,
  },

  // Input base
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text,
    backgroundColor: colors.white,
  },

  // Input states
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    backgroundColor: colors.gray[100],
    color: colors.textDisabled,
  },

  // Multiline
  multiline: {
    height: 100,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },

  // Helper/Error text
  helperText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },

  // With icon
  inputWithIcon: {
    paddingLeft: spacing['2xl'] + spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: spacing['2xl'] + spacing.sm,
  },
  iconContainer: {
    position: 'absolute',
    left: spacing.base,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  rightIconContainer: {
    position: 'absolute',
    right: spacing.base,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

// ============================================
// CARD STYLES
// ============================================

export const cardStyles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    ...shadows.md,
  },
  flat: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    ...shadows.lg,
  },
  Height:{
    height: 160,
  }
});

// ============================================
// DIVIDER STYLES
// ============================================

export const dividerStyles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
  },
  vertical: {
    width: 1,
    backgroundColor: colors.border,
    height: '100%',
  },
});

// ============================================
// IMAGE STYLES
// ============================================

export const imageStyles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
  },
  avatarMedium: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
  },
  cover: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    backgroundColor: colors.gray[200],
  },
});

// ============================================
// BORDER STYLES
// ============================================

export const borderStyles = StyleSheet.create({
  rounded: {
    borderRadius: borderRadius.md,
  },
  roundedLg: {
    borderRadius: borderRadius.lg,
  },
  roundedFull: {
    borderRadius: borderRadius.full,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});

// ============================================
// COMBINED COMMON PATTERNS
// ============================================

export const common = StyleSheet.create({
  // Screen container with padding
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.base,
  },
  // Scroll view content
  scrollContent: {
    flexGrow: 1,
    padding: spacing.base,
  },
  // List item
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  // Section header
  sectionHeader: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.backgroundSecondary,
  },
  // Badge
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
  },
  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
});

// ============================================
// AVATAR & HEADER STYLES
// ============================================

export const avatarStyles = StyleSheet.create({
  initialsContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  topPadding: {
    paddingTop: spacing.lg,
  },
});

// ============================================
// CONTENT CONTAINER STYLES
// ============================================

export const contentStyles = StyleSheet.create({
  emptyContainer: {
    paddingVertical: spacing['4xl'],
  },
  listContent: {
    flexGrow: 1,
  },
});

// Export all styles as a single object for convenience
export const styles = {
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
  avatarStyles,
  headerStyles,
  contentStyles,
  common,
};

export default styles;
