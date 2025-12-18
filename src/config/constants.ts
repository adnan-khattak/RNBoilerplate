/**
 * Application Constants
 * Centralized configuration values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'https://6943ce467dd335f4c35e2feb.mockapi.io/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// Query Keys - Centralized for React Query
export const QUERY_KEYS = {
  ITEMS: 'items',
  ITEM: (id: string) => ['items', id],
  USER: 'user',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_PREFERENCES: '@user_preferences',
  THEME_MODE: '@theme_mode',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Validation Rules
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 500,
  PASSWORD_MIN_LENGTH: 8,
} as const;

// App Info
export const APP_INFO = {
  NAME: 'rnBoilerplate',
  VERSION: '0.0.1',
  BUILD_NUMBER: '1',
} as const;
