export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: string;
  documents: {
    assurance: {
      startDate: string;
      endDate: string;
    };
    vignette: {
      year: string;
      paid: boolean;
    };
    visiteTechnique: {
      lastDate: string;
      nextDate: string;
    };
  };
  maintenance: {
    vidange: {
      lastKm: number;
      intervalKm: number;
    };
    filtres: {
      huile: number;
      air: number;
      gasoil: number;
      habitacle: number;
    };
  };
};
