/**
 * Navigation Wrapper
 * 
 * Handles dynamic RTL/LTR changes by using a key that changes when RTL state changes.
 * This ensures the NavigationContainer re-renders and applies the new layout direction
 * without requiring an app restart.
 */

import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { useLanguageContext } from '@state/LanguageContext';
import RootNavigator from './RootNavigator';
import { Analytics } from '@services/analyticsService';

interface NavigationWrapperProps {
  navigationRef: React.RefObject<any>;
  onReady?: () => void;
  onStateChange?: () => void;
}

export const NavigationWrapper: React.FC<NavigationWrapperProps> = ({
  navigationRef,
  onReady,
  onStateChange,
}) => {
  const routeNameRef = useRef<string | undefined>(undefined);
  const { rtlUpdateKey, isRTL } = useLanguageContext();

  // Debug: Log RTL state changes
  useEffect(() => {
    console.log(`🧭 NavigationWrapper re-rendered: RTL=${isRTL}, UpdateKey=${rtlUpdateKey}, I18nManager.isRTL=${I18nManager.isRTL}`);
  }, [rtlUpdateKey, isRTL]);

  const handleReady = () => {
    const route = navigationRef.current?.getCurrentRoute();
    const name = route?.name;
    routeNameRef.current = name;
    if (name) Analytics.screen(name);

    console.log('🧭 Navigation is ready!');
    onReady?.();
  };

  const handleStateChange = async () => {
    const route = navigationRef.current?.getCurrentRoute();
    const name = route?.name;
    if (name && routeNameRef.current !== name) {
      routeNameRef.current = name;
      Analytics.screen(name);
    }
    onStateChange?.();
  };

  return (
    <NavigationContainer
      key={`navigation-${rtlUpdateKey}`}
      ref={navigationRef}
      onReady={handleReady}
      onStateChange={handleStateChange}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};
