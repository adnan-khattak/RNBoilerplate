/**
 * Error State Component
 * Displays when an error occurs
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Text  from './Text';
import Button  from './Button';
import { spacing } from '@theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Text variant="h1">⚠️</Text>
      </View>
      
      <Text variant="h4" align="center" color="error">
        {title}
      </Text>
      
      <Text variant="body" align="center" color="muted" style={styles.message}>
        {message}
      </Text>
      
      {onRetry && (
        <Button
          title={retryLabel}
          variant="primary"
          onPress={onRetry}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  message: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
  },
});

export default ErrorState;
