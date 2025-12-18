/**
 * Auth Types
 * Define all authentication-related types
 * 
 * CUSTOMIZATION: Modify User interface to match your backend
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt?: string;
}

export type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
}

export type AuthAction =
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_ERROR' }
  | { type: 'AUTH_HYDRATE'; payload: { user: User; token: string } | null };

// API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
