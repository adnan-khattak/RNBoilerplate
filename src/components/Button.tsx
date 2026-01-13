/**
 * Reusable Button Component
 * Supports multiple variants, sizes, and states
 * Usage: <Button title="Click me" variant="primary" size="medium" onPress={() => {}} />
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '@theme';
import { buttonStyles } from '@theme/styles';

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
  const { colors } = useTheme();

  // Get variant styles
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return buttonStyles.primary;
      case 'secondary':
        return buttonStyles.secondary;
      case 'outline':
        return buttonStyles.outline;
      case 'ghost':
        return buttonStyles.ghost;
      case 'danger':
        return buttonStyles.danger;
      case 'success':
        return buttonStyles.success;
      default:
        return buttonStyles.primary;
    }
  };

  // Get variant text styles
  const getVariantTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return buttonStyles.textOutline;
      case 'ghost':
        return buttonStyles.textGhost;
      default:
        return buttonStyles.textFilled;
    }
  };

  // Get size styles
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return buttonStyles.small;
      case 'medium':
        return buttonStyles.medium;
      case 'large':
        return buttonStyles.large;
      default:
        return buttonStyles.medium;
    }
  };

  // Get size text styles
  const getSizeTextStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return buttonStyles.textSmall;
      case 'medium':
        return buttonStyles.textMedium;
      case 'large':
        return buttonStyles.textLarge;
      default:
        return buttonStyles.textMedium;
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
        buttonStyles.base,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && buttonStyles.fullWidth,
        isDisabled && buttonStyles.disabled,
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
              buttonStyles.text,
              getVariantTextStyle(),
              getSizeTextStyle(),
              !!leftIcon && buttonStyles.textWithLeftIcon,
              !!rightIcon && buttonStyles.textWithRightIcon,
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

export default Button;
