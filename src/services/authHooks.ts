/**
 * Auth Hooks
 * React Query hooks for authentication operations
 * 
 * Note: These hooks are optional - you can also use useAuth() directly
 * These provide React Query benefits like loading states, error handling, caching
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../config/constants';
import { authApi } from './authApi';
import { authStorage } from './authStorage';
import { LoginRequest, RegisterRequest } from '../state/authTypes';

/**
 * Hook to get current user (useful for profile screens)
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: async () => {
      const token = await authStorage.getToken();
      if (!token) {
        throw new Error('No token');
      }
      return authApi.getCurrentUser(token);
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for login mutation
 * Use this if you want React Query's mutation features
 */
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });
};

/**
 * Hook for register mutation
 */
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });
};

/**
 * Hook for updating user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Parameters<typeof authApi.updateProfile>[1] }) =>
      authApi.updateProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });
};
