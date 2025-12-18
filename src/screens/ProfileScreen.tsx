/**
 * Profile Screen
 * Displays user information and logout option
 */

import React from 'react';
import { View, ScrollView, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Text, Card } from '../components';
import { useAuth } from '../state/AuthContext';
import { colors, spacing, borderRadius } from '../theme/theme';
import { layout, margins, paddings } from '../theme/styles';
import { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { authState, signOut } = useAuth();
  const { user } = authState;

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={[layout.container, layout.center]}>
        <Text variant="body" color="muted">No user data</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={layout.container}
      contentContainerStyle={[paddings.pBase, { paddingBottom: 32 }]}
    >
      {/* Avatar Section */}
      <View style={[layout.center, margins.mbXl]}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.gray[200],
            }}
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text variant="h1" color="white">
              {user.name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>
        )}
        <Text variant="h3" style={margins.mtMd}>{user.name}</Text>
        <Text variant="body" color="muted">{user.email}</Text>
      </View>

      {/* User Info Card */}
      <Card variant="outlined" style={margins.mbLg}>
        <Text variant="label" color="muted" style={margins.mbSm}>Account Information</Text>
        
        <View style={[layout.rowBetween, margins.mbSm]}>
          <Text variant="body" color="muted">User ID</Text>
          <Text variant="body">{user.id}</Text>
        </View>
        
        <View style={[layout.rowBetween, margins.mbSm]}>
          <Text variant="body" color="muted">Email</Text>
          <Text variant="body">{user.email}</Text>
        </View>
        
        {user.createdAt && (
          <View style={layout.rowBetween}>
            <Text variant="body" color="muted">Member Since</Text>
            <Text variant="body">
              {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      </Card>

      {/* Actions */}
      <View style={margins.mtLg}>
        <Button
          title="Sign Out"
          variant="danger"
          fullWidth
          onPress={handleLogout}
        />
      </View>

      {/* Customization hint */}
      <View style={[margins.mtXl, paddings.pMd, { backgroundColor: colors.backgroundSecondary, borderRadius: borderRadius.md }]}>
        <Text variant="caption" color="muted" align="center">
          💡 Customize this screen to add edit profile, change password, settings, etc.
        </Text>
      </View>
    </ScrollView>
  );
}
