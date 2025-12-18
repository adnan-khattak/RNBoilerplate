/**
 * Sign Up Screen
 * Registration form for new users
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
import { layout, margins, paddings } from '../theme/styles';
import { AuthStackParamList } from '../navigation/types';
import { VALIDATION } from '../config/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const { signUp, authState } = useAuth();

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

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
      newErrors.name = `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      await signUp({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    } catch (error) {
      Alert.alert(
        'Sign Up Failed',
        error instanceof Error ? error.message : 'Please try again.'
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
        contentContainerStyle={[paddings.pBase, paddings.p2xl]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[margins.mbXl, { alignItems: 'center', marginTop: 40 }]}>
          <Text variant="h1" align="center">Create Account</Text>
          <Text variant="body" color="muted" align="center" style={margins.mtSm}>
            Sign up to get started
          </Text>
        </View>

        {/* Form */}
        <View style={margins.mbXl}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
            placeholder="John Doe"
          />

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
            autoComplete="new-password"
            placeholder="Min 8 characters"
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
            secureTextEntry
            placeholder="Re-enter password"
          />
        </View>

        {/* Actions */}
        <View>
          <Button
            title="Create Account"
            fullWidth
            loading={isLoading}
            onPress={handleSignUp}
            style={margins.mbMd}
          />

          <View style={[layout.rowCenter, { justifyContent: 'center' }]}>
            <Text variant="body" color="muted">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text variant="body" color="primary" weight="semiBold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
