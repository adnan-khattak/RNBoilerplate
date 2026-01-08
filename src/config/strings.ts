/**
 * Global Strings / Text Content
 * Centralized text for easy localization and maintenance
 * 
 * CUSTOMIZATION:
 * - Update these strings to match your app's branding
 * - For multi-language support, replace with i18n library (react-i18next, etc.)
 * 
 * Usage:
 *   import { STRINGS } from '@config/strings';
 *   <Text>{STRINGS.APP.NAME}</Text>
 */

export const STRINGS = {
  // App Info
  APP: {
    NAME: 'My App',
    TAGLINE: 'Your tagline here',
    VERSION: '1.0.0',
  },

  // Common / Shared
  COMMON: {
    LOADING: 'Loading...',
    ERROR: 'Something went wrong',
    RETRY: 'Try Again',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    DELETE: 'Delete',
    EDIT: 'Edit',
    CREATE: 'Create',
    SUBMIT: 'Submit',
    CONFIRM: 'Confirm',
    BACK: 'Back',
    NEXT: 'Next',
    DONE: 'Done',
    YES: 'Yes',
    NO: 'No',
    OK: 'OK',
    CLOSE: 'Close',
    SEARCH: 'Search',
    NO_RESULTS: 'No results found',
    REQUIRED_FIELD: 'This field is required',
  },

  // Auth Screens
  AUTH: {
    // Sign In
    SIGN_IN: 'Sign In',
    SIGN_IN_TITLE: 'Welcome Back',
    SIGN_IN_SUBTITLE: 'Sign in to continue',
    SIGN_IN_BUTTON: 'Sign In',
    SIGN_IN_FAILED: 'Sign In Failed',
    
    // Sign Up
    SIGN_UP: 'Sign Up',
    SIGN_UP_TITLE: 'Create Account',
    SIGN_UP_SUBTITLE: 'Sign up to get started',
    SIGN_UP_BUTTON: 'Create Account',
    SIGN_UP_FAILED: 'Sign Up Failed',
    
    // Sign Out
    SIGN_OUT: 'Sign Out',
    SIGN_OUT_CONFIRM: 'Are you sure you want to sign out?',
    
    // Links
    NO_ACCOUNT: "Don't have an account?",
    HAS_ACCOUNT: 'Already have an account?',
    FORGOT_PASSWORD: 'Forgot Password?',
    
    // Placeholders
    EMAIL_PLACEHOLDER: 'you@example.com',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    NAME_PLACEHOLDER: 'John Doe',
    CONFIRM_PASSWORD_PLACEHOLDER: 'Re-enter password',
  },

  // Form Labels
  FORM: {
    EMAIL: 'Email',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    NAME: 'Name',
    FULL_NAME: 'Full Name',
    DESCRIPTION: 'Description',
    PRICE: 'Price',
    PRICE_OPTIONAL: 'Price (Optional)',
  },

  // Validation Messages
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
    PASSWORD_MISMATCH: 'Passwords do not match',
    NAME_REQUIRED: 'Name is required',
    NAME_MIN_LENGTH: 'Name must be at least 2 characters',
    DESCRIPTION_REQUIRED: 'Description is required',
    DESCRIPTION_MIN_LENGTH: 'Description must be at least 10 characters',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
  },

  // Home Screen
  HOME: {
    TITLE: 'My Items',
    ADD_NEW: '+ Add New',
    NO_ITEMS_TITLE: 'No Items Yet',
    NO_ITEMS_DESCRIPTION: 'Tap the button above to add your first item',
    DELETE_TITLE: 'Delete Item',
    DELETE_MESSAGE: (name: string) => `Are you sure you want to delete "${name}"?`,
    VIEW: 'View',
  },

  // Create Screen
  CREATE: {
    TITLE: 'New Item',
    HEADER: 'Create New Item',
    SUBTITLE: 'Fill in the details below to add a new item',
    SUCCESS: 'Item created successfully',
    ERROR: 'Failed to create item',
    PRICE_HELPER: 'Leave empty if not applicable',
  },

  // Edit Screen
  EDIT: {
    TITLE: 'Edit Item',
    HEADER: 'Edit Item',
    SUBTITLE: 'Update the item details below',
    SUCCESS: 'Item updated successfully',
    ERROR: 'Failed to update item',
    SAVE_CHANGES: 'Save Changes',
  },

  // Detail Screen
  DETAIL: {
    TITLE: 'Item Details',
    CREATED: 'Created',
    UPDATED: 'Last Updated',
    EDIT_BUTTON: 'Edit Item',
    DELETE_BUTTON: 'Delete Item',
    ERROR: 'Failed to delete item',
    DELETE_CONFIRM: (name: string) => 
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
  },

  // Profile Screen
  PROFILE: {
    TITLE: 'My Profile',
    ACCOUNT_INFO: 'Account Information',
    USER_ID: 'User ID',
    MEMBER_SINCE: 'Member Since',
    CUSTOMIZE_HINT: '💡 Customize this screen to add edit profile, change password, settings, etc.',
    NOTIFICATIONS: 'Push Notifications',
    NOTIFICATIONS_DESC: 'Control app notification permission.',
    NOTIFICATIONS_DENIED: 'Notifications are blocked. Enable them in your device settings to stay updated.',
    NOTIFICATIONS_DISABLE_INFO: 'To turn notifications off, use your device settings.',
    OPEN_SETTINGS: 'Open Settings',
  },

  // Errors
  ERRORS: {
    NETWORK: 'Network error. Please check your connection.',
    LOAD_ITEMS: 'Failed to load items',
    DELETE_ITEM: 'Failed to delete item',
    UNKNOWN: 'An unexpected error occurred',
  },

  // Success Messages
  SUCCESS: {
    ITEM_CREATED: 'Item created successfully',
    ITEM_UPDATED: 'Item updated successfully',
    ITEM_DELETED: 'Item deleted successfully',
  },

  // Alerts
  ALERTS: {
    SUCCESS: 'Success',
    ERROR: 'Error',
    WARNING: 'Warning',
    INFO: 'Info',
  },

  // Network Status
  NETWORK: {
    OFFLINE: 'You are offline',
    BACK_ONLINE: 'Back online',
  },
} as const;

// Type for accessing strings
export type StringKeys = typeof STRINGS;
