/**
 * Auth API Service
 * Handles authentication API calls (login, register, etc.)
 * 
 * CUSTOMIZATION:
 * - Update API_CONFIG.BASE_URL in src/config/constants.ts
 * - Modify request/response structure to match your backend
 * - Add additional auth methods (forgot password, verify email, etc.)
 * 
 * MOCKAPI SETUP:
 * This uses MockAPI.io for demo. Create a "users" endpoint with fields:
 * - id (string)
 * - email (string)
 * - name (string)
 * - password (string)
 * - avatar (string, optional)
 * - createdAt (string)
 */

import { API_CONFIG } from '@config';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@state/authTypes';

const AUTH_ENDPOINT = `${API_CONFIG.BASE_URL}/users`;

/**
 * Generate a mock token (for demo purposes)
 * CUSTOMIZATION: Your real backend should return a JWT token
 */
const generateMockToken = (userId: string): string => {
  return `mock_token_${userId}_${Date.now()}`;
};

export const authApi = {
  /**
   * Login with email and password
   * 
   * MockAPI Note: MockAPI doesn't support authentication, so we:
   * 1. Fetch user by email
   * 2. Verify password matches
   * 3. Return user + mock token
   * 
   * CUSTOMIZATION: Replace with your actual login endpoint
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      // Search for user by email
      const response = await fetch(`${AUTH_ENDPOINT}?email=${encodeURIComponent(credentials.email)}`);
      
      if (!response.ok) {
        throw new Error('Network error');
      }

      const users: (User & { password?: string })[] = await response.json();

      if (users.length === 0) {
        throw new Error('User not found');
      }

      const user = users[0];

      // Verify password (MockAPI stores password in plain text - NOT for production!)
      if (user.password !== credentials.password) {
        throw new Error('Invalid password');
      }

      // Remove password from user object before returning
      delete user.password;

      return {
        user: user as User,
        token: generateMockToken(user.id),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed');
    }
  },

  /**
   * Register a new user
   * 
   * CUSTOMIZATION: Replace with your actual register endpoint
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      // Check if email already exists
      const checkResponse = await fetch(`${AUTH_ENDPOINT}?email=${encodeURIComponent(data.email)}`);
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        throw new Error('Email already registered');
      }

      // Create new user
      const response = await fetch(AUTH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password, // Note: MockAPI stores plain text - NOT for production!
          name: data.name,
          avatar: `https://i.pravatar.cc/150?u=${data.email}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const newUser: User & { password?: string } = await response.json();
      delete newUser.password;

      return {
        user: newUser as User,
        token: generateMockToken(newUser.id),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Registration failed');
    }
  },

  /**
   * Get current user profile
   * 
   * CUSTOMIZATION: Replace with your actual /me or /profile endpoint
   */
  getCurrentUser: async (token: string): Promise<User> => {
    // Extract user ID from mock token
    const parts = token.split('_');
    const userId = parts[2];

    if (!userId) {
      throw new Error('Invalid token');
    }

    const response = await fetch(`${AUTH_ENDPOINT}/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const user: User & { password?: string } = await response.json();
    delete user.password;

    return user as User;
  },

  /**
   * Update user profile
   */
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await fetch(`${AUTH_ENDPOINT}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  },
};
