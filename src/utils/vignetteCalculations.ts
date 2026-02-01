export function calculateNextAnnualDate(
  lastDate: string,
): string {
  const d = new Date(lastDate);
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
}
