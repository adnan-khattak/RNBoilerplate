/**
 * Custom Hooks for API operations
 * Encapsulates React Query logic for easy reuse
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '../config/constants';
import { getItems, getItem, createItem, updateItem, deleteItem, Item } from './api';

/**
 * Hook to fetch all items
 */
export const useItems = (options?: Omit<UseQueryOptions<Item[], Error>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ITEMS],
    queryFn: getItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Hook to fetch a single item by ID
 */
export const useItem = (id: string, options?: Omit<UseQueryOptions<Item, Error>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITEM(id),
    queryFn: () => getItem(id),
    enabled: !!id,
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
