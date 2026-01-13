/**
 * Reusable Text Component
 * Provides consistent typography across the app
 * Usage: <Text variant="h1">Hello World</Text>
 */

import React, {memo} from 'react';
import {
  Text as RNText,
  TextStyle,
  StyleProp,
  TextProps as RNTextProps,
} from 'react-native';
import { typography, useTheme } from '@theme';
import { textStyles } from '@theme/styles';

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
  const { colors } = useTheme();
  // Get variant styles
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return textStyles.h1;
      case 'h2':
        return textStyles.h2;
      case 'h3':
        return textStyles.h3;
      case 'h4':
        return textStyles.h4;
      case 'h5':
        return textStyles.h5;
      case 'h6':
        return textStyles.h6;
      case 'body':
        return textStyles.body;
      case 'bodyLarge':
        return textStyles.bodyLarge;
      case 'bodySmall':
        return textStyles.bodySmall;
      case 'caption':
        return textStyles.caption;
      case 'label':
        return textStyles.label;
      default:
        return textStyles.body;
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

export default memo(Text);
