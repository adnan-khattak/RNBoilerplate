# React Native Boilerplate

A production-ready React Native boilerplate with authentication, offline-first data fetching, theming, and internationalization.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Authentication Flow](#authentication-flow)
- [Data Fetching & Caching](#data-fetching--caching)
- [Theme System](#theme-system)
- [Localization & RTL Support](#localization--rtl-support)
- [Navigation](#navigation)
- [Push Notifications](#push-notifications)
- [Reusable Components](#reusable-components)
- [Configuration](#configuration)

---

## Features

- **Authentication** - Sign in/up with persistent sessions via MMKV
- **Offline-First** - MMKV caching with automatic network fallback
- **Dark/Light Theme** - System-aware theming with manual toggle
- **Multi-language** - English, French, Arabic with full RTL support
- **Push Notifications** - Firebase Cloud Messaging + Notifee
- **QR/Barcode Scanner** - Vision Camera integration
- **Type Safety** - Full TypeScript coverage with path aliases
- **Analytics** - Firebase Analytics built-in

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native 0.83 |
| Language | TypeScript |
| Navigation | React Navigation 7 |
| Server State | TanStack React Query 5 |
| Client State | React Context + Reducers |
| Storage | MMKV (encrypted, high-performance) |
| i18n | i18next + react-i18next |
| Notifications | Firebase Messaging + Notifee |
| Camera | Vision Camera |

---

## Project Structure

```
/
├── App.tsx                    # Root component with provider hierarchy
├── index.js                   # Entry point
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Button.tsx         # Multi-variant button
│   │   ├── Input.tsx          # Form input with validation
│   │   ├── Text.tsx           # Typography component
│   │   ├── Card.tsx           # Card container
│   │   ├── ItemCard.tsx       # Item display card
│   │   ├── Loading.tsx        # Loading indicator
│   │   ├── EmptyState.tsx     # Empty state UI
│   │   ├── ErrorState.tsx     # Error state UI
│   │   └── NetworkBanner.tsx  # Online/offline indicator
│   │
│   ├── screens/               # Screen components
│   │   ├── SignInScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── DetailScreen.tsx
│   │   ├── CreateScreen.tsx
│   │   ├── EditScreen.tsx
│   │   └── QRScannerScreen.tsx
│   │
│   ├── navigation/            # Navigation configuration
│   │   ├── RootNavigator.tsx  # Auth-aware navigator
│   │   ├── NavigationWrapper.tsx  # RTL-aware wrapper
│   │   └── types.ts           # Route type definitions
│   │
│   ├── state/                 # Global state management
│   │   ├── AuthContext.tsx    # Auth provider & useAuth hook
│   │   ├── authReducer.ts     # Auth state reducer
│   │   ├── authTypes.ts       # User, AuthState types
│   │   ├── AppContext.tsx     # General app state
│   │   ├── appReducer.ts      # App state reducer
│   │   └── LanguageContext.tsx # Language & RTL management
│   │
│   ├── services/              # API, hooks, storage
│   │   ├── api.ts             # CRUD API functions
│   │   ├── authApi.ts         # Auth API (login, register)
│   │   ├── hooks.ts           # React Query data hooks
│   │   ├── authHooks.ts       # React Query auth hooks
│   │   ├── authStorage.ts     # Token/user persistence (MMKV)
│   │   ├── languageStorage.ts # Language preference storage
│   │   ├── offlineCache.ts    # Offline data cache
│   │   ├── i18n/
│   │   │   └── i18nConfig.ts  # i18next setup
│   │   └── notification/
│   │       └── Notification.ts # Push notification service
│   │
│   ├── theme/                 # Theming system
│   │   ├── ThemeContext.tsx   # Theme provider & useTheme
│   │   ├── colors.theme.ts    # Light/dark color palettes
│   │   ├── themeStorage.ts    # Theme preference storage
│   │   ├── styles.ts          # Shared style utilities
│   │   └── index.ts
│   │
│   ├── locales/               # Translation files
│   │   ├── en.json            # English
│   │   ├── fr.json            # French
│   │   └── ar.json            # Arabic (RTL)
│   │
│   ├── config/                # App configuration
│   │   ├── constants.ts       # API config, keys, validation
│   │   └── strings.ts         # Fallback strings
│   │
│   └── utils/                 # Utility functions
│       └── hooks.ts           # Custom utility hooks
│
├── tsconfig.json              # TypeScript + path aliases
├── babel.config.js            # Babel + module resolver
└── package.json
```

---

## Architecture

### Provider Hierarchy

The app uses a layered provider architecture for clean separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    QueryClientProvider                       │
│         (React Query - server state & caching)              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   I18nextProvider                      │  │
│  │              (Translation functions)                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              LanguageProvider                    │  │  │
│  │  │         (Language state & RTL control)          │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │            ThemeProvider                   │  │  │  │
│  │  │  │       (Dark/light mode colors)            │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │          AuthProvider                │  │  │  │  │
│  │  │  │  │   (User session & auth actions)     │  │  │  │  │
│  │  │  │  │  ┌───────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │        AppProvider             │  │  │  │  │  │
│  │  │  │  │  │   (General app state)         │  │  │  │  │  │
│  │  │  │  │  │  ┌─────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │  NavigationWrapper      │  │  │  │  │  │  │
│  │  │  │  │  │  │  ┌───────────────────┐  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │  RootNavigator    │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  └───────────────────┘  │  │  │  │  │  │  │
│  │  │  │  │  │  └─────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  └───────────────────────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### State Management Pattern

```
┌────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                          │
├─────────────────────────────┬──────────────────────────────────┤
│       SERVER STATE          │         CLIENT STATE             │
│      (React Query)          │    (Context + Reducer)           │
├─────────────────────────────┼──────────────────────────────────┤
│                             │                                  │
│  • API response data        │  • Auth state (user, token)      │
│  • Automatic caching        │  • App state (loading, selected) │
│  • Background sync          │  • Language preference           │
│  • Optimistic updates       │  • Theme preference              │
│  • Offline support          │  • UI state                      │
│                             │                                  │
└─────────────────────────────┴──────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Watchman (macOS)
- Xcode 15+ (iOS)
- Android Studio (Android)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd RNBoilerplate

# Install dependencies
npm install

# iOS only: Install pods
cd ios && bundle install && bundle exec pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Environment Setup

1. Update API endpoint in `src/config/constants.ts`
2. Configure Firebase:
   - Add `google-services.json` to `android/app/`
   - Add `GoogleService-Info.plist` to `ios/`
3. Customize theme colors in `src/theme/colors.theme.ts`

---

## Authentication Flow

### Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   App Start │────▶│   Hydrate   │────▶│  Check Auth │
└─────────────┘     │  from MMKV  │     │   Status    │
                    └─────────────┘     └──────┬──────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
                    ▼                          ▼                          ▼
           ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
           │   No Token    │          │ Token Invalid │          │  Token Valid  │
           │   Show Auth   │          │   Show Auth   │          │   Show App    │
           └───────┬───────┘          └───────────────┘          └───────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌───────────────┐     ┌───────────────┐
│    Sign In    │     │    Sign Up    │
└───────┬───────┘     └───────┬───────┘
        │                     │
        └──────────┬──────────┘
                   ▼
        ┌─────────────────────┐
        │     API Request     │
        │    (authApi.ts)     │
        └──────────┬──────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌───────────────┐     ┌───────────────┐
│    Success    │     │    Failure    │
│  Store Token  │     │  Show Error   │
│  Navigate App │     │               │
└───────────────┘     └───────────────┘
```

### Auth Types

```typescript
// src/state/authTypes.ts
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
}
```

### Usage

```typescript
import { useAuth } from '@state/AuthContext';

function MyComponent() {
  const { authState, signIn, signUp, signOut } = useAuth();

  // Check auth status
  if (authState.status === 'authenticated') {
    console.log('User:', authState.user);
  }

  // Sign in
  await signIn('email@example.com', 'password');

  // Sign up
  await signUp({ name: 'John', email: 'john@example.com', password: 'pass' });

  // Sign out
  await signOut();
}
```

### Storage Keys

Authentication data is persisted in MMKV:

| Key | Content |
|-----|---------|
| `@auth_token` | JWT token |
| `@user_preferences` | User object (JSON) |

---

## Data Fetching & Caching

### Offline-First Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     DATA FETCHING FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────┐    ┌───────────────┐    ┌──────────────────┐    │
│   │  Screen  │───▶│  React Query  │───▶│    API Layer     │    │
│   │          │    │    Hook       │    │    (api.ts)      │    │
│   └──────────┘    └───────────────┘    └────────┬─────────┘    │
│                                                  │              │
│                         ┌────────────────────────┴────────┐     │
│                         │                                 │     │
│                         ▼                                 ▼     │
│                 ┌───────────────┐                ┌────────────┐ │
│                 │    Network    │                │   MMKV     │ │
│                 │    Request    │                │   Cache    │ │
│                 └───────┬───────┘                └──────┬─────┘ │
│                         │                               │       │
│            ┌────────────┴────────────┐                  │       │
│            ▼                         ▼                  │       │
│    ┌───────────────┐        ┌───────────────┐          │       │
│    │   Success     │        │   Failure     │──────────┘       │
│    │ Update Cache  │        │  Use Cache    │                  │
│    └───────────────┘        └───────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### React Query Hooks

```typescript
// src/services/hooks.ts

// Fetch all items (with offline fallback)
const { data, isLoading, error, refetch } = useItems();

// Fetch single item
const { data: item } = useItem(itemId);

// Create item
const createMutation = useCreateItem();
await createMutation.mutateAsync({ name, description, price });

// Update item
const updateMutation = useUpdateItem();
await updateMutation.mutateAsync({ id, name, description, price });

// Delete item
const deleteMutation = useDeleteItem();
await deleteMutation.mutateAsync(itemId);
```

### Cache Configuration

```typescript
// React Query defaults
staleTime: 5 * 60 * 1000,      // 5 minutes - data considered fresh
gcTime: 30 * 60 * 1000,        // 30 minutes - memory cache duration

// MMKV persistent cache
CACHE_DURATION: 60 * 60 * 1000  // 1 hour - disk cache expiry
```

### API Implementation Pattern

```typescript
// src/services/api.ts
export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch(`${API_PREFIX}/items`);
    const data = await response.json();

    // Cache on success
    itemsCacheService.save(data);
    return data;
  } catch (error) {
    // Fallback to cache on failure
    const cached = itemsCacheService.get();
    if (cached) return cached;
    throw error;
  }
};
```

---

## Theme System

### Theme Modes

| Mode | Behavior |
|------|----------|
| `light` | Always light theme |
| `dark` | Always dark theme |
| `system` | Follows device setting |

### Theme Context

```typescript
interface ThemeContextType {
  colorScheme: 'light' | 'dark' | 'system';
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}
```

### Usage

```typescript
import { useTheme } from '@theme';

function MyComponent() {
  const { colors, isDark, toggleTheme, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text.primary }}>
        Current theme: {isDark ? 'Dark' : 'Light'}
      </Text>

      <Button onPress={toggleTheme}>Toggle Theme</Button>

      <Button onPress={() => setTheme('system')}>
        Use System Theme
      </Button>
    </View>
  );
}
```

### Color Palette

Colors are defined in `src/theme/colors.theme.ts`:

```typescript
const lightColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  card: '#F8F9FA',
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
  border: '#E5E7EB',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  // ... 90+ color tokens
};

const darkColors = {
  // Inverted palette for dark mode
};
```

### Persistence

Theme preference is stored in MMKV under key `app.theme`.

---

## Localization & RTL Support

### Supported Languages

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR |
| French | `fr` | LTR |
| Arabic | `ar` | RTL |

### Language Context

```typescript
interface LanguageContextType {
  language: string;
  availableLanguages: string[];
  changeLanguage: (language: string) => Promise<void>;
  isRTL: boolean;
  isInitialized: boolean;
}
```

### Usage

```typescript
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '@state/LanguageContext';

function MyComponent() {
  const { t } = useTranslation();
  const { language, changeLanguage, isRTL } = useLanguageContext();

  return (
    <View>
      {/* Simple translation */}
      <Text>{t('home.title')}</Text>

      {/* With interpolation */}
      <Text>{t('home.deleteMessage', { name: 'Item 1' })}</Text>

      {/* Language switcher */}
      <Button onPress={() => changeLanguage('fr')}>
        Switch to French
      </Button>
    </View>
  );
}
```

### Translation File Structure

```json
// src/locales/en.json
{
  "common": {
    "ok": "OK",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete"
  },
  "home": {
    "title": "My Items",
    "addNew": "Add New",
    "deleteMessage": "Are you sure you want to delete {{name}}?"
  },
  "auth": {
    "email": "Email",
    "password": "Password",
    "signIn": "Sign In",
    "signUp": "Sign Up"
  },
  "profile": {
    "title": "My Profile",
    "darkMode": "Dark Mode",
    "language": "Language"
  }
}
```

### RTL Implementation

The app handles RTL layout changes without requiring a restart:

```
┌─────────────────────────────────────────────────────────────┐
│                    RTL SWITCH FLOW                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ User selects │───▶│ i18next      │───▶│ I18nManager  │  │
│  │   Arabic     │    │ changes lang │    │ forceRTL()   │  │
│  └──────────────┘    └──────────────┘    └──────┬───────┘  │
│                                                  │          │
│                                                  ▼          │
│                                         ┌──────────────┐   │
│                                         │ Update       │   │
│                                         │ rtlUpdateKey │   │
│                                         └──────┬───────┘   │
│                                                │           │
│                                                ▼           │
│                                         ┌──────────────┐   │
│                                         │ Navigation   │   │
│                                         │ re-renders   │   │
│                                         └──────────────┘   │
│                                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Navigation

### Stack Structure

```
RootNavigator
│
├── Auth Stack (when unauthenticated)
│   ├── SignIn
│   └── SignUp
│
└── App Stack (when authenticated)
    ├── Home (initial)
    ├── Profile
    ├── Create
    ├── Edit
    ├── Detail
    └── QRScanner
```

### Type Definitions

```typescript
// src/navigation/types.ts
type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type AppStackParamList = {
  Home: undefined;
  Detail: { item: Item };
  Create: undefined;
  Edit: { item: Item };
  Profile: undefined;
  QRScanner: undefined;
};
```

### Usage

```typescript
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

function MyScreen() {
  const navigation = useNavigation<NavigationProp>();

  // Navigate with params
  navigation.navigate('Detail', { item });

  // Go back
  navigation.goBack();
}
```

---

## Push Notifications

### Setup Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  NOTIFICATION SETUP                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. Request Permissions                                    │
│      └─▶ Firebase Messaging + Notifee                       │
│                                                             │
│   2. Get FCM Token                                          │
│      └─▶ Send to backend for targeting                      │
│                                                             │
│   3. Register Handlers                                      │
│      ├─▶ Foreground: Show local notification                │
│      ├─▶ Background: Firebase handles                       │
│      └─▶ Tap: Navigate based on data.screen                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Notification States

| State | Handler |
|-------|---------|
| Foreground | `messaging().onMessage()` |
| Background | `messaging().setBackgroundMessageHandler()` |
| Killed | Handled by Firebase |
| Tap (any state) | `notifee.onForegroundEvent()` |

### Notification Data Format

```typescript
interface NotificationData {
  screen?: string;  // Target screen name
  id?: string;      // Optional resource ID
}
```

---

## Reusable Components

### Button

```typescript
<Button
  title="Submit"
  variant="primary"    // primary | secondary | outline | ghost | danger | success
  size="medium"        // small | medium | large
  loading={false}
  disabled={false}
  leftIcon="check"
  onPress={handlePress}
/>
```

### Input

```typescript
<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  secureTextEntry={false}
  error="Invalid email"
/>
```

### Text

```typescript
<Text
  variant="h1"         // h1 | h2 | h3 | h4 | body | caption
  weight="bold"        // regular | semiBold | bold
  color="primary"      // primary | secondary | muted | danger
>
  Hello World
</Text>
```

### ItemCard

```typescript
<ItemCard
  item={item}
  onView={() => navigation.navigate('Detail', { item })}
  onEdit={() => navigation.navigate('Edit', { item })}
  onDelete={() => handleDelete(item.id)}
/>
```

### Loading & States

```typescript
// Loading indicator
<Loading message="Fetching data..." fullScreen />

// Empty state
<EmptyState
  title="No items"
  description="Add your first item"
  actionLabel="Add Item"
  onAction={() => navigation.navigate('Create')}
/>

// Error state
<ErrorState
  message="Failed to load"
  onRetry={refetch}
/>
```

---

## Configuration

### Constants

All app constants are in `src/config/constants.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-api.com/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_PREFERENCES: '@user_preferences',
  THEME_MODE: '@theme_mode',
};

export const QUERY_KEYS = {
  ITEMS: 'items',
  ITEM: (id: string) => ['items', id],
  USER: 'user',
};

export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
```

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@components": ["src/components"],
      "@screens": ["src/screens"],
      "@theme": ["src/theme"],
      "@services": ["src/services"],
      "@state": ["src/state"],
      "@config": ["src/config"],
      "@utils": ["src/utils"],
      "@navigation": ["src/navigation"]
    }
  }
}
```

Usage:

```typescript
import { Button } from '@components';
import { useAuth } from '@state/AuthContext';
import { API_CONFIG } from '@config/constants';
```

---

## Scripts

```bash
npm start          # Start Metro bundler
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run lint       # Run ESLint
npm test           # Run tests
```

---

## Customization Entry Points

| Feature | File |
|---------|------|
| API Endpoint | `src/config/constants.ts` |
| Auth Methods | `src/services/authApi.ts` |
| Screens | `src/screens/` + navigation types |
| Colors | `src/theme/colors.theme.ts` |
| Translations | `src/locales/{lang}.json` |
| Storage Keys | `src/config/constants.ts` |

---

## License

MIT
