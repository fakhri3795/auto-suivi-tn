type VidangeInput = {
  lastKm: number;
  currentKm: number;
  intervalKm: number;
  lastUpdateDate: string; // ISO date
};

type VidangeResult = {
  nextKm: number;
  estimatedMonths: number;
};


export function calculateNextVidangeKm(
  lastKm: number,
  intervalKm: number,
): number {
  return lastKm + intervalKm;
}

export function estimateMonthsForKm(
  input: VidangeInput,
): number {
  const { lastKm, currentKm, intervalKm, lastUpdateDate } = input;

  if (currentKm <= lastKm) return 6; // fallback

  const kmDone = currentKm - lastKm;

  const startDate = new Date(lastUpdateDate);
  const today = new Date();

  const diffDays =
    (today.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays <= 0) return 6;

  const kmPerDay = kmDone / diffDays;

  const daysForInterval = intervalKm / kmPerDay;

  const months = daysForInterval / 30;

  return Math.max(1, Math.round(months));
}

export function calculateVidange(
  input: VidangeInput,
): VidangeResult {
  const nextKm = calculateNextVidangeKm(
    input.lastKm,
    input.intervalKm,
  );

  const estimatedMonths = estimateMonthsForKm(input);

  return {
    nextKm,
    estimatedMonths,
  };
}
