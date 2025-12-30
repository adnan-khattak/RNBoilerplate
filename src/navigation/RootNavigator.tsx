/**
 * Root Navigator
 * Handles authentication flow - shows Auth screens or App screens based on auth state
 *
 * CUSTOMIZATION:
 * - Add more screens to AuthStack or AppStack as needed
 * - Modify screen options for custom headers
 */
import React, { Suspense } from 'react';
// REMOVED: import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@state/AuthContext';
import { COLORS, STRINGS } from '@config';
import { AuthStackParamList, AppStackParamList } from '@navigation/types';

// Auth Screens
import SignInScreen from '@screens/SignInScreen';
import SignUpScreen from '@screens/SignUpScreen';

// App Screens
import HomeScreen from '@screens/HomeScreen';
const ProfileScreen = React.lazy(() => import('@screens/ProfileScreen'));
const CreateScreen = React.lazy(() => import('@screens/CreateScreen'));
const EditScreen = React.lazy(() => import('@screens/EditScreen'));
const DetailScreen = React.lazy(() => import('@screens/DetailScreen'));

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

// Shared screen options
const screenOptions = {
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerTintColor: COLORS.primary,
  headerTitleStyle: {
    fontWeight: '600' as const,
  },
  contentStyle: {
    backgroundColor: COLORS.backgroundSecondary,
  },
};

/**
 * Auth Navigator - Shown when user is not authenticated
 */
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

/**
 * App Navigator - Shown when user is authenticated
 */
function AppNavigator() {
  return (
    <AppStack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Profile"
        options={{ title: STRINGS.PROFILE.TITLE }}
      >
        {props => (
          <Suspense fallback={<LoadingScreen />}>
            <ProfileScreen {...props} />
          </Suspense>
        )}
      </AppStack.Screen>

      <AppStack.Screen name="Create" options={{ title: STRINGS.CREATE.TITLE }}>
        {props => (
          <Suspense fallback={<LoadingScreen />}>
            <CreateScreen {...props} />
          </Suspense>
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Edit" options={{ title: STRINGS.EDIT.TITLE }}>
        {props => (
          <Suspense fallback={<LoadingScreen />}>
            <EditScreen {...props} />
          </Suspense>
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Detail" options={{ title: STRINGS.DETAIL.TITLE }}>
        {props => (
          <Suspense fallback={<LoadingScreen />}>
            <DetailScreen {...props} />
          </Suspense>
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
}

/**
 * Loading Screen - Shown while checking auth state
 */
function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

/**
 * Root Navigator - Switches between Auth and App based on auth state
 */
export default function RootNavigator() {
  const { authState } = useAuth();

  // Show loading screen while checking stored auth
  if (authState.status === 'idle' || authState.status === 'checking') {
    return <LoadingScreen />;
  }

  // REMOVED: NavigationContainer wrapper
  return authState.status === 'authenticated' ? (
    <AppNavigator />
  ) : (
    <AuthNavigator />
  );
}