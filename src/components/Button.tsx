/**
 * Reusable Button Component
 * Supports multiple variants, sizes, and states
 * Usage: <Button title="Click me" variant="primary" size="medium" onPress={() => {}} />
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

// Button sizes
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  activeOpacity = 0.7,
}) => {
  // Get variant styles
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      case 'danger':
        return styles.danger;
      case 'success':
        return styles.success;
      default:
        return styles.primary;
    }
  };

  // Get variant text styles
  const getVariantTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return styles.textOutline;
      case 'ghost':
        return styles.textGhost;
      default:
        return styles.textFilled;
    }
  };

  // Get size styles
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  // Get size text styles
  const getSizeTextStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'medium':
        return styles.textMedium;
      case 'large':
        return styles.textLarge;
      default:
        return styles.textMedium;
    }
  };

  // Get loading indicator color
  const getLoadingColor = (): string => {
    return variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white;
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={activeOpacity}
      style={[
        styles.base,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getLoadingColor()} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              styles.text,
              getVariantTextStyle(),
              getSizeTextStyle(),
              leftIcon && styles.textWithLeftIcon,
              rightIcon && styles.textWithRightIcon,
              isDisabled && styles.textDisabled,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },

  // Variant styles
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
    borderWidth: 1.5,
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

  // Size styles
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 44,
  },
  large: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },

  // State styles
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },

  // Text styles
  text: {
    fontWeight: typography.fontWeight.semiBold,
    textAlign: 'center',
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
    fontSize: typography.fontSize.base,
  },
  textLarge: {
    fontSize: typography.fontSize.md,
  },
  textDisabled: {
    opacity: 0.7,
  },
  textWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  textWithRightIcon: {
    marginRight: spacing.sm,
  },
});

export default Button;
