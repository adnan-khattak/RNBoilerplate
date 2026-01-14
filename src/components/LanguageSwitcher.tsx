/**
 * LanguageSwitcher Component
 * 
 * Example component for switching between supported languages
 * Demonstrates the useLanguage hook and language switching functionality
 * 
 * Can be integrated into:
 * - Settings/Profile screen
 * - Drawer menu
 * - Modal dialog
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useLanguage, useTranslationHook } from '@services/hooks';
import  Text  from './Text';
import  Button  from './Button';

const { width } = Dimensions.get('window');

interface LanguageSwitcherProps {
  /**
   * Called when language is successfully changed
   */
  onLanguageChange?: (language: string) => void;
  /**
   * Whether to show as horizontal selector or vertical list
   * @default 'vertical'
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * Custom styling
   */
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onLanguageChange,
  layout = 'vertical',
  style,
}) => {
  const { language, availableLanguages, changeLanguage, isInitialized, error } =
    useLanguage();
  const { t } = useTranslationHook();
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = async (newLanguage: string) => {
    if (newLanguage === language) return; // Already selected

    try {
      setIsLoading(true);
      await changeLanguage(newLanguage);
      
      // Callback on success
      onLanguageChange?.(newLanguage);
      
      // Show success message
      Alert.alert(
        t('common.success'),
        t('profile.language') + ' ' + t('common.ok'),
      );
    } catch (err) {
      Alert.alert(
        t('common.error'),
        `${t('errors.unknownError')}: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state during initialization
  if (!isInitialized) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>{t('common.error')}</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  // Get language labels (you can customize this)
  const getLanguageLabel = (lang: string): string => {
    const labels: Record<string, string> = {
      en: '🇬🇧 English',
      fr: '🇫🇷 Français',
      es: '🇪🇸 Español',
      de: '🇩🇪 Deutsch',
      it: '🇮🇹 Italiano',
      pt: '🇵🇹 Português',
      ja: '🇯🇵 日本語',
      zh: '🇨🇳 中文',
    };
    return labels[lang] || lang.toUpperCase();
  };

  return (
    <ScrollView style={[styles.container, style]} scrollEnabled={layout === 'vertical'}>
      <Text style={styles.title}>{t('profile.language')}</Text>
      <Text style={styles.subtitle}>
        {t('common.ok')} {getLanguageLabel(language)}
      </Text>

      <View
        style={
          layout === 'horizontal' ? styles.horizontalContainer : styles.verticalContainer
        }
      >
        {availableLanguages.map((lang) => (
          <Button
            key={lang}
            onPress={() => handleLanguageChange(lang)}
            disabled={isLoading || lang === language}
            style={[
              styles.languageButton,
              lang === language && styles.languageButtonActive,
              layout === 'horizontal' && styles.languageButtonHorizontal,
            ]}
            textStyle={[
              styles.languageButtonText,
              lang === language && styles.languageButtonActiveText,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              getLanguageLabel(lang)
            )}
          </Button>
        ))}
      </View>

      {/* Additional info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>{t('common.info')}</Text>
        <Text style={styles.infoText}>
          • {t('common.ok')} {getLanguageLabel(language)}
        </Text>
        <Text style={styles.infoText}>
          • {t('profile.accountSettings')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    opacity: 0.7,
  },
  verticalContainer: {
    gap: 10,
    marginBottom: 24,
  },
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  languageButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  languageButtonHorizontal: {
    flex: 1,
    minWidth: (width - 48) / 2,
  },
  languageButtonActive: {
    backgroundColor: '#007AFF',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  languageButtonActiveText: {
    color: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  infoText: {
    fontSize: 13,
    marginBottom: 4,
    opacity: 0.7,
  },
});
