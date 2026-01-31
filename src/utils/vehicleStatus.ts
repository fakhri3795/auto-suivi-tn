import { getDateStatus, Status } from './status';

export function getVehicleGlobalStatus(vehicle: any): Status {
  const docs = vehicle.documents;

  const statuses: Status[] = [
    getDateStatus(docs.assurance.endDate),
    getDateStatus(docs.visiteTechnique.nextDate),
    // vignette traitée à part
  ];

  if (statuses.includes('EXPIRE')) return 'EXPIRE';
  if (statuses.includes('BIENTOT')) return 'BIENTOT';

  return 'VALIDE';
}
