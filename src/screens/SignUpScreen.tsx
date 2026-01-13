/**
 * Sign Up Screen
 * Registration form for new users
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Text, Input } from '@components';
import { useAuth } from '@state/AuthContext';
import { useTheme } from '@theme';
import { STRINGS, VALIDATION } from '@config';
import { layout, margins, paddings } from '@theme/styles';
import { AuthStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const { signUp, authState } = useAuth();
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = useCallback((): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = STRINGS.VALIDATION.NAME_REQUIRED;
    } else if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
      newErrors.name = STRINGS.VALIDATION.NAME_MIN_LENGTH;
    }

    if (!email.trim()) {
      newErrors.email = STRINGS.VALIDATION.EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = STRINGS.VALIDATION.EMAIL_INVALID;
    }

    if (!password) {
      newErrors.password = STRINGS.VALIDATION.PASSWORD_REQUIRED;
    } else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      newErrors.password = STRINGS.VALIDATION.PASSWORD_MIN_LENGTH;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = STRINGS.VALIDATION.CONFIRM_PASSWORD_REQUIRED;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = STRINGS.VALIDATION.PASSWORD_MISMATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [confirmPassword, email, name, password]);

  const handleSignUp = useCallback(async () => {
    if (!validate()) return;

    try {
      await signUp({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    } catch (error) {
      Alert.alert(
        STRINGS.AUTH.SIGN_UP_FAILED,
        error instanceof Error ? error.message : STRINGS.ERRORS.UNKNOWN
      );
    }
  }, [email, name, password, signUp, validate]);

  const isLoading = authState.status === 'checking';

  return (
    <KeyboardAvoidingView
      style={[layout.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[layout.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[paddings.pBase, paddings.p2xl]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[margins.mbXl, { alignItems: 'center', marginTop: 40 }]}>
          <Text variant="h1" align="center">{STRINGS.AUTH.SIGN_UP_TITLE}</Text>
          <Text variant="body" color="muted" align="center" style={margins.mtSm}>
            {STRINGS.AUTH.SIGN_UP_SUBTITLE}
          </Text>
        </View>

        {/* Form */}
        <View style={margins.mbXl}>
          <Input
            label={STRINGS.FORM.FULL_NAME}
            value={name}
            onChangeText={setName}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
            placeholder={STRINGS.AUTH.NAME_PLACEHOLDER}
          />

          <Input
            label={STRINGS.FORM.EMAIL}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            placeholder={STRINGS.AUTH.EMAIL_PLACEHOLDER}
          />

          <Input
            label={STRINGS.FORM.PASSWORD}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
            autoComplete="new-password"
            placeholder={STRINGS.AUTH.PASSWORD_PLACEHOLDER}
          />

          <Input
            label={STRINGS.FORM.CONFIRM_PASSWORD}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
            secureTextEntry
            placeholder={STRINGS.AUTH.CONFIRM_PASSWORD_PLACEHOLDER}
          />
        </View>

        {/* Actions */}
        <View>
          <Button
            title={STRINGS.AUTH.SIGN_UP_BUTTON}
            fullWidth
            loading={isLoading}
            onPress={handleSignUp}
            style={margins.mbMd}
          />

          <View style={[layout.rowCenter, { justifyContent: 'center' }]}>
            <Text variant="body" color="muted">
              {STRINGS.AUTH.HAS_ACCOUNT}{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text variant="body" color="primary" weight="semiBold">
                {STRINGS.AUTH.SIGN_IN}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
