import { Item } from '../services/api';

/**
 * Navigation Types
 * 
 * CUSTOMIZATION: Add your own screen params here
 */

// Auth Stack - Screens shown when user is NOT authenticated
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword?: undefined; // Optional: Add if needed
};

// App Stack - Screens shown when user IS authenticated
export type AppStackParamList = {
  Home: undefined;
  Detail: { item: Item };
  Create: undefined;
  Edit: { item: Item };
  Profile: undefined;
};

// Combined type for useNavigation hook typing
export type RootStackParamList = AuthStackParamList & AppStackParamList;

