import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
// import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateScreen from '../screens/CreateScreen';
import EditScreen from '../screens/EditScreen';
import DetailScreen from '../screens/DetailScreen';
import { RootStackParamList } from './types';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: colors.backgroundSecondary,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen 
          name="Create" 
          component={CreateScreen}
          options={{ title: 'New Item' }}
        />
        <Stack.Screen 
          name="Edit" 
          component={EditScreen}
          options={{ title: 'Edit Item' }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{ title: 'Item Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
