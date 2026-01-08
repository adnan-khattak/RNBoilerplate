/**
 * Custom Hooks for API operations
 * Encapsulates React Query logic for easy reuse
 * Supports offline-first caching with MMKV
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '@config';
import { getItems, getItem, createItem, updateItem, deleteItem, Item } from './api';
import { itemsCacheService, itemCacheService } from './offlineCache';

/**
 * Hook to fetch all items
 * Displays cached data immediately, then fetches fresh data
 * Falls back to cache if offline
 */
export const useItems = (options?: Omit<UseQueryOptions<Item[], Error>, 'queryKey' | 'queryFn'>) => {
  // Get initial data from cache for instant display
  const cachedItems = itemsCacheService.get();

  return useQuery({
    queryKey: [QUERY_KEYS.ITEMS],
    queryFn: getItems,
    initialData: cachedItems || undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    ...options,
  });
};

/**
 * Hook to fetch a single item by ID
 * Displays cached data immediately, then fetches fresh data
 * Falls back to cache if offline
 */
export const useItem = (id: string, options?: Omit<UseQueryOptions<Item, Error>, 'queryKey' | 'queryFn'>) => {
  // Get initial data from cache for instant display
  const cachedItem = itemCacheService.get(id);

  return useQuery({
    queryKey: QUERY_KEYS.ITEM(id),
    queryFn: () => getItem(id),
    initialData: cachedItem || undefined,
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    ...options,
  });
};

/**
 * Hook to create a new item
 */
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ITEMS] });
    },
  });
};

/**
 * Hook to update an existing item
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>> }) =>
      updateItem(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ITEMS] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEM(variables.id) });
    },
  });
};

/**
 * Hook to delete an item
 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ITEMS] });
    },
  });
};
