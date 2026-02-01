import * as Notifications from 'expo-notifications';

export async function ensureNotificationPermission() {
  const settings = await Notifications.getPermissionsAsync();
  if (settings.status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
}

export async function scheduleNotification(
  title: string,
  body: string,
  date: Date,
): Promise<string | null> {
  if (date <= new Date()) return null;

  await ensureNotificationPermission();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default', // 🔔 son OK
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
    },
  });

  return id;
}

export async function cancelNotification(notificationId?: string) {
  if (!notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(
    notificationId,
  );
}
