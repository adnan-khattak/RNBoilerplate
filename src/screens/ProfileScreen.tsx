/**
 * Profile Screen
 * Displays user information and logout option
 */

import React, { useCallback, useState } from 'react';
import { View, ScrollView, Image, Alert, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Text, Card } from '@components';
import { useAuth } from '@state/AuthContext';
import { useTheme } from '@theme';
import { layout, margins, paddings } from '@theme/styles';
import { AppStackParamList } from '@navigation/types';
import notificationService from '@services/notification/Notification';
import { useLanguage, useTranslationHook } from '@services/hooks';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { authState, signOut } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const { user } = authState;
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean | null>(null);
  const [isPermissionBusy, setIsPermissionBusy] = useState(false);
  
  // Language management
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslationHook();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

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
      t('auth.signOut'),
      t('auth.signOutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('auth.signOut'),
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  }, [signOut, t]);

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
      t('profile.notifications'),
      t('profile.notificationsDisableInfo'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.openSettings'),
          onPress: () => notificationService.openPermissionSettings(),
        },
      ]
    );
  }, [t]);

  const handleLanguageChange = useCallback(async (lang: string) => {
    if (lang === language) return;
    
    setIsChangingLanguage(true);
    try {
      await changeLanguage(lang);
      Alert.alert(
        t('common.success'),
        `Language changed to ${getLanguageLabel(lang)}`
      );
    } catch (error) {
      Alert.alert(
        t('common.error'),
        `Failed to change language: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsChangingLanguage(false);
    }
  }, [language, changeLanguage, t]);

  const getLanguageLabel = (lang: string): string => {
    const labels: Record<string, string> = {
      en: '🇬🇧 English',
      fr: '🇫🇷 Français',
      ar: '🇸🇦 العربية',
    };
    return labels[lang] || lang.toUpperCase();
  };

  if (!user) {
    return (
      <View style={[layout.container, layout.center]}>
        <Text variant="body" color="muted">{t('profile.noResults')}</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={[layout.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[paddings.pBase, paddings.pbXl]}
    >
      {/* Dark Header */}
      {/* <View style={[
        layout.center, 
        margins.mbXl,
        { backgroundColor: colors.surface, padding: 16, borderRadius: 12 }
      ]}>
        <Text variant="h3" style={{ color: colors.text }}>{t('profile.title')}</Text>
      </View> */}
      
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
        <Text variant="label" color="muted" style={margins.mbSm}>{t('profile.accountInfo')}</Text>
        
        <View style={[layout.rowBetween, margins.mbSm]}>
          <Text variant="body" color="muted">{t('profile.userId')}</Text>
          <Text variant="body">{user.id}</Text>
        </View>
        
        <View style={[layout.rowBetween, margins.mbSm]}>
          <Text variant="body" color="muted">{t('auth.email')}</Text>
          <Text variant="body">{user.email}</Text>
        </View>
        
        {user.createdAt && (
          <View style={layout.rowBetween}>
            <Text variant="body" color="muted">{t('profile.memberSince')}</Text>
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
              {t('profile.darkMode')}
            </Text>
            <Text variant="body" color="muted">
              {t('profile.darkModeDesc')}
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
              {t('profile.notifications')}
            </Text>
            <Text variant="body" color="muted">
              {t('profile.notificationsDesc')}
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

      {/* Language Selection */}
      <Card variant="outlined" style={margins.mbLg}>
        <View>
          <Text variant="label" color="muted" style={margins.mbMd}>
            {t('profile.language')}
          </Text>
          <Text variant="body" color="muted" style={margins.mbMd}>
            {t('profile.languageDesc')}
          </Text>
          
          {/* Language Options */}
          {availableLanguages.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => handleLanguageChange(lang)}
              disabled={isChangingLanguage}
              style={[
                styles.languageOption,
                {
                  backgroundColor: lang === language ? colors.primaryLight : colors.backgroundSecondary,
                  borderColor: lang === language ? colors.primary : colors.gray300,
                  opacity: isChangingLanguage ? 0.6 : 1,
                }
              ]}
            >
              <View style={styles.languageContent}>
                <View style={[
                  styles.radioButton,
                  {
                    borderColor: lang === language ? colors.primary : colors.gray400,
                    backgroundColor: lang === language ? colors.primary : 'transparent',
                  }
                ]}>
                  {lang === language && (
                    <View style={[styles.radioButtonInner, { backgroundColor: colors.white }]} />
                  )}
                </View>
                <Text 
                  variant="body" 
                  style={[
                    styles.languageText,
                    { color: lang === language ? colors.primary : colors.text }
                  ]}
                >
                  {getLanguageLabel(lang)}
                </Text>
              </View>
              {lang === language && (
                <Text variant="caption" style={{ color: colors.primary }}>
                  ✓ {t('common.ok')}
                </Text>
              )}
            </TouchableOpacity>
          ))}
          
          {isChangingLanguage && (
            <Text variant="caption" color="muted" align="center" style={margins.mtSm}>
              {t('common.loading')}
            </Text>
          )}
        </View>
      </Card>

      {/* Actions */}
      <View style={margins.mtLg}>
        <Button
          title="Scan QR Code"
          variant="primary"
          fullWidth
          onPress={() => navigation.navigate('QRScanner')}
          style={margins.mbMd}
        />
        <Button
          title={t('auth.signOut')}
          variant="danger"
          fullWidth
          onPress={handleLogout}
        />
      </View>

      {/* Customization hint */}
      <View style={[margins.mtXl, paddings.pMd, { backgroundColor: colors.backgroundSecondary, borderRadius: 12 }]}>
        <Text variant="caption" color="muted" align="center">
          {t('profile.customizeHint')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
