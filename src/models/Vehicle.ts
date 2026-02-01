type Filter = {
  lastKm: number;
  intervalKm: number;
  nextKm: number;
  remindersKm: number[];
    notificationIds?: string[];

};


export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: string;
  documents: {
  assurance: {
startDate: string;
  durationMonths: 6 | 12;
  endDate: string;

  remindersDays: number[]; // ex: [30, 14]
  notificationIds?: string[];
};
  vignette: {
    lastPaymentDate: string;    // date réelle
    nextPaymentDate: string;    // calculée (+1 an)
    remindersKm: number[];        // ex: [30]
      notificationIds?: string[];

  };

  visiteTechnique: {
    lastDate: string;
    nextDate: string;           // calculée
    reminders: number[];
      notificationIds?: string[];

  };
};

  maintenance: {
    vidange: {
       lastKm: number;
  currentKm: number;
  intervalKm: number;
  lastUpdateDate: string;
  estimatedMonths: number;
  nextKm: number;

  remindersKm: number[];    // ex: [500]
  remindersDays?: number[]; // optionnel (V2)
  notificationIds?: string[];

    };
    filtres: {
    huile: Filter;
    air: Filter;
    gasoil: Filter;
    habitacle: Filter;
    bougies?: Filter;
  };
  };
  notifications: {
      enabled: true,
    },
};
