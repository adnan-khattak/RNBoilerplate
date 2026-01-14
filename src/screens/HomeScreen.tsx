import React, {useCallback } from 'react';
import { View, FlatList, Alert, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, ItemCard } from '@components';
import { deleteItem, Item } from '@services/api';
import { useAuth } from '@state/AuthContext';
import { useTheme, spacing } from '@theme';
import { layout, margins, paddings, imageStyles, avatarStyles, contentStyles } from '@theme/styles';
import { AppStackParamList } from '@navigation/types';
import { useItems, useTranslationHook } from '@services/hooks';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;
const ITEM_HEIGHT = 160;
export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslationHook();
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
        t('home.deleteTitle'),
        t('home.deleteMessage', { name: item.name }),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.delete'),
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteItem(item.id);
                refetch(); // ✅ React Query refresh
              } catch {
                Alert.alert(
                  t('alerts.error'),
                  t('errors.deleteItem')
                );
              }
            },
          },
        ]
      );
    },
    [refetch, t]
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
        {t('home.noItemsTitle')}
      </Text>
      <Text
        variant="body"
        color="muted"
        align="center"
        style={margins.mtSm}
      >
        {t('home.noItemsDescription')}
      </Text>
    </View>
  );


  const { authState } = useAuth();
  const user = authState.user;
  return (
    <SafeAreaView style={[layout.container, { backgroundColor: colors.background }]}>
      {/* Header */}
       <View
        style={[
          layout.rowBetween,
          paddings.pxBase,
          paddings.pyMd,
          { 
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingTop: spacing.lg,
          },
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
          <Text variant="h3">{t('home.title')}</Text>
        </View>

        <Button
          title={t('home.addNew')}
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
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
