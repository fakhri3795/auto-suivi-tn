export function calculateInsuranceEndDate(
  startDate: string,
  durationMonths: number,
): string {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + durationMonths);
  return end.toISOString().split('T')[0];
}
