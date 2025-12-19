/**
 * Loading Component
 * Displays a loading spinner with optional message
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Text  from './Text';
import { colors, spacing } from '@theme';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Loading: React.FC<LoadingProps> = ({
  message,
  size = 'large',
  color = colors.primary,
  fullScreen = false,
  style,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text variant="body" color="muted" style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  message: {
    marginTop: spacing.md,
  },
});

export default Loading;
