import { createMMKV } from 'react-native-mmkv';
import type { ColorScheme } from './colors.theme';

const storage = createMMKV({
  id: 'theme-storage',
});

const THEME_KEY = 'app.theme';

export const themeStorage = {
  getTheme: (): ColorScheme | null => {
    const theme = storage.getString(THEME_KEY);
    if (theme === 'light' || theme === 'dark' || theme === 'system') {
      return theme;
    }
    return null;
  },

  setTheme: (theme: ColorScheme): void => {
    storage.set(THEME_KEY, theme);
  },

  clearTheme: (): void => {
    // Use remove for a single key
    storage.remove(THEME_KEY);
  },

  clearAllThemes: (): void => {
    // If you ever want to clear everything
    storage.clearAll();
  },
};
