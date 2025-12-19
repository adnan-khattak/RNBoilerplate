/**
 * Empty State Component
 * Displays when there's no data to show
 */

import React, {memo} from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Text  from './Text';
import  Button  from './Button';
import { layout, paddings, margins } from '@theme/styles';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  style,
}) => {
  return (
    <View style={[layout.flex1, layout.center, paddings.pXl, style]}>
      {icon && <View style={margins.mbLg}>{icon}</View>}
      
      <Text variant="h4" align="center" color="muted">
        {title}
      </Text>
      
      {description && (
        <Text variant="body" align="center" color="muted" style={[margins.mtSm, margins.mbLg]}>
          {description}
        </Text>
      )}
      
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          variant="primary"
          onPress={onAction}
          style={margins.mtMd}
        />
      )}
    </View>
  );
};

export default memo(EmptyState);
