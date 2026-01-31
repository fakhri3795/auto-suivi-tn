import { getDateStatus } from './status';

type Action = {
  label: string;
  color: string;
};

export function getNextAction(vehicle: any): Action | null {
  const docs = vehicle.documents;
  const maintenance = vehicle.maintenance;

  // 1️⃣ Assurance
  const insuranceStatus = getDateStatus(docs.assurance.endDate);

  if (insuranceStatus === 'EXPIRE') {
    return {
      label: 'Renouveler l’assurance immédiatement',
      color: '#e74c3c',
    };
  }

  if (insuranceStatus === 'BIENTOT') {
    return {
      label: 'Prévoir le renouvellement de l’assurance',
      color: '#f39c12',
    };
  }

  // 2️⃣ Visite technique
  const visitStatus = getDateStatus(docs.visiteTechnique.nextDate);

  if (visitStatus === 'EXPIRE') {
    return {
      label: 'Effectuer la visite technique',
      color: '#e74c3c',
    };
  }

  if (visitStatus === 'BIENTOT') {
    return {
      label: 'Planifier la visite technique',
      color: '#f39c12',
    };
  }

  // 3️⃣ Vidange (basique pour MVP)
  if (maintenance.vidange.lastKm > 0) {
    const nextKm =
      maintenance.vidange.lastKm + maintenance.vidange.intervalKm;

    // On considère bientôt si < 500 km
    if (nextKm - maintenance.vidange.lastKm <= 500) {
      return {
        label: 'Prévoir une vidange moteur',
        color: '#f39c12',
      };
    }
  }

  // ✅ Rien d’urgent
  return {
    label: 'Aucune action urgente',
    color: '#2ecc71',
  };
}
