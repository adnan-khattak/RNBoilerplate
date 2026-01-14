import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from '@components';
import { Item } from '@services/api';
import { useTheme, spacing } from '@theme';
import { layout, margins } from '@theme/styles';
import { useTranslationHook } from '@services/hooks';

interface Props {
  item: Item;
  onView: (item: Item) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemCard = ({ item, onView, onEdit, onDelete }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslationHook();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: spacing.base,
          borderWidth: 1,
          borderColor: colors.cardBorder,
        },
        margins.mbMd,
      ]}
      activeOpacity={0.7}
      onPress={() => onView(item)}
    >
      <View style={[layout.rowBetween, { alignItems: 'flex-start', marginBottom: spacing.xs }]}>
        <Text variant="h5" style={[layout.flex1, margins.mrSm]}>
          {item.name}
        </Text>
        {item.price !== undefined && (
          <Text variant="body" color="primary" weight="semiBold">
            ${item.price}
          </Text>
        )}
      </View>

      <Text variant="bodySmall" color="muted" numberOfLines={2} style={margins.mbMd}>
        {item.description}
      </Text>

      <View style={[layout.row, { gap: spacing.sm }]}>
        <Button
          title={t('home.viewButton')}
          variant="outline"
          size="small"
          onPress={() => onView(item)}
          style={layout.flex1}
        />
        <Button
          title={t('common.edit')}
          variant="secondary"
          size="small"
          onPress={() => onEdit(item)}
          style={layout.flex1}
        />
        <Button
          title={t('common.delete')}
          variant="danger"
          size="small"
          onPress={() => onDelete(item)}
          style={layout.flex1}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(ItemCard);
