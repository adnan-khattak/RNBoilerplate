import analytics from "@react-native-firebase/analytics";

export const Analytics = {
  screen: (screenName: string) => {
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    });
  },

  event: (eventName: string, params = {}) => {
    analytics().logEvent(eventName, params);
  },
};
