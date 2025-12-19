import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Alert, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from '@components';
import { getItems, deleteItem, Item } from '@services/api';
import { useAuth } from '@state/AuthContext';
import { COLORS, STRINGS } from '@config';
import { spacing } from '@theme';
import { layout, margins, paddings, cardStyles, borderStyles } from '@theme/styles';
import { AppStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch {
      Alert.alert(STRINGS.ALERTS.ERROR, STRINGS.ERRORS.LOAD_ITEMS);
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
      STRINGS.HOME.DELETE_TITLE,
      STRINGS.HOME.DELETE_MESSAGE(item.name),
      [
        { text: STRINGS.COMMON.CANCEL, style: 'cancel' },
        {
          text: STRINGS.COMMON.DELETE,
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItem(item.id);
              fetchItems();
            } catch {
              Alert.alert(STRINGS.ALERTS.ERROR, STRINGS.ERRORS.DELETE_ITEM);
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
          onPress={() => navigation.navigate('Detail', { item })}
          style={layout.flex1}
        />
        <Button
          title={STRINGS.COMMON.EDIT}
          variant="secondary"
          size="small"
          onPress={() => navigation.navigate('Edit', { item })}
          style={layout.flex1}
        />
        <Button
          title={STRINGS.COMMON.DELETE}
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
      <Text variant="h4" color="muted" align="center">{STRINGS.HOME.NO_ITEMS_TITLE}</Text>
      <Text variant="body" color="muted" align="center" style={margins.mtSm}>
        {STRINGS.HOME.NO_ITEMS_DESCRIPTION}
      </Text>
    </View>
  );

  const { authState } = useAuth();
  const user = authState.user;

  return (
    <SafeAreaView style={layout.container}>
      {/* Header */}
      <View style={[layout.rowBetween, paddings.pxBase, paddings.pyMd, borderStyles.borderBottom, { backgroundColor: COLORS.white, paddingTop: spacing.lg }]}>
        <View style={layout.rowCenter}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={margins.mrMd}>
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.gray200 }}
              />
            ) : (
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                <Text variant="body" color="white" weight="semiBold">
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text variant="h3">{STRINGS.HOME.TITLE}</Text>
        </View>
        <Button
          title={STRINGS.HOME.ADD_NEW}
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
        contentContainerStyle={[paddings.pBase, paddings.p2xl, { flexGrow: 1 }]}
        ListEmptyComponent={!loading ? renderEmpty : null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
