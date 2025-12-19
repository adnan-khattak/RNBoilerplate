/**
 * Reusable Input Component
 * Supports various input types, states, and customizations
 * Usage: <Input label="Email" placeholder="Enter email" onChangeText={(text) => {}} />
 */

import React, { useState, memo } from 'react';
import {
  View,
  TextInput,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@theme';
import { inputStyles } from '@theme/styles';

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
    <View style={[inputStyles.container, containerStyle]}>
      {label && (
        <Text style={[inputStyles.label, labelStyle]}>
          {label}
          {required && <Text style={inputStyles.required}> *</Text>}
        </Text>
      )}

      <View style={inputStyles.inputWrapper}>
        {leftIcon && <View style={inputStyles.iconContainer}>{leftIcon}</View>}

        <TextInput
          {...textInputProps}
          style={[
            inputStyles.input,
            !!leftIcon && inputStyles.inputWithIcon,
            !!rightIcon && inputStyles.inputWithRightIcon,
            multiline && inputStyles.multiline,
            isFocused && inputStyles.inputFocused,
            !!error && inputStyles.inputError,
            disabled && inputStyles.inputDisabled,
            inputStyle,
          ]}
          editable={!disabled}
          placeholderTextColor={colors.gray[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
        />

        {!!rightIcon && (
          <TouchableOpacity
            style={inputStyles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            activeOpacity={onRightIconPress ? 0.7 : 1}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={inputStyles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={inputStyles.helperText}>{helperText}</Text>}
    </View>
  );
};
export default memo(Input);
