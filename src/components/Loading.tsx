/**
 * Loading Component
 * Displays a loading spinner with optional message
 */

import React, {memo} from 'react';
import { View, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import Text  from './Text';
import { useTheme } from '@theme';
import { layout, paddings, margins } from '@theme/styles';

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
  color,
  fullScreen = false,
  style,
}) => {
  const { colors } = useTheme();
  const spinnerColor = color || colors.primary;

  return (
    <View style={[paddings.pXl, layout.center, fullScreen && { ...layout.container, backgroundColor: colors.background }, style]}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && (
        <Text variant="body" color="muted" style={margins.mtMd}>
          {message}
        </Text>
      )}
    </View>
  );
};

export default memo(Loading);
