export function calculateNextVisitDate(
  lastDate: string,
  vehicleYear: number,
): string {
  const vehicleAge =
    new Date().getFullYear() - vehicleYear;

  const intervalYears =
    vehicleAge < 10 ? 2 : 1;

  const d = new Date(lastDate);
  d.setFullYear(d.getFullYear() + intervalYears);

  return d.toISOString().split('T')[0];
}
