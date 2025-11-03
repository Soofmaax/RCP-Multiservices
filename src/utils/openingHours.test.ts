import { describe, it, expect } from 'vitest';
import { isOpenNow, openingStatusLabel } from './openingHours';

// Helper to build a date at specific weekday/time
function buildDate(day: number, hour: number, minute = 0): Date {
  // Create a date, then set day/hour/minute
  const d = new Date(2024, 0, 1, 0, 0, 0, 0); // Monday Jan 1, 2024 is actually Monday
  // Adjust to desired weekday
  const currentDay = d.getDay();
  const diff = day - currentDay;
  d.setDate(d.getDate() + diff);
  d.setHours(hour, minute, 0, 0);
  return d;
}

describe('openingHours', () => {
  it('is closed on Sunday', () => {
    const sundayMorning = buildDate(0, 10, 0); // Sunday 10:00
    expect(isOpenNow(sundayMorning)).toBe(false);
    expect(openingStatusLabel(sundayMorning)).toBe('Fermé');
  });

  it('is open Monday at 10:00', () => {
    const monday = buildDate(1, 10, 0); // Monday 10:00
    expect(isOpenNow(monday)).toBe(true);
    expect(openingStatusLabel(monday)).toBe('Ouvert maintenant');
  });

  it('is closed Monday at 21:00', () => {
    const mondayLate = buildDate(1, 21, 0); // Monday 21:00
    expect(isOpenNow(mondayLate)).toBe(false);
    expect(openingStatusLabel(mondayLate)).toBe('Fermé');
  });

  it('is open Saturday at 10:00', () => {
    const saturday = buildDate(6, 10, 0); // Saturday 10:00
    expect(isOpenNow(saturday)).toBe(true);
  });

  it('is closed Saturday at 20:00', () => {
    const saturdayLate = buildDate(6, 20, 0); // Saturday 20:00
    expect(isOpenNow(saturdayLate)).toBe(false);
  });
});