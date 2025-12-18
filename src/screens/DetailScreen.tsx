import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '../components';
import { deleteItem } from '../services/api';
import { colors, spacing, borderRadius } from '../theme/theme';
import { layout, margins, paddings, cardStyles, dividerStyles } from '../theme/styles';
import { RootStackParamList } from '../navigation/types';
import { formatDate, formatCurrency } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ navigation, route }: Props) {
  const { item } = route.params;

  const handleEdit = () => {
    navigation.navigate('Edit', { item });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItem(item.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={layout.container} contentContainerStyle={[paddings.pBase, paddings.pb2xl]}>
      {/* Main Card */}
      <View style={cardStyles.elevated}>
        {/* Header with Name and Price */}
        <View style={layout.rowBetween}>
          <Text variant="h2" style={[layout.flex1, margins.mrMd]}>{item.name}</Text>
          {item.price !== undefined && (
            <View style={[paddings.pxMd, paddings.pySm, { backgroundColor: colors.primary, borderRadius: borderRadius.md }]}>
              <Text variant="h4" color="white">
                {formatCurrency(item.price)}
              </Text>
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={[dividerStyles.horizontal, margins.myLg]} />

        {/* Description */}
        <View style={margins.mbLg}>
          <Text variant="label" color="muted" style={margins.mbXs}>
            Description
          </Text>
          <Text variant="body">{item.description}</Text>
        </View>

        {/* Metadata */}
        <View style={[paddings.pMd, { backgroundColor: colors.backgroundSecondary, borderRadius: borderRadius.md, gap: spacing.sm }]}>
          <View style={layout.rowBetween}>
            <Text variant="caption" color="muted">Created</Text>
            <Text variant="bodySmall">{formatDate(item.createdAt)}</Text>
          </View>
          <View style={layout.rowBetween}>
            <Text variant="caption" color="muted">Last Updated</Text>
            <Text variant="bodySmall">{formatDate(item.updatedAt)}</Text>
          </View>
          <View style={layout.rowBetween}>
            <Text variant="caption" color="muted">Item ID</Text>
            <Text variant="bodySmall">#{item.id}</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={margins.mtXl}>
        <Button
          title="Edit Item"
          variant="primary"
          fullWidth
          onPress={handleEdit}
          style={margins.mbMd}
        />
        <Button
          title="Delete Item"
          variant="danger"
          fullWidth
          onPress={handleDelete}
          style={margins.mbMd}
        />
        <Button
          title="Back to List"
          variant="ghost"
          fullWidth
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}
