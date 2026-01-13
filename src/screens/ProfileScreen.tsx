/**
 * Profile Screen
 * Displays user information and logout option
 */

import React, { useCallback, useState } from 'react';
import { View, ScrollView, Image, Alert, Switch } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Text, Card } from '@components';
import { useAuth } from '@state/AuthContext';
import { useTheme } from '@theme';
import { STRINGS } from '@config';
import { layout, margins, paddings } from '@theme/styles';
import { AppStackParamList } from '@navigation/types';
import notificationService from '@services/notification/Notification';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

export default function ProfileScreen({}: Props) {
  const { authState, signOut } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const { user } = authState;
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean | null>(null);
  const [isPermissionBusy, setIsPermissionBusy] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPermission = async () => {
        setIsPermissionBusy(true);
        const granted = await notificationService.hasPermission();
        if (isActive) {
          setNotificationsEnabled(granted);
          setIsPermissionBusy(false);
        }
      };

      fetchPermission();

      return () => {
        isActive = false;
      };
    }, [])
  );

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

  const handleToggleNotifications = useCallback(async (value: boolean) => {
    if (value) {
      setIsPermissionBusy(true);
      const granted = await notificationService.askForPermission();
      setNotificationsEnabled(granted);
      setIsPermissionBusy(false);

      if (!granted) {
        // Direct user to system settings because app cannot force-enable permission
        await notificationService.openPermissionSettings();
      }
      return;
    }

    Alert.alert(
      STRINGS.PROFILE.NOTIFICATIONS,
      STRINGS.PROFILE.NOTIFICATIONS_DISABLE_INFO,
      [
        { text: STRINGS.COMMON.CANCEL, style: 'cancel' },
        {
          text: STRINGS.PROFILE.OPEN_SETTINGS,
          onPress: () => notificationService.openPermissionSettings(),
        },
      ]
    );
  }, []);

  if (!user) {
    return (
      <View style={[layout.container, layout.center]}>
        <Text variant="body" color="muted">{STRINGS.COMMON.NO_RESULTS}</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={[layout.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[paddings.pBase, paddings.pbXl]}
    >
      {/* Dark Header */}
      <View style={[
        layout.center, 
        margins.mbXl,
        { backgroundColor: colors.surface, padding: 16, borderRadius: 12 }
      ]}>
        <Text variant="h3" style={{ color: colors.text }}>Profile</Text>
      </View>
      
      {/* Avatar Section */}
      <View style={[layout.center, margins.mbXl]}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.gray200,
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

      {/* Dark Mode Toggle */}
      <Card variant="outlined" style={margins.mbLg}>
        <View style={[layout.rowBetween, { alignItems: 'center' }]}> 
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text variant="label" color="muted" style={margins.mbXs}>
              {STRINGS.PROFILE.DARK_MODE}
            </Text>
            <Text variant="body" color="muted">
              {STRINGS.PROFILE.DARK_MODE_DESC}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ true: colors.primary, false: colors.gray300 }}
            thumbColor={colors.white}
          />
        </View>
      </Card>

      {/* Notification Permission Toggle */}
      <Card variant="outlined" style={margins.mbLg}>
        <View style={[layout.rowBetween, { alignItems: 'center' }]}> 
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text variant="label" color="muted" style={margins.mbXs}>
              {STRINGS.PROFILE.NOTIFICATIONS}
            </Text>
            <Text variant="body" color="muted">
              {STRINGS.PROFILE.NOTIFICATIONS_DESC}
            </Text>
          </View>
          <Switch
            value={Boolean(notificationsEnabled)}
            onValueChange={handleToggleNotifications}
            disabled={notificationsEnabled === null || isPermissionBusy}
            trackColor={{ true: colors.primary, false: colors.gray300 }}
            thumbColor={colors.white}
          />
        </View>
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
      <View style={[margins.mtXl, paddings.pMd, { backgroundColor: colors.backgroundSecondary, borderRadius: 12 }]}>
        <Text variant="caption" color="muted" align="center">
          {STRINGS.PROFILE.CUSTOMIZE_HINT}
        </Text>
      </View>
    </ScrollView>
  );
}
