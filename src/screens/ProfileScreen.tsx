/**
 * Profile Screen
 * Displays user information and logout option
 */

import React, { useCallback } from 'react';
import { View, ScrollView, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Text, Card } from '@components';
import { useAuth } from '@state/AuthContext';
import { COLORS, STRINGS } from '@config';
import { layout, margins, paddings } from '@theme/styles';
import { AppStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

export default function ProfileScreen({}: Props) {
  const { authState, signOut } = useAuth();
  const { user } = authState;

  const handleLogout = useCallback(() => {
    Alert.alert(
      STRINGS.AUTH.SIGN_OUT,
      STRINGS.AUTH.SIGN_OUT_CONFIRM,
      [
        { text: STRINGS.COMMON.CANCEL, style: 'cancel' },
        {
          text: STRINGS.AUTH.SIGN_OUT,
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  }, [signOut]);

  if (!user) {
    return (
      <View style={[layout.container, layout.center]}>
        <Text variant="body" color="muted">{STRINGS.COMMON.NO_RESULTS}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={layout.container}
      contentContainerStyle={[paddings.pBase, paddings.pbXl]}
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
              backgroundColor: COLORS.gray200,
            }}
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: COLORS.primary,
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
        <Text variant="label" color="muted" style={margins.mbSm}>{STRINGS.PROFILE.ACCOUNT_INFO}</Text>
        
        <View style={[layout.rowBetween, margins.mbSm]}>
          <Text variant="body" color="muted">{STRINGS.PROFILE.USER_ID}</Text>
          <Text variant="body">{user.id}</Text>
        </View>
        
        <View style={[layout.rowBetween, margins.mbSm]}>
          <Text variant="body" color="muted">{STRINGS.FORM.EMAIL}</Text>
          <Text variant="body">{user.email}</Text>
        </View>
        
        {user.createdAt && (
          <View style={layout.rowBetween}>
            <Text variant="body" color="muted">{STRINGS.PROFILE.MEMBER_SINCE}</Text>
            <Text variant="body">
              {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      </Card>

      {/* Actions */}
      <View style={margins.mtLg}>
        <Button
          title={STRINGS.AUTH.SIGN_OUT}
          variant="danger"
          fullWidth
          onPress={handleLogout}
        />
      </View>

      {/* Customization hint */}
      <View style={[margins.mtXl, paddings.pMd, { backgroundColor: COLORS.backgroundSecondary, borderRadius: 12 }]}>
        <Text variant="caption" color="muted" align="center">
          {STRINGS.PROFILE.CUSTOMIZE_HINT}
        </Text>
      </View>
    </ScrollView>
  );
}
