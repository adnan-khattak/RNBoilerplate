import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, Text, ErrorState, Loading } from '@components';
import { deleteItem } from '@services/api';
import { useItem, useTranslationHook } from '@services/hooks';
import { useTheme, spacing, borderRadius } from '@theme';
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
  const { t } = useTranslationHook();
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
      Alert.alert(t('common.error'), t('detail.error'));
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
          title={t('alerts.error')}
          message={error?.message || t('errors.unknown')}
          onRetry={refetch}
          retryLabel={t('common.retry')}
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
      t('common.delete'),
      t('detail.deleteConfirm', { name: item.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
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
        <Text variant="h3" style={{ color: colors.text }}>{t('detail.title')}</Text>
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
            {t('form.description')}
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
              {t('detail.created')}
            </Text>
            <Text variant="bodySmall">
              {formattedCreatedAt}
            </Text>
          </View>

          <View style={layout.rowBetween}>
            <Text variant="caption" color="muted">
              {t('detail.updated')}
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
          title={t('detail.editButton')}
          fullWidth
          onPress={handleEdit}
          style={margins.mbMd}
        />
        <Button
          title={t('detail.deleteButton')}
          variant="danger"
          fullWidth
          loading={deleteMutation.isPending}
          onPress={handleDelete}
          style={margins.mbMd}
        />
        <Button
          title={t('common.back')}
          variant="ghost"
          fullWidth
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}
