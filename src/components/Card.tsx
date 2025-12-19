/**
 * Card Component
 * A flexible container with consistent styling
 */

import React, {memo} from 'react';
import { View, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { spacing } from '@theme';
import { cardStyles } from '@theme/styles';

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
    cardStyles.base,
    { padding: spacing[padding] },
    variant === 'elevated' && cardStyles.elevated,
    variant === 'outlined' && cardStyles.flat,
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
