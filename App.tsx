import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';
import { AppProvider } from './src/state/AppContext';
import { AuthProvider } from './src/state/AuthContext';
import notificationService from '@services/notification/Notification';
import messaging from '@react-native-firebase/messaging';

// Initialize QueryClient for React Query
const queryClient = new QueryClient();
export default function App() {
  useEffect(() => {
    // 1. Start notification system when app opens
    notificationService.initialize();
    
    // 2. Listen for notifications when app is IN BACKGROUND
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('📱 Background notification received!');
      
      // Show the notification
      await notificationService.showNotification(
        remoteMessage.notification?.title || 'New Message',
        remoteMessage.notification?.body || 'You have a new notification'
      );
    });
    
    // 3. Listen for notifications when app is OPEN (foreground)
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('📱 Foreground notification received!');
      
      // Show the notification
      await notificationService.showNotification(
        remoteMessage.notification?.title || 'New Message',
        remoteMessage.notification?.body || 'You have a new notification'
      );
    });
    
    // Clean up when component unmounts
    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <RootNavigator />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
