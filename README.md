# React Native CRUD Boilerplate

This boilerplate is for production-ready React Native apps with auth, API, offline support, theming, notifications, and scalability.

## ✨ Features

- **🔐 Authentication** - Complete auth flow (SignIn/SignUp) with MockAPI
- **TypeScript** - Type-safe development
- **React Navigation v7** - Native stack navigation with typed routes & auth guards
- **React Query (TanStack Query)** - Powerful data fetching & caching
- **Context + Reducer** - Lightweight global state management
- **Theming System** - Design tokens (colors, spacing, typography)
- **Reusable Components** - Button, Input, Text, Card, Loading, EmptyState, ErrorState
- **Path Aliases** - Clean imports with `@components`, `@screens`, etc.
- **CRUD Ready** - Complete Create, Read, Update, Delete flow

## 📁 Project Structure

```
src/
├── assets/          # Images, fonts, etc.
├── components/      # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── Input.tsx
│   ├── Loading.tsx
│   ├── Text.tsx
│   └── index.ts
├── config/          # App configuration & constants
│   ├── constants.ts     # API config & feature flags
│   ├── strings.ts       # 🌐 All app text (easy i18n)
│   ├── colors.ts        # 🎨 Global color palette
│   └── index.ts
├── navigation/      # Navigation setup & types
│   ├── RootNavigator.tsx  # Auth-aware navigator
│   └── types.ts           # AuthStack & AppStack types
├── screens/         # Screen components
│   ├── SignInScreen.tsx   # 🔐 Auth
│   ├── SignUpScreen.tsx   # 🔐 Auth
│   ├── HomeScreen.tsx
│   ├── CreateScreen.tsx
│   ├── DetailScreen.tsx
│   ├── EditScreen.tsx
│   └── ProfileScreen.tsx  # User profile & logout
├── services/        # API calls & hooks
│   ├── api.ts           # CRUD API functions
│   ├── authApi.ts       # 🔐 Auth API (login, register)
│   ├── authStorage.ts   # 🔐 Token/user persistence
│   ├── authHooks.ts     # 🔐 React Query auth hooks
│   ├── hooks.ts         # CRUD React Query hooks
│   └── index.ts
├── state/           # Global state (Context + Reducer)
│   ├── AuthContext.tsx   # 🔐 Auth provider & useAuth hook
│   ├── authReducer.ts    # 🔐 Auth state reducer
│   ├── authTypes.ts      # 🔐 User, AuthState types
│   ├── AppContext.tsx
│   ├── appReducer.ts
│   └── appTypes.ts
├── theme/           # Design tokens & styles
│   ├── theme.ts
│   ├── styles.ts
│   └── index.ts
└── utils/           # Helper functions
    └── helpers.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd rnBoilerplate

# Install dependencies
npm install

# iOS only: Install pods
cd ios && bundle install && bundle exec pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 🎨 Using the Theme

```tsx
import { colors, spacing, typography } from '@theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.base,
  },
  title: {
    fontSize: typography.fontSize.xl,
    color: colors.text,
  },
});
```

## 📦 Using Components

```tsx
import { Button, Text, Input, Card, Loading, EmptyState } from '@components';

// Button variants: primary, secondary, outline, ghost, danger, success
<Button title="Submit" variant="primary" onPress={handleSubmit} />

// Text with variants
<Text variant="h1">Heading</Text>
<Text variant="body" color="muted">Description</Text>

// Input with validation
<Input label="Email" error={errors.email} required />

// Loading state
<Loading message="Fetching data..." fullScreen />

// Empty state
<EmptyState 
  title="No items" 
  description="Add your first item" 
  actionLabel="Add Item"
  onAction={() => navigation.navigate('Create')}
/>
```

## 🔐 Authentication

The boilerplate includes a complete auth flow using MockAPI.

### Using Auth Context

```tsx
import { useAuth } from '@state/AuthContext';

function MyComponent() {
  const { authState, signIn, signUp, signOut } = useAuth();

  // Check auth status
  if (authState.status === 'authenticated') {
    console.log('User:', authState.user);
  }

  // Sign in
  await signIn({ email: 'user@example.com', password: 'password123' });

  // Sign up
  await signUp({ name: 'John', email: 'john@example.com', password: 'password123' });

  // Sign out
  await signOut();
}
```

### MockAPI Setup for Auth

Create a `users` endpoint in MockAPI with these fields:
- `id` (string)
- `email` (string)
- `name` (string)
- `password` (string)
- `avatar` (string, optional)
- `createdAt` (string)

### Customizing Auth for Your Backend

1. **Update API endpoints** in `src/services/authApi.ts`
2. **Modify User type** in `src/state/authTypes.ts`
3. **Enable persistent storage** - Uncomment AsyncStorage in `src/services/authStorage.ts`:
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

## 🔌 Using API Hooks

```tsx
import { useItems, useCreateItem, useUpdateItem, useDeleteItem } from '@services';

// Fetch all items
const { data: items, isLoading, error, refetch } = useItems();

// Create item
const createMutation = useCreateItem();
createMutation.mutate({ name: 'New Item', description: 'Details' });

// Update item  
const updateMutation = useUpdateItem();
updateMutation.mutate({ id: '123', data: { name: 'Updated' } });

// Delete item
const deleteMutation = useDeleteItem();
deleteMutation.mutate('123');
```

## 🛠 Customization

### Changing API Base URL

Edit `src/config/constants.ts`:

```ts
export const API_CONFIG = {
  BASE_URL: 'https://your-api.com/v1',
  // ...
};
```

### 🎨 Customizing Colors

All colors are centralized in `src/config/colors.ts`. Update them to match your brand:

```ts
// src/config/colors.ts
export const COLORS = {
  // Primary - Change to your brand color
  primary: '#007AFF',        // Main buttons, links
  primaryLight: '#4DA2FF',   // Hover states
  primaryDark: '#0055B3',    // Pressed states

  // Secondary
  secondary: '#5856D6',

  // Semantic
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Backgrounds
  background: '#F8F9FA',
  card: '#FFFFFF',
  
  // Text
  text: '#1C1C1E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',

  // ...more colors
};
```

### 🌐 Customizing Strings (i18n Ready)

All app text is in `src/config/strings.ts`. Easy to translate or customize:

```ts
// src/config/strings.ts
export const STRINGS = {
  AUTH: {
    SIGN_IN: 'Sign In',
    SIGN_UP: 'Sign Up',
    EMAIL_PLACEHOLDER: 'Enter your email',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    // Add more...
  },
  HOME: {
    TITLE: 'Items',
    ADD_ITEM: 'Add Item',
    SEARCH_PLACEHOLDER: 'Search items...',
  },
  PROFILE: {
    TITLE: 'Profile',
    LOGOUT: 'Logout',
    LOGOUT_CONFIRM: 'Are you sure you want to logout?',
  },
  // ...more sections
};
```

**Usage in components:**
```tsx
import { STRINGS, COLORS } from '@config';

<Text style={{ color: COLORS.primary }}>{STRINGS.HOME.TITLE}</Text>
<Button 
  title={STRINGS.AUTH.SIGN_IN} 
  color={COLORS.success} 
/>
```

### Adding New Screens

1. Create screen in `src/screens/`
2. Add to `src/screens/index.ts`
3. Add route type in `src/navigation/types.ts`
4. Register in `src/navigation/RootNavigator.tsx`

### Adding New Components

1. Create component in `src/components/`
2. Export from `src/components/index.ts`

## 📝 Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🤝 Contributing

Feel free to submit issues and pull requests.

## 📄 License

MIT

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
# RNBoilerplate
