# React Native CRUD Boilerplate

A production-ready React Native boilerplate with CRUD operations, featuring TypeScript, React Navigation, React Query, and a comprehensive theming system.

## ✨ Features

- **TypeScript** - Type-safe development
- **React Navigation v7** - Native stack navigation with typed routes
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
│   └── constants.ts
├── navigation/      # Navigation setup & types
│   ├── RootNavigator.tsx
│   └── types.ts
├── screens/         # Screen components
│   ├── CreateScreen.tsx
│   ├── DetailScreen.tsx
│   ├── EditScreen.tsx
│   ├── HomeScreen.tsx
│   └── ProfileScreen.tsx
├── services/        # API calls & hooks
│   ├── api.ts       # Raw API functions
│   ├── hooks.ts     # React Query hooks
│   └── index.ts
├── state/           # Global state (Context + Reducer)
│   ├── AppContext.tsx
│   ├── appReducer.ts
│   └── appTypes.ts
├── theme/           # Design tokens & styles
│   ├── theme.ts     # Colors, spacing, typography
│   ├── styles.ts    # Reusable StyleSheet styles
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
