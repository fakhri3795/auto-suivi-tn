export type Status =
  | 'VALIDE'
  | 'BIENTOT'
  | 'EXPIRE'
  | 'A_RENSEIGNER';

function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export function getDateStatus(
  endDate: string,
  warningDays = 30,
): Status {
  if (!endDate || !isValidDate(endDate)) {
    return 'A_RENSEIGNER';
  }

  const today = new Date();
  const expiry = new Date(endDate);

  // Normaliser (ignorer l'heure)
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  if (expiry < today) {
    return 'EXPIRE';
  }

  const diffDays =
    (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays <= warningDays) {
    return 'BIENTOT';
  }

  return 'VALIDE';
}

export function getStatusColor(status: Status): string {
  switch (status) {
    case 'VALIDE':
      return '#2ecc71'; // vert
    case 'BIENTOT':
      return '#f39c12'; // orange
    case 'EXPIRE':
      return '#e74c3c'; // rouge
    case 'A_RENSEIGNER':
      return '#7f8c8d'; // gris
    default:
      return '#000';
  }
}

