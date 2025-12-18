/**
 * Sign In Screen
 * Email/password login form
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Text, Input } from '../components';
import { useAuth } from '../state/AuthContext';
import { colors } from '../theme/theme';
import { layout, margins, paddings } from '../theme/styles';
import { AuthStackParamList } from '../navigation/types';
import { VALIDATION } from '../config/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const { signIn, authState } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) return;

    try {
      await signIn({ email: email.trim(), password });
    } catch (error) {
      Alert.alert(
        'Sign In Failed',
        error instanceof Error ? error.message : 'Please check your credentials and try again.'
      );
    }
  };

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
          <Text variant="h1" align="center">Welcome Back</Text>
          <Text variant="body" color="muted" align="center" style={margins.mtSm}>
            Sign in to continue
          </Text>
        </View>

        {/* Form */}
        <View style={margins.mbXl}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
            autoComplete="password"
            placeholder="Enter your password"
          />
        </View>

        {/* Actions */}
        <View>
          <Button
            title="Sign In"
            fullWidth
            loading={isLoading}
            onPress={handleSignIn}
            style={margins.mbMd}
          />

          <View style={[layout.rowCenter, { justifyContent: 'center' }]}>
            <Text variant="body" color="muted">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text variant="body" color="primary" weight="semiBold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Demo credentials hint */}
        <View style={[margins.mtXl, paddings.pMd, { backgroundColor: colors.backgroundSecondary, borderRadius: 8 }]}>
          <Text variant="caption" color="muted" align="center">
            Demo: Create an account or use existing MockAPI users
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
