// App.tsx - Keep as is (this is the CORRECT setup)
import React, { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator'; // Updated version without NavigationContainer
import { AppProvider } from './src/state/AppContext';
import { AuthProvider } from './src/state/AuthContext';
import notificationService from '@services/notification/Notification';
import messaging from '@react-native-firebase/messaging';
import { useNetInfo } from "@react-native-community/netinfo";
import { NetworkBanner } from './src/components/NetworkBanner';
const queryClient = new QueryClient();

export default function App() {
  const navigationRef = useRef<any>(null);
  const netInfo = useNetInfo();
  const handleNavigation = (screenName: string, params?: any) => {
  
    
    if (navigationRef.current) {
      navigationRef.current.navigate(screenName, params);
    } else {
      console.log('⚠️ Navigation not ready yet');
    }
  };
  
  useEffect(() => {
    let clickUnsubscribe: (() => void) | undefined;
      console.log('🌐 Network status:', netInfo.isConnected ? 'Online' : 'Offline');
    console.log('COnnection type:', netInfo.type);
    const setupNotifications = async () => {
      // 1. Set navigation handler FIRST
      notificationService.setNavigationHandler(handleNavigation);
      
      // 2. Initialize notification service
      clickUnsubscribe = await notificationService.initialize();
      
      // 3. Setup notification listeners
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        const permissionGranted = await notificationService.hasPermission();
        if (!permissionGranted) {
          console.log('⚠️ Notification permission denied. Notification will not be shown.');
          return; // Early exit if permission is denied
        }
        console.log('📱 Background notification received!');
        await notificationService.showNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || 'You have a new notification',
          remoteMessage.data
        );
      });
      
      const messageUnsubscribe = messaging().onMessage(async (remoteMessage) => {
        const permissionGranted = await notificationService.hasPermission();
        if (!permissionGranted) {
          console.log('⚠️ Notification permission denied. Notification will not be shown.');
          return; // Early exit if permission is denied
        }
        console.log('📱 Foreground notification received!');
        await notificationService.showNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || 'You have a new notification',
          remoteMessage.data
        );
      });
      
      return messageUnsubscribe;
    };
    
    setupNotifications().then((messageUnsubscribe) => {
      return () => {
        if (clickUnsubscribe) clickUnsubscribe();
        if (messageUnsubscribe) messageUnsubscribe();
      };
    });
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          {/* Network status banner */}
          <NetworkBanner isConnected={netInfo.isConnected} />
          
          {/* Single NavigationContainer at root */}
          <NavigationContainer 
            ref={navigationRef} 
            onReady={() => {
              console.log('🧭 Navigation is ready!');
            }}
          >
            <RootNavigator />
          </NavigationContainer>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}