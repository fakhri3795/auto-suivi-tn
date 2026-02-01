import { Vehicle } from '../models/Vehicle';

export function createEmptyVehicle(
  brand: string,
  model: string,
  year: string,
): Vehicle {
  const today = new Date().toISOString().split('T')[0];

  return {
    id: Date.now().toString(),
    brand,
    model,
    year,

    documents: {
      assurance: {
  startDate: '',
  durationMonths: 12,
  endDate: '',
  remindersDays: [30, 14],
},

      vignette: {
        lastPaymentDate: '',
        nextPaymentDate: '',
        remindersKm: [30],
      },
      visiteTechnique: {
        lastDate: '',
        nextDate: '',
        reminders: [30],
      },
    },

    maintenance: {
      vidange: {
  lastKm: 0,
  currentKm: 0,
  intervalKm: 10000,
  lastUpdateDate: today,
  estimatedMonths: 6,
  nextKm: 0,
  remindersKm: [500],
},

      filtres: {
        huile: {
          lastKm: 0,
          intervalKm: 10000,
          nextKm: 0,
          remindersKm: [1000],
        },
        air: {
          lastKm: 0,
          intervalKm: 30000,
          nextKm: 0,
          remindersKm: [2000],
        },
        gasoil: {
          lastKm: 0,
          intervalKm: 20000,
          nextKm: 0,
          remindersKm: [2000],
        },
        habitacle: {
          lastKm: 0,
          intervalKm: 15000,
          nextKm: 0,
          remindersKm: [1000],
        },
      },
    },

    notifications: {
      enabled: true,
    },
  };
}
