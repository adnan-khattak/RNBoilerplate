/**
 * Reusable Input Component
 * Supports various input types, states, and customizations
 * Usage: <Input label="Email" placeholder="Enter email" onChangeText={(text) => {}} />
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '@theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onRightIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
  containerStyle,
  inputStyle,
  labelStyle,
  onRightIconPress,
  multiline,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    textInputProps.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    textInputProps.onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          {...textInputProps}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            multiline && styles.multiline,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            inputStyle,
          ]}
          editable={!disabled}
          placeholderTextColor={colors.gray[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            activeOpacity={onRightIconPress ? 0.7 : 1}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.error,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
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
  inputWithLeftIcon: {
    paddingLeft: spacing['2xl'] + spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: spacing['2xl'] + spacing.sm,
  },
  multiline: {
    height: 100,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  inputDisabled: {
    backgroundColor: colors.gray[100],
    color: colors.textDisabled,
  },
  leftIconContainer: {
    position: 'absolute',
    left: spacing.base,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: spacing.base,
    zIndex: 1,
  },
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
});

export default Input;
