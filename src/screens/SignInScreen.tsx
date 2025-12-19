/**
 * Sign In Screen
 * Email/password login form
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
import { COLORS, STRINGS, VALIDATION } from '@config';
import { layout, margins, paddings } from '@theme/styles';
import { AuthStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const { signIn, authState } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = useCallback((): boolean => {
    const newErrors: { email?: string; password?: string } = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleSignIn = useCallback(async () => {
    if (!validate()) return;

    try {
      await signIn({ email: email.trim(), password });
    } catch (error) {
      Alert.alert(
        STRINGS.AUTH.SIGN_IN_FAILED,
        error instanceof Error ? error.message : STRINGS.ERRORS.UNKNOWN
      );
    }
  }, [email, password, signIn, validate]);

  const isLoading = authState.status === 'checking';

  return (
    <KeyboardAvoidingView
      style={layout.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={layout.container}
        contentContainerStyle={[paddings.pBase, { flexGrow: 1, justifyContent: 'center' }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[margins.mbXl, { alignItems: 'center' }]}>
          <Text variant="h1" align="center">{STRINGS.AUTH.SIGN_IN_TITLE}</Text>
          <Text variant="body" color="muted" align="center" style={margins.mtSm}>
            {STRINGS.AUTH.SIGN_IN_SUBTITLE}
          </Text>
        </View>

        {/* Form */}
        <View style={margins.mbXl}>
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
            autoComplete="password"
            placeholder={STRINGS.AUTH.PASSWORD_PLACEHOLDER}
          />
        </View>

        {/* Actions */}
        <View>
          <Button
            title={STRINGS.AUTH.SIGN_IN_BUTTON}
            fullWidth
            loading={isLoading}
            onPress={handleSignIn}
            style={margins.mbMd}
          />

          <View style={[layout.rowCenter, { justifyContent: 'center' }]}>
            <Text variant="body" color="muted">
              {STRINGS.AUTH.NO_ACCOUNT}{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text variant="body" color="primary" weight="semiBold">
                {STRINGS.AUTH.SIGN_UP}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Demo credentials hint */}
        <View style={[margins.mtXl, paddings.pMd, { backgroundColor: COLORS.backgroundSecondary, borderRadius: 8 }]}>
          <Text variant="caption" color="muted" align="center">
            Demo: Create an account or use existing MockAPI users
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
