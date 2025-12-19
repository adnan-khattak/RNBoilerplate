import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from '@components';
import { Item } from '@services/api';
import { layout, margins, cardStyles } from '@theme/styles';
import { spacing } from '@theme';
import { STRINGS } from '@config';

interface Props {
  item: Item;
  onView: (item: Item) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemCard = ({ item, onView, onEdit, onDelete }: Props) => {
  return (
    <TouchableOpacity
      style={[cardStyles.base, margins.mbMd]}
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
          title={STRINGS.HOME.VIEW}
          variant="outline"
          size="small"
          onPress={() => onView(item)}
          style={layout.flex1}
        />
        <Button
          title={STRINGS.COMMON.EDIT}
          variant="secondary"
          size="small"
          onPress={() => onEdit(item)}
          style={layout.flex1}
        />
        <Button
          title={STRINGS.COMMON.DELETE}
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
