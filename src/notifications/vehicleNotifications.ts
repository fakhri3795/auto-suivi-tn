import * as Notifications from 'expo-notifications';

// Annuler toutes les notifications existantes
export async function clearAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Programmer une notification à une date donnée
export async function scheduleNotification(
  title: string,
  body: string,
  triggerDate: Date,
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
}

// Notification assurance (30 jours avant expiration)
export async function scheduleInsuranceNotification(vehicle: any) {
  const endDate = vehicle.documents.assurance.endDate;
  if (!endDate) return;

  const expiry = new Date(endDate);

  // ✅ INITIALISATION CORRECTE
  const notifyDate = new Date(expiry);
  notifyDate.setDate(expiry.getDate() - 30);

  if (notifyDate <= new Date()) return;

  await scheduleNotification(
    'Assurance bientôt expirée',
    `${vehicle.brand} ${vehicle.model} : renouvellement à prévoir`,
    notifyDate,
  );
}
