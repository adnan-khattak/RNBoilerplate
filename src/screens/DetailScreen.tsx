import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, Text, ErrorState, Loading } from '@components';
import { deleteItem } from '@services/api';
import { useItem } from '@services/hooks';
import { useTheme, spacing, borderRadius } from '@theme';
import { STRINGS } from '@config';
import {
  layout,
  margins,
  paddings,
  dividerStyles,
} from '@theme/styles';
import { RootStackParamList } from '@navigation/types';
import { formatDate, formatCurrency } from '@utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const routeItem = (route as any)?.params?.item;
  const itemId = routeItem?.id;
  
  // Fetch item from cache/API for offline support and real-time updates
  const { data: item, isLoading, error, refetch } = useItem(itemId);
  const queryClient = useQueryClient();
  /* ------------------ DELETE MUTATION ------------------ */
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      navigation.goBack();
    },
    onError: () => {
      Alert.alert(STRINGS.COMMON.ERROR, STRINGS.DETAIL.ERROR);
    },
  });

  if (isLoading) {
    return (
      <View style={layout.containerCentered}>
        <Loading />
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={layout.container}>
        <ErrorState
          title={STRINGS.ALERTS.ERROR}
          message={error?.message || STRINGS.ERRORS.UNKNOWN}
          onRetry={refetch}
          retryLabel={STRINGS.COMMON.RETRY}
        />
      </View>
    );
  }

  const formattedCreatedAt = formatDate(item.createdAt || '');
  const formattedUpdatedAt = formatDate(item.updatedAt || '');

  const handleEdit = () => {
    navigation.navigate('Edit', { item });
  };

  const handleDelete = () => {
    Alert.alert(
      STRINGS.COMMON.DELETE,
      STRINGS.DETAIL.DELETE_CONFIRM(item.name),
      [
        { text: STRINGS.COMMON.CANCEL, style: 'cancel' },
        {
          text: STRINGS.COMMON.DELETE,
          style: 'destructive',
          onPress: () => deleteMutation.mutate(item.id),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[layout.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[paddings.pBase, paddings.pbXl]}
    >
      {/* Dark Header */}
      <View style={[
        { backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 16 }
      ]}>
        <Text variant="h3" style={{ color: colors.text }}>Item Details</Text>
      </View>
      
      {/* Main Card */}
      <View style={[
        {
          backgroundColor: colors.card,
          borderRadius: borderRadius.lg,
          padding: spacing.base,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5,
        },
      ]}>
        {/* Header */}
        <View style={layout.rowBetween}>
          <Text variant="h2" style={[layout.flex1, margins.mrMd]}>
            {item.name}
          </Text>

          {item.price !== undefined && (
            <View
              style={[
                paddings.pxMd,
                paddings.pySm,
                {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <Text variant="h4" color="white">
                {formatCurrency(item.price)}
              </Text>
            </View>
          )}
        </View>

        <View style={[dividerStyles.horizontal, margins.myLg]} />

        {/* Description */}
        <View style={margins.mbLg}>
          <Text variant="label" color="muted" style={margins.mbXs}>
            {STRINGS.FORM.DESCRIPTION}
          </Text>
          <Text variant="body">{item.description}</Text>
        </View>

        {/* Metadata */}
        <View
          style={[
            paddings.pMd,
            {
              backgroundColor: colors.backgroundSecondary,
              borderRadius: borderRadius.md,
              gap: spacing.sm,
            },
          ]}
        >
          <View style={layout.rowBetween}>
            <Text variant="caption" color="muted">
              {STRINGS.DETAIL.CREATED}
            </Text>
            <Text variant="bodySmall">
              {formattedCreatedAt}
            </Text>
          </View>

          <View style={layout.rowBetween}>
            <Text variant="caption" color="muted">
              {STRINGS.DETAIL.UPDATED}
            </Text>
            <Text variant="bodySmall">
              {formattedUpdatedAt}
            </Text>
          </View>

          <View style={layout.rowBetween}>
            <Text variant="caption" color="muted">
              Item ID
            </Text>
            <Text variant="bodySmall">#{item.id}</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={margins.mtXl}>
        <Button
          title={STRINGS.DETAIL.EDIT_BUTTON}
          fullWidth
          onPress={handleEdit}
          style={margins.mbMd}
        />
        <Button
          title={STRINGS.DETAIL.DELETE_BUTTON}
          variant="danger"
          fullWidth
          loading={deleteMutation.isPending}
          onPress={handleDelete}
          style={margins.mbMd}
        />
        <Button
          title={STRINGS.COMMON.BACK}
          variant="ghost"
          fullWidth
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}
