// src/services/SimpleNotification.ts
import messaging from '@react-native-firebase/messaging';
import notifee, {AuthorizationStatus, EventType} from '@notifee/react-native';
import { Linking, Platform } from 'react-native';

class Notification {
  private navigationHandler: ((screen: string, params?: any) => void) | null = null;
  // 1. ASK USER FOR PERMISSION
  async askForPermission() {
    try {
      console.log('Asking for notification permission...');

      // Request via both Firebase Messaging and Notifee (Android 13+ runtime permission)
      const [messagingStatus, notifeeSettings] = await Promise.all([
        messaging().requestPermission(),
        notifee.requestPermission(),
      ]);

      const messagingGranted =
        messagingStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        messagingStatus === messaging.AuthorizationStatus.PROVISIONAL;

      const notifeeGranted =
        notifeeSettings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        notifeeSettings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

      const systemDisabled =
        Platform.OS === 'android' && notifeeSettings.android?.areNotificationsEnabled === false;

      const granted = messagingGranted && notifeeGranted && !systemDisabled;

      if (granted) {
        console.log('✅ Permission granted!');
        return true;
      }

      if (systemDisabled) {
        console.log('❌ Permission denied at system level; opening settings');
        await notifee.openNotificationSettings();
      } else {
        console.log('❌ Permission denied');
      }

      return false;
    } catch (error) {
      console.log('Error asking permission:', error);
      return false;
    }
  }

  // 2. GET DEVICE TOKEN (Like a phone number for notifications)
  async getDeviceToken() {
    try {
      const token = await messaging().getToken();
      console.log('📱 Device Token:', token);
      return token;
    } catch (error) {
      console.log('Error getting token:', error);
      return null;
    }
  }

  // 3. SETUP BASIC NOTIFICATION CHANNEL (Android only)
  async setupChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: 4, // Normal importance
    });
  }

   // 4. SHOW A NOTIFICATION (UPDATED - Add data parameter)
  async showNotification(title: string, body: string, data?: any) {
    // 1. First check if permission is granted
    const permissionGranted = await this.hasPermission();
    if (!permissionGranted) {
      // If permission is not granted, log and return early
      console.log('⚠️ Notification permission denied. Notification will not be shown.');
      return; // Early exit, no need to display notification
    }

    try {
      // If permission is granted, display the notification
      await notifee.displayNotification({
        title: title,
        body: body,
        data: data || {}, // Add data to notification
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
      console.log('📨 Notification shown!', data || '');
    } catch (error) {
      console.log('Error showing notification:', error);
    }
  }

  // Check notification permission before showing notification
  async hasPermission() {
    const [messagingStatus, notifeeSettings] = await Promise.all([
      messaging().hasPermission(),
      notifee.getNotificationSettings(),
    ]);

    const messagingGranted =
      messagingStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      messagingStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const notifeeGranted =
      notifeeSettings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      notifeeSettings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

    const systemDisabled =
      Platform.OS === 'android' && notifeeSettings.android?.areNotificationsEnabled === false;

    return messagingGranted && notifeeGranted && !systemDisabled;
  }

  // Open the OS notification settings so the user can toggle permissions manually
  async openPermissionSettings() {
    try {
      if (Platform.OS === 'android') {
        await notifee.openNotificationSettings();
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      console.log('Error opening notification settings:', error);
    }
  }

  // 6. SETUP NOTIFICATION CLICK LISTENER (NEW METHOD)
  setupNotificationClicks() {
    console.log('👆 Setting up notification click listener...');
    
    // Listen for when user taps notification
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('🎯 User TAPPED notification!');
        
        // Get data from the notification
        const notificationData = detail.notification?.data;
        console.log('Notification data:', notificationData);
        
        if (notificationData) {
          // Handle the click based on data
          this.handleNotificationClick(notificationData);
        }
      }
    });
  }
  
  // 7. HANDLE NOTIFICATION CLICK (NEW METHOD)
  private handleNotificationClick(data: any) {
    console.log('📍 Handling notification click with data:', data);
    
    // Example data structure from Firebase Console:
    // {
    //   "screen": "Profile",
    //   "id": "123",
    //   "type": "profile_view"
    // }
    
    // Check if we have a navigation handler
    if (this.navigationHandler) {
      // Navigate based on screen name in data
      if (data.screen) {
        console.log(`🚀 Navigating to: ${data.screen}`);
        this.navigationHandler(data.screen, data);
      }
    } else {
      console.log('⚠️ No navigation handler set yet');
    }
    
    // You can also handle specific actions here
    if (data.url) {
      console.log('🌐 Opening URL:', data.url);
      // For opening web URLs
      // Linking.openURL(data.url);
    }
  }
  
  // 8. SET NAVIGATION HANDLER (NEW METHOD)
  // Call this from your main App component
  setNavigationHandler(handler: (screen: string, params?: any) => void) {
    this.navigationHandler = handler;
    console.log('📍 Navigation handler set!');
  }
  
  // 9. CHECK IF APP WAS OPENED FROM NOTIFICATION (NEW METHOD)
  async checkAppOpenedFromNotification() {
    try {
      // Check if user opened the app by tapping a notification
      const initialNotification = await notifee.getInitialNotification();
      
      if (initialNotification) {
        console.log('📱 App was OPENED from notification tap');
        const data = initialNotification.notification?.data;
        if (data) {
          this.handleNotificationClick(data);
        }
      }
    } catch (error) {
      console.log('Error checking initial notification:', error);
    }
  }

  // src/services/SimpleNotification.ts
setupBackgroundEventHandler() {
  console.log('Setting up background event handler...');
  
  // Listen for events when the app is in the background
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log('🎯 Notification pressed while app is in background!');
      
      // Extract the notification data from the event
      const notificationData = detail.notification?.data;
      console.log('Notification data:', notificationData);
      
      if (notificationData && Object.keys(notificationData).length > 0) {
        // Handle the click based on data
        this.handleNotificationClick(notificationData);
      } else {
        console.log('⚠️ No data in notification!');
      }
    }
  });
}

  
  // UPDATE initialize method
  async initialize() {
    console.log('🚀 Starting notification system...');
    
    // Step 1: Ask permission
    const hasPermission = await this.askForPermission();
    if (!hasPermission) return;
    
    // Step 2: Get token
    await this.getDeviceToken();
    
    // Step 3: Setup channel
    await this.setupChannel();
    
    // Step 4: Check if app was opened from notification
    await this.checkAppOpenedFromNotification();
    
    // Step 5: Setup click listener
    const clickUnsubscribe = this.setupNotificationClicks();
    
    this.setupBackgroundEventHandler();

    console.log('✅ Notification system ready!');
    
    // Return cleanup function
    return clickUnsubscribe;
  }
}
// Create one instance for entire app
const notificationService = new Notification();
export default notificationService;