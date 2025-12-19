/**
 * Error State Component
 * Displays when an error occurs
 */

import React, {memo} from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Text  from './Text';
import Button  from './Button';
import { layout, paddings, margins } from '@theme/styles';

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
    <View style={[layout.flex1, layout.center, paddings.pXl, style]}>
      <View style={margins.mbLg}>
        <Text variant="h1">⚠️</Text>
      </View>
      
      <Text variant="h4" align="center" color="error">
        {title}
      </Text>
      
      <Text variant="body" align="center" color="muted" style={[margins.mtSm, margins.mbLg]}>
        {message}
      </Text>
      
      {onRetry && (
        <Button
          title={retryLabel}
          variant="primary"
          onPress={onRetry}
          style={margins.mtMd}
        />
      )}
    </View>
  );
};

export default memo(ErrorState);
