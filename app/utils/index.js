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
  // จำนวนวันในแต่ละเดือน (กรณีปีปกติ)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let totalDays = 0;

  // วนลูปเริ่มตั้งแต่เดือนแรก (index = 0) จนถึงเดือนก่อนหน้า (month - 1)
  for (let m = 0; m < month - 1; m++) {
    let maxDays = daysInMonth[m];
    // หากเป็นเดือนกุมภาพันธ์ (index = 1) ใน leap year จะมี 29 วัน
    if (m === 1 && isLeapYear(year)) {
      maxDays = 29;
    }
    totalDays += maxDays;
    // const extraDay = m === 1 && isLeapYear(year) ? 1 : 0;
    // totalDays += daysInMonth[m] + extraDay;
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
  // นับจำนวนวันทั้งหมดจากปี 1900 จนถึงต้นปีที่กำหนด
  let totalDays = getTotalDaysBetween1900AndYear(year);

  // บวกด้วยจำนวนวันก่อนหน้าของเดือนนั้น ๆ ในปีเดียวกัน
  totalDays += getDaysBeforeMonthInYear(year, month);

  // บวกด้วยวันที่ในเดือนปัจจุบัน (ลบ 1 เพื่อให้เริ่มนับจาก 0)
  totalDays += day - 1;

  // หา index ของวันในสัปดาห์ โดยให้ Monday เป็นจุดเริ่มต้น (index 0)
  const dayIndex = totalDays % 7;

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return weekdays[dayIndex];
}

/**
 * Validates if the provided year, month, and day form a valid date.
 *
 * @param {number} year - The year (e.g., 1986, 2023).
 * @param {number} month - The month (1 = January, 2 = February, ...).
 * @param {number} day - The day of the month (1 to 31).
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
export function isValidDate(year, month, day) {
  const yearInt = parseInt(year);
  const monthInt = parseInt(month);
  const dayInt = parseInt(day);

  console.log("isValidDate", yearInt, monthInt, dayInt);
  if (yearInt < 1900) {
    return false;
  }

  // Check if the month is between 1 and 12
  if (monthInt < 1 || monthInt > 12) {
    return false;
  }

  // Define the maximum number of days in each month
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust February for leap years
  let maxDays = monthDays[monthInt - 1];
  if (monthInt === 2 && isLeapYear(yearInt)) {
    maxDays = 29;
  }

  // Check if the day is within the valid range for the given month
  if (day < 1 || day > maxDays) {
    return false;
  }

  // If all checks pass, the date is valid
  return true;
}
