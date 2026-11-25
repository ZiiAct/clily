const pad = (n: number) => String(n).padStart(2, '0');

/** Indonesian time zone abbreviation for a UTC offset (minutes), as shown in Figma ("WITA"). */
function zoneLabel(offsetMinutes: number): string {
  const hours = -offsetMinutes / 60;
  if (hours === 7) return 'WIB';
  if (hours === 8) return 'WITA';
  if (hours === 9) return 'WIT';
  const sign = hours >= 0 ? '+' : '-';
  return `GMT${sign}${Math.abs(hours)}`;
}

/** "28-10-2045, 13.00 WITA" in the device's local time zone. */
export function formatTakenAt(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}, ${pad(d.getHours())}.${pad(d.getMinutes())} ${zoneLabel(
    d.getTimezoneOffset(),
  )}`;
}
