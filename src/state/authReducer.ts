/**
 * Auth Reducer
 * Handles authentication state transitions
 */

import { AuthState, AuthAction } from './authTypes';

export const authInitialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        status: 'checking',
      };

    case 'AUTH_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
      };

    case 'AUTH_HYDRATE':
      if (action.payload) {
        return {
          user: action.payload.user,
          token: action.payload.token,
          status: 'authenticated',
        };
      }
      return {
        user: null,
        token: null,
        status: 'unauthenticated',
      };

    case 'AUTH_LOGOUT':
    case 'AUTH_ERROR':
      return {
        user: null,
        token: null,
        status: 'unauthenticated',
      };

    default:
      return state;
  }
};
