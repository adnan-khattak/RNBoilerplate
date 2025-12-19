/**
 * Helper/Utility Functions
 * Contains reusable utility functions for the app
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';

// ============================================
// DEVICE & SCREEN UTILITIES
// ============================================

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Get screen dimensions
 */
export const getScreenDimensions = () => ({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});

/**
 * Check if device is iOS
 */
export const isIOS = Platform.OS === 'ios';

/**
 * Check if device is Android
 */
export const isAndroid = Platform.OS === 'android';

/**
 * Check if device is small screen (iPhone SE, etc.)
 */
export const isSmallDevice = SCREEN_WIDTH < 375;

/**
 * Check if device is tablet
 */
export const isTablet = SCREEN_WIDTH >= 768;

/**
 * Normalize font size based on screen width
 * Base width: 375 (iPhone 6/7/8)
 */
export const normalizeFont = (size: number): number => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Normalize size based on screen width (for spacing, widths, etc.)
 */
export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / 375;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Calculate responsive width percentage
 */
export const wp = (percentage: number): number => {
  return (percentage / 100) * SCREEN_WIDTH;
};

/**
 * Calculate responsive height percentage
 */
export const hp = (percentage: number): number => {
  return (percentage / 100) * SCREEN_HEIGHT;
};

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize each word in a string
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str.split(' ').map(capitalize).join(' ');
};

/**
 * Truncate string with ellipsis
 */
export const truncate = (str: string, length: number): string => {
  if (!str) return '';
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};

/**
 * Check if string is empty or only whitespace
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Remove extra whitespace from string
 */
export const cleanWhitespace = (str: string): string => {
  return str.replace(/\s+/g, ' ').trim();
};

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Format number with commas (e.g., 1000 -> 1,000)
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format currency
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Clamp a number between min and max
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Generate random number between min and max (inclusive)
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Chunk array into smaller arrays
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Shuffle array randomly
 */
export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Remove duplicates from array
 */
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * Get last item from array
 */
export const last = <T>(array: T[]): T | undefined => {
  return array[array.length - 1];
};

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Format date to readable string
 */
export const formatDate = (
  date: Date | string | undefined,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (!d || !d.getTime || isNaN(d.getTime())) return '-';
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return d.toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const timeAgo = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * Returns true if password has at least 8 chars, 1 uppercase, 1 lowercase, 1 number
 */
export const isStrongPassword = (password: string): boolean => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongRegex.test(password);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ============================================
// OBJECT UTILITIES
// ============================================

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if two objects are deeply equal
 */
export const deepEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Pick specific keys from an object
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Omit specific keys from an object
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
};

// ============================================
// ASYNC UTILITIES
// ============================================

/**
 * Delay execution for specified milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// ============================================
// STYLE UTILITIES
// ============================================

/**
 * Conditionally apply styles
 * Usage: styleIf(condition, trueStyle, falseStyle)
 */
export const styleIf = <T>(
  condition: boolean,
  trueStyle: T,
  falseStyle?: T
): T | undefined => {
  return condition ? trueStyle : falseStyle;
};

/**
 * Combine multiple styles conditionally
 * Usage: combineStyles(baseStyle, [condition1, style1], [condition2, style2])
 */
export const combineStyles = <T>(
  baseStyle: T,
  ...conditionalStyles: [boolean, T][]
): T[] => {
  const styles = [baseStyle];
  conditionalStyles.forEach(([condition, style]) => {
    if (condition) {
      styles.push(style);
    }
  });
  return styles;
};

// ============================================
// MISC UTILITIES
// ============================================

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Safely parse JSON
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

/**
 * Get initials from name
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, maxLength);
};
