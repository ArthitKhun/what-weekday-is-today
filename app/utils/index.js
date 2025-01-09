
/**
 * Checks if a given year is a leap year.
 *  - year % 400 === 0
 *  - or (year % 4 === 0 && year % 100 !== 0)
 *
 * @param {number} year - A year to check.
 * @returns {boolean} - True if the year is a leap year, false otherwise.
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Calculates the total number of days between January 1, 1900 and January 1 of
 * the given year.
 *
 * @param {number} year - The year to calculate the number of days for.
 * @returns {number} - The total number of days between 1900 and the given year.
 */
export function getTotalDaysBetween1900AndYear(year) {
  let totalDays = 0;
  // Add days for the full years between 1900 and (year - 1)
  for (let y = 1900; y < year; y++) {
    totalDays += isLeapYear(y) ? 366 : 365;
  }
  return totalDays;
}

/**
 * Calculates the total number of days that have passed in the given year before
 * the first day of the given month.
 *
 * @param {number} year - The year to calculate the number of days for.
 * @param {number} month - The month to calculate the number of days before.
 * @returns {number} - The total number of days between January 1 of the given year
 *                    and the first day of the given month.
 */
export function getDaysBeforeMonthInYear(year, month) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let totalDays = 0;
  for (let m = 0; m < month - 1; m++) {
    totalDays += daysInMonth[m] + (m === 1 && isLeapYear(year) ? 1 : 0);
  }
  return totalDays;
}

/**
 * Calculates the day of the week given a year, month, and day.
 *
 * @param {number} year - The year of the date to calculate the day of the week for.
 * @param {number} month - The month of the date to calculate the day of the week for.
 * @param {number} day - The day of the date to calculate the day of the week for.
 * @returns {string} - The day of the week, represented as a string (e.g. 'Monday', 'Tuesday', etc.).
 */
export function calculateDayOfWeek(year, month, day) {
  let totalDays = getTotalDaysBetween1900AndYear(year);
  totalDays += getDaysBeforeMonthInYear(year, month);
  totalDays += (day - 1);

  const dayIndex = totalDays % 7;
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return weekdays[dayIndex];
}
