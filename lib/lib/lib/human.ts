export function isInHumanHour(now = new Date()) {
  const envStart = process.env.HUMAN_HOUR_START || '20:00';
  const durationMin = Number(process.env.HUMAN_HOUR_DURATION_MIN || 60);
  const [h, m] = envStart.split(':').map(Number);
  const start = new Date(now); start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + durationMin*60000);
  return now >= start && now <= end;
}
