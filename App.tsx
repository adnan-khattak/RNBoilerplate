// App.tsx - Keep as is (this is the CORRECT setup)
import React, { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator'; // Updated version without NavigationContainer
import { AppProvider } from './src/state/AppContext';
import { AuthProvider } from './src/state/AuthContext';
import { ThemeProvider } from './src/theme';
import { LanguageProvider } from './src/state/LanguageContext';
import i18next from './src/services/i18n/i18nConfig';
import notificationService from '@services/notification/Notification';
import messaging from '@react-native-firebase/messaging';
import { useNetInfo } from '@react-native-community/netinfo';
import { NetworkBanner } from './src/components/NetworkBanner';
import { Analytics } from '@/services/analyticsService';
const queryClient = new QueryClient();

export default function App() {
  const navigationRef = useRef<any>(null);
  const routeNameRef = useRef<string | undefined>(undefined);
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
    console.log(
      '🌐 Network status:',
      netInfo.isConnected ? 'Online' : 'Offline',
    );
    console.log('COnnection type:', netInfo.type);
    const setupNotifications = async () => {
      // 1. Set navigation handler FIRST
      notificationService.setNavigationHandler(handleNavigation);

      // 2. Initialize notification service
      clickUnsubscribe = await notificationService.initialize();

      // 3. Setup notification listeners
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        const permissionGranted = await notificationService.hasPermission();
        if (!permissionGranted) {
          console.log(
            '⚠️ Notification permission denied. Notification will not be shown.',
          );
          return; // Early exit if permission is denied
        }
        console.log('📱 Background notification received!');
        await notificationService.showNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || 'You have a new notification',
          remoteMessage.data,
        );
      });

      const messageUnsubscribe = messaging().onMessage(async remoteMessage => {
        const permissionGranted = await notificationService.hasPermission();
        if (!permissionGranted) {
          console.log(
            '⚠️ Notification permission denied. Notification will not be shown.',
          );
          return; // Early exit if permission is denied
        }
        console.log('📱 Foreground notification received!');
        await notificationService.showNotification(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || 'You have a new notification',
          remoteMessage.data,
        );
      });

      return messageUnsubscribe;
    };

    setupNotifications().then(messageUnsubscribe => {
      return () => {
        if (clickUnsubscribe) clickUnsubscribe();
        if (messageUnsubscribe) messageUnsubscribe();
      };
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <AppProvider>
                {/* Network status banner */}
                <NetworkBanner isConnected={netInfo.isConnected} />

                {/* Single NavigationContainer at root */}
                <NavigationContainer
                  ref={navigationRef}
                  onReady={() => {
                    const route = navigationRef.current?.getCurrentRoute();
                    const name = route?.name;
                    routeNameRef.current = name;
                    if (name) Analytics.screen(name);

                    console.log('🧭 Navigation is ready!');
                  }}
                  onStateChange={async () => {
                    const route = navigationRef.current?.getCurrentRoute();
                    const name = route?.name;
                    if (name && routeNameRef.current !== name) {
                      routeNameRef.current = name;
                      Analytics.screen(name);
                    }
                  }}
                >
                  <RootNavigator />
                </NavigationContainer>
              </AppProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
