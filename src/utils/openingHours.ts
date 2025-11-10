/**
 * Simple opening hours logic:
 * - Monday to Friday: 08:00–20:00
 * - Saturday: 09:00–18:00
 * - Sunday: closed
 */
export function isOpenNow(date: Date = new Date()): boolean {
  const day = date.getDay(); // 0=Sun, 1=Mon, ... 6=Sat
  const minutes = date.getHours() * 60 + date.getMinutes();

  if (day === 0) return false; // Sunday
  if (day >= 1 && day <= 5) {
    // Mon–Fri 08:00–20:00
    return minutes >= 8 * 60 && minutes < 20 * 60;
  }
  // Saturday 09:00–18:00
  return minutes >= 9 * 60 && minutes < 18 * 60;
}

/**
 * Returns a short label for current opening status.
 */
export function openingStatusLabel(date: Date = new Date()): string {
  return isOpenNow(date) ? 'Ouvert maintenant' : 'Fermé';
}