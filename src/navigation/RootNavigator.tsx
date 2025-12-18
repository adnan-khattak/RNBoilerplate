/**
 * Root Navigator
 * Handles authentication flow - shows Auth screens or App screens based on auth state
 * 
 * CUSTOMIZATION:
 * - Add more screens to AuthStack or AppStack as needed
 * - Modify screen options for custom headers
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../state/AuthContext';
import { colors } from '../theme/theme';
import { AuthStackParamList, AppStackParamList } from './types';

// Auth Screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

// App Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateScreen from '../screens/CreateScreen';
import EditScreen from '../screens/EditScreen';
import DetailScreen from '../screens/DetailScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

// Shared screen options
const screenOptions = {
  headerStyle: {
    backgroundColor: colors.white,
  },
  headerTintColor: colors.primary,
  headerTitleStyle: {
    fontWeight: '600' as const,
  },
  contentStyle: {
    backgroundColor: colors.backgroundSecondary,
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
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
      <AppStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'My Profile' }}
      />
      <AppStack.Screen 
        name="Create" 
        component={CreateScreen}
        options={{ title: 'New Item' }}
      />
      <AppStack.Screen 
        name="Edit" 
        component={EditScreen}
        options={{ title: 'Edit Item' }}
      />
      <AppStack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={{ title: 'Item Details' }}
      />
    </AppStack.Navigator>
  );
}

/**
 * Loading Screen - Shown while checking auth state
 */
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
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

  return (
    <NavigationContainer>
      {authState.status === 'authenticated' ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
