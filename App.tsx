import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  useEffect(() => {
  async function registerForNotifications() {
    const { status } =
      await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(
        'default',
        {
          name: 'default',
          importance:
            Notifications.AndroidImportance.HIGH,
        },
      );
    }
  }

  registerForNotifications();
}, []);

  return <AppNavigator />;
}


