import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '../components';
import { getItems, deleteItem, Item } from '../services/api';
import { colors, spacing } from '../theme/theme';
import { layout, margins, paddings, cardStyles, borderStyles } from '../theme/styles';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load items');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Refresh when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchItems();
    });
    return unsubscribe;
  }, [navigation, fetchItems]);

  const handleDelete = (item: Item) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItem(item.id);
              fetchItems();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={[cardStyles.base, margins.mbMd]}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <View style={[layout.rowBetween, { alignItems: 'flex-start', marginBottom: spacing.xs }]}>
        <Text variant="h5" style={[layout.flex1, margins.mrSm]}>{item.name}</Text>
        {item.price && (
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
          title="View"
          variant="outline"
          size="small"
          onPress={() => navigation.navigate('Detail', { item })}
          style={layout.flex1}
        />
        <Button
          title="Edit"
          variant="secondary"
          size="small"
          onPress={() => navigation.navigate('Edit', { item })}
          style={layout.flex1}
        />
        <Button
          title="Delete"
          variant="danger"
          size="small"
          onPress={() => handleDelete(item)}
          style={layout.flex1}
        />
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={[layout.flex1, layout.center, { paddingVertical: spacing['4xl'] }]}>
      <Text variant="h4" color="muted" align="center">No Items Yet</Text>
      <Text variant="body" color="muted" align="center" style={margins.mtSm}>
        Tap the button above to add your first item
      </Text>
    </View>
  );

  return (
    <View style={layout.container}>
      {/* Header */}
      <View style={[layout.rowBetween, paddings.pxBase, paddings.pyMd, borderStyles.borderBottom, { backgroundColor: colors.white }]}>
        <Text variant="h3">My Items</Text>
        <Button
          title="+ Add New"
          variant="primary"
          size="small"
          onPress={() => navigation.navigate('Create')}
        />
      </View>

      {/* Items List */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={[paddings.pBase, paddings.pb2xl, { flexGrow: 1 }]}
        ListEmptyComponent={!loading ? renderEmpty : null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
