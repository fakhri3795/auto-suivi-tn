import { Vehicle } from '../models/Vehicle';
import { scheduleNotification, cancelNotification } from '../services/notificationService';

/**
 * Notifications ASSURANCE
 */
export async function handleInsuranceNotifications(
  vehicle: Vehicle,
) {
  const assurance = vehicle.documents.assurance;

  // Nettoyage ancien
  if (assurance.notificationIds) {
    for (const id of assurance.notificationIds) {
      await cancelNotification(id);
    }
  }

  assurance.notificationIds = [];

  if (!assurance.endDate) return;

  const expiry = new Date(assurance.endDate);

  for (const days of assurance.remindersDays) {
    const notifyDate = new Date(expiry);
    notifyDate.setDate(expiry.getDate() - days);

    const id = await scheduleNotification(
      'Assurance',
      `Assurance ${vehicle.brand} ${vehicle.model} expire dans ${days} jours`,
      notifyDate,
    );

    if (id) assurance.notificationIds.push(id);
  }
}


/**
 * Notifications VIDANGE
 */
export async function handleVidangeNotifications(
  vehicle: Vehicle,
) {
  const v = vehicle.maintenance.vidange;

  if (v.notificationIds) {
    for (const id of v.notificationIds) {
      await cancelNotification(id);
    }
  }

  v.notificationIds = [];

  const kmRemaining = v.nextKm - v.currentKm;

  for (const km of v.remindersKm) {
    if (kmRemaining <= km) {
      const id = await scheduleNotification(
        'Vidange moteur',
        `Vidange ${vehicle.brand} ${vehicle.model} à prévoir (${kmRemaining} km restants)`,
        new Date(Date.now() + 60 * 60 * 1000), // fallback temporaire
      );
      if (id) v.notificationIds.push(id);
    }
  }
}
