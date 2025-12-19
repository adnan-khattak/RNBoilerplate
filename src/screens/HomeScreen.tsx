import React, {useCallback } from 'react';
import { View, FlatList, Alert, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, ItemCard } from '@components';
import { deleteItem, Item } from '@services/api';
import { useAuth } from '@state/AuthContext';
import { COLORS, STRINGS } from '@config';
import { layout, margins, paddings, borderStyles, imageStyles, avatarStyles, headerStyles, contentStyles } from '@theme/styles';
import { AppStackParamList } from '@navigation/types';
import { useItems } from '@services/hooks';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;
const ITEM_HEIGHT = 160;
export default function HomeScreen({ navigation }: Props) {
   const {
    data: items = [],
    isLoading,
    isFetching,
    refetch,
  } = useItems();
  // const [items, setItems] = useState<Item[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
  
  // const fetchItems = useCallback(async () => {
  //   try {
  //     const data = await getItems();
  //     setItems(data);
  //   } catch {
  //     Alert.alert(STRINGS.ALERTS.ERROR, STRINGS.ERRORS.LOAD_ITEMS);
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchItems();
  // }, [fetchItems]);

  // Refresh when screen is focused
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     fetchItems();
  //   });
  //   return unsubscribe;
  // }, [navigation, fetchItems]);

   const handleDelete = useCallback(
    (item: Item) => {
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
                refetch(); // ✅ React Query refresh
              } catch {
                Alert.alert(
                  STRINGS.ALERTS.ERROR,
                  STRINGS.ERRORS.DELETE_ITEM
                );
              }
            },
          },
        ]
      );
    },
    [refetch]
  );

 const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const onView = useCallback(
    (item: Item) => navigation.navigate('Detail', { item }),
    [navigation]
  );

  const onEdit = useCallback(
    (item: Item) => navigation.navigate('Edit', { item }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <ItemCard
        item={item}
        onView={onView}
        onEdit={onEdit}
        onDelete={handleDelete}
      />
    ),
    [onView, onEdit, handleDelete]
  );



  const renderEmpty = () => (
    <View style={[layout.flex1, layout.center, contentStyles.emptyContainer]}>
      <Text variant="h4" color="muted" align="center">
        {STRINGS.HOME.NO_ITEMS_TITLE}
      </Text>
      <Text
        variant="body"
        color="muted"
        align="center"
        style={margins.mtSm}
      >
        {STRINGS.HOME.NO_ITEMS_DESCRIPTION}
      </Text>
    </View>
  );


  const { authState } = useAuth();
  const user = authState.user;
  return (
    <SafeAreaView style={layout.container}>
      {/* Header */}
       <View
        style={[
          layout.rowBetween,
          paddings.pxBase,
          paddings.pyMd,
          borderStyles.borderBottom,
          headerStyles.container,
          headerStyles.topPadding,
        ]}
      >
        <View style={layout.rowCenter}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={margins.mrMd}
          >
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={[imageStyles.avatarMedium, imageStyles.avatarPlaceholder]}
              />
            ) : (
              <View style={avatarStyles.initialsContainer}>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
        contentContainerStyle={[
          paddings.pBase,
          paddings.p2xl,
          contentStyles.listContent,
        ]}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
