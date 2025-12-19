/**
 * Reusable Text Component
 * Provides consistent typography across the app
 * Usage: <Text variant="h1">Hello World</Text>
 */

import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextStyle,
  StyleProp,
  TextProps as RNTextProps,
} from 'react-native';
import { colors, typography } from '@theme';

// Text variants
type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodyLarge'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'button';

// Text colors
type TextColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'white'
  | 'muted';

// Text alignment
type TextAlign = 'left' | 'center' | 'right';

// Font weight
type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  weight?: FontWeight;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  uppercase?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'default',
  align,
  weight,
  italic = false,
  underline = false,
  strikethrough = false,
  uppercase = false,
  style,
  children,
  ...textProps
}) => {
  // Get variant styles
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'h5':
        return styles.h5;
      case 'h6':
        return styles.h6;
      case 'body':
        return styles.body;
      case 'bodyLarge':
        return styles.bodyLarge;
      case 'bodySmall':
        return styles.bodySmall;
      case 'caption':
        return styles.caption;
      case 'label':
        return styles.label;
      case 'button':
        return styles.button;
      default:
        return styles.body;
    }
  };

  // Get color styles
  const getColorStyle = (): TextStyle => {
    switch (color) {
      case 'default':
        return { color: colors.text };
      case 'primary':
        return { color: colors.primary };
      case 'secondary':
        return { color: colors.secondary };
      case 'success':
        return { color: colors.success };
      case 'error':
        return { color: colors.error };
      case 'warning':
        return { color: colors.warning };
      case 'white':
        return { color: colors.white };
      case 'muted':
        return { color: colors.textSecondary };
      default:
        return { color: colors.text };
    }
  };

  // Get font weight
  const getWeightStyle = (): TextStyle => {
    if (!weight) return {};
    return { fontWeight: typography.fontWeight[weight] };
  };

  // Build combined styles
  const combinedStyles: TextStyle[] = [
    getVariantStyle(),
    getColorStyle(),
    getWeightStyle(),
    align && { textAlign: align },
    italic && { fontStyle: 'italic' },
    underline && { textDecorationLine: 'underline' },
    strikethrough && { textDecorationLine: 'line-through' },
    uppercase && { textTransform: 'uppercase' },
  ].filter(Boolean) as TextStyle[];

  return (
    <RNText style={[...combinedStyles, style]} {...textProps}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  h4: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },
  h5: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  h6: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  bodyLarge: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  button: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: typography.fontSize.base * typography.lineHeight.tight,
  },
});

export default Text;
