/**
 * Card Component
 * A flexible container with consistent styling
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@theme';

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
  const cardStyle = [
    styles.base,
    { padding: spacing[padding] },
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
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

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
  },
  elevated: {
    ...shadows.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Card;
