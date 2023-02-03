export function minuteToHour(minute: any) {
  const hour = Math.floor(minute / 60);
  const minuteLeft = minute % 60;
  return { hour, minuteLeft };
}
