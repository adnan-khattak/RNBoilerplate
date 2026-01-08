/**
 * NetworkBanner Component
 * Displays offline/online status at the top of the app
 * Auto-hides when connection is restored
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  SafeAreaView,
  Text,
} from 'react-native';
import { COLORS } from '@config/colors';
import { STRINGS } from '@config/strings';
import { spacing } from '@theme/theme';

interface NetworkBannerProps {
  isConnected: boolean | null;
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({ isConnected }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isConnected === false) {
      // Show offline banner
      setShowBanner(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (isConnected === true && showBanner) {
      // Hide banner when back online with delay
      const hideTimer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowBanner(false);
        });
      }, 2000); // Show "back online" message for 2 seconds

      return () => clearTimeout(hideTimer);
    }
  }, [isConnected, showBanner, fadeAnim]);

  if (!showBanner) return null;

  const isOffline = isConnected === false;
  const backgroundColor = isOffline ? COLORS.error : COLORS.success;
  const messageText = isOffline ? STRINGS.NETWORK.OFFLINE : STRINGS.NETWORK.BACK_ONLINE;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={[styles.banner, { backgroundColor }]}>
        <Text
          variant="body"
          weight="600"
          color="white"
          align="center"
        >
          {messageText}
        </Text>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  banner: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    alignItems: 'center',
  },
});
