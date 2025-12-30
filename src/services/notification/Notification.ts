// src/services/SimpleNotification.ts
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

class Notification {
  
  // 1. ASK USER FOR PERMISSION
  async askForPermission() {
    try {
      console.log('Asking for notification permission...');
      
      // For iOS & Android
      const permission = await messaging().requestPermission();
      
      // Check if permission granted
      const granted = 
        permission === messaging.AuthorizationStatus.AUTHORIZED ||
        permission === messaging.AuthorizationStatus.PROVISIONAL;
      
      if (granted) {
        console.log('✅ Permission granted!');
        return true;
      } else {
        console.log('❌ Permission denied');
        return false;
      }
      
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

  // 4. SHOW A NOTIFICATION
  async showNotification(title: string, body: string) {
    try {
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId: 'default',
        },
      });
      console.log('📨 Notification shown!');
    } catch (error) {
      console.log('Error showing notification:', error);
    }
  }

  // 5. INITIALIZE EVERYTHING
  async initialize() {
    console.log('🚀 Starting notification system...');
    
    // Step 1: Ask permission
    const hasPermission = await this.askForPermission();
    if (!hasPermission) return;
    
    // Step 2: Get token
    await this.getDeviceToken();
    
    // Step 3: Setup channel
    await this.setupChannel();
    
    console.log('✅ Notification system ready!');
  }
}

// Create one instance for entire app
const notificationService = new Notification();
export default notificationService;