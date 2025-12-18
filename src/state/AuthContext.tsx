/**
 * Auth Context
 * Provides authentication state and actions throughout the app
 * 
 * Usage:
 *   const { authState, signIn, signOut, signUp } = useAuth();
 */

import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { authReducer, authInitialState } from './authReducer';
import { AuthState, LoginRequest, RegisterRequest } from './authTypes';
import { authStorage } from '../services/authStorage';
import { authApi } from '../services/authApi';

interface AuthContextType {
  authState: AuthState;
  signIn: (credentials: LoginRequest) => Promise<void>;
  signUp: (data: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);

  // Hydrate auth state from storage on app start
  useEffect(() => {
    const hydrateAuth = async () => {
      dispatch({ type: 'AUTH_LOADING' });
      try {
        const storedAuth = await authStorage.getAuth();
        dispatch({ type: 'AUTH_HYDRATE', payload: storedAuth });
      } catch {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };

    hydrateAuth();
  }, []);

  const signIn = useCallback(async (credentials: LoginRequest) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const response = await authApi.login(credentials);
      await authStorage.setAuth(response.user, response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      throw error;
    }
  }, []);

  const signUp = useCallback(async (data: RegisterRequest) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const response = await authApi.register(data);
      await authStorage.setAuth(response.user, response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authStorage.clearAuth();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch {
      // Still logout even if storage clear fails
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
