import { Vehicle } from '../models/Vehicle';
import { calculateVidange } from './maintenanceCalculations';
import { getDateStatus } from './status';

export type DashboardStatus = 'OK' | 'WARNING' | 'DANGER';

export type DashboardActionType =
  | 'UPDATE_KM'
  | 'OPEN_DETAILS'
  | 'NONE';

export type DashboardCard = {
  id: string;
  title: string;
  subtitle: string;
  status: DashboardStatus;
  color: string;
  actionType: DashboardActionType;
  payload?: any;
};

/**
 * Carte VIDANGE
 */
export function getVidangeCard(
  vehicle: Vehicle,
): DashboardCard {
  const vidange = vehicle.maintenance.vidange;

  const { nextKm } = calculateVidange({
    lastKm: vidange.lastKm,
    currentKm: vidange.currentKm,
    intervalKm: vidange.intervalKm,
    lastUpdateDate: vidange.lastUpdateDate,
  });

  const kmRemaining = nextKm - vidange.currentKm;

  let status: DashboardStatus = 'OK';
  let color = '#2ecc71';

  if (kmRemaining <= 500) {
    status = 'WARNING';
    color = '#f39c12';
  }

  if (kmRemaining <= 0) {
    status = 'DANGER';
    color = '#e74c3c';
  }

  return {
    id: `vidange-${vehicle.id}`,
    title: 'Vidange moteur',
    subtitle: `Prochaine à ${nextKm.toLocaleString()} km`,
    status,
    color,
    actionType: 'UPDATE_KM',
    payload: {
      vehicleId: vehicle.id,
    },
  };
}

/**
 * Carte ASSURANCE
 */
export function getInsuranceCard(
  vehicle: Vehicle,
): DashboardCard {
  const assurance = vehicle.documents.assurance;
  const dateStatus = getDateStatus(assurance.endDate);

  let status: DashboardStatus = 'OK';
  let color = '#2ecc71';

  if (dateStatus === 'BIENTOT') {
    status = 'WARNING';
    color = '#f39c12';
  }

  if (dateStatus === 'EXPIRE') {
    status = 'DANGER';
    color = '#e74c3c';
  }

  return {
    id: `insurance-${vehicle.id}`,
    title: 'Assurance',
    subtitle: assurance.endDate
      ? `Expire le ${assurance.endDate}`
      : 'À renseigner',
    status,
    color,
    actionType: 'OPEN_DETAILS',
  };
}
/**
 * Carte VIGNETTE
 */
export function getVignetteCard(
  vehicle: Vehicle,
): DashboardCard {
  const vignette = vehicle.documents.vignette;
  const dateStatus = getDateStatus(vignette.nextPaymentDate);

  let status: DashboardStatus = 'OK';
  let color = '#2ecc71';

  if (dateStatus === 'BIENTOT') {
    status = 'WARNING';
    color = '#f39c12';
  }

  if (dateStatus === 'EXPIRE') {
    status = 'DANGER';
    color = '#e74c3c';
  }

  return {
    id: `vignette-${vehicle.id}`,
    title: 'Vignette',
    subtitle: vignette.nextPaymentDate
      ? `Expire le ${vignette.nextPaymentDate}`
      : 'À renseigner',
    status,
    color,
    actionType: 'OPEN_DETAILS',
  };
}
/**
 * Carte VISITE TECHNIQUE
 */
export function getVisiteTechniqueCard(
  vehicle: Vehicle,
): DashboardCard {
  const visite = vehicle.documents.visiteTechnique;
  const dateStatus = getDateStatus(visite.nextDate);

  let status: DashboardStatus = 'OK';
  let color = '#2ecc71';

  if (dateStatus === 'BIENTOT') {
    status = 'WARNING';
    color = '#f39c12';
  }

  if (dateStatus === 'EXPIRE') {
    status = 'DANGER';
    color = '#e74c3c';
  }

  return {
    id: `visite-${vehicle.id}`,
    title: 'Visite technique',
    subtitle: visite.nextDate
      ? `Prochaine le ${visite.nextDate}`
      : 'À renseigner',
    status,
    color,
    actionType: 'OPEN_DETAILS',
  };
}

/**
 * Builder principal du dashboard
 */
export function buildDashboard(
  vehicle: Vehicle,
): DashboardCard[] {
  return [
    getVidangeCard(vehicle),
    getInsuranceCard(vehicle),
    getVignetteCard(vehicle),
    getVisiteTechniqueCard(vehicle),
  ];
}
