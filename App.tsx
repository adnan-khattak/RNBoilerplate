import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';
import { AppProvider } from './src/state/AppContext';
import { AuthProvider } from './src/state/AuthContext';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// Initialize QueryClient for React Query
const queryClient = new QueryClient();

// Function to create a notification channel for Android (required)
const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: 4, // Using numeric values instead of AndroidImportance
  });
};

export default function App() {
  // Request permission for notifications
  async function requestUserPermission() {
    // Request permission for iOS (or Android)
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted:', authStatus);
    } else {
      console.log('Notification permission denied:', authStatus);
    }

    // Request permission to show notifications using Notifee (for both iOS and Android)
    await notifee.requestPermission();
  }

  // Get Firebase Cloud Messaging token (FCM Token)
  const getToken = async () => {
    const fmcToken = await messaging().getToken();
    console.log('Firebase Cloud Messaging Token:', fmcToken);
  };

  useEffect(() => {
    // Request permissions and get token
    requestUserPermission();
    getToken();

    // Set up background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message received:', remoteMessage);

      // Create and display a notification for background messages
      await notifee.requestPermission();
      const notification = {
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || 'You have a new message',
        android: {
          channelId: 'default',
        },
      };
      await notifee.displayNotification(notification);
    });

    // Foreground message handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);

      // Create and display a notification for foreground messages
      const notification = {
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || 'You have a new message',
        android: {
          channelId: 'default',
        },
      };
      await notifee.displayNotification(notification);
    });

    // Clean up the foreground message handler when the component unmounts
    return unsubscribe;
  }, []);

  // Create the notification channel when the app first loads
  useEffect(() => {
    createNotificationChannel();
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
