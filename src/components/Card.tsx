/**
 * Card Component
 * A flexible container with consistent styling
 */

import React, {memo} from 'react';
import { View, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { spacing, useTheme } from '@theme';
import { shadows, borderRadius } from '@theme/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padding?: keyof typeof spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
  padding = 'base',
}) => {
  const { colors } = useTheme();

  const cardStyle = [
    {
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing[padding],
    },
    variant === 'elevated' && shadows.md,
    variant === 'outlined' && {
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

export default memo(Card);
