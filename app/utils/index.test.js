import { describe, it, expect } from 'vitest'

import {
  isLeapYear,
  getTotalDaysBetween1900AndYear,
  getDaysBeforeMonthInYear,
  calculateDayOfWeek,
} from './index';

describe('isLeapYear(year)', () => {
  it('should return true for years divisible by 400', () => {
    expect(isLeapYear(2000)).toBe(true)
    expect(isLeapYear(2400)).toBe(true)
  })

  it('should return true for years divisible by 4 but not by 100', () => {
    expect(isLeapYear(2020)).toBe(true)
    expect(isLeapYear(2024)).toBe(true)
  })

  it('should return false for years divisible by 100 but not 400', () => {
    expect(isLeapYear(1900)).toBe(false)
    expect(isLeapYear(2100)).toBe(false)
  })

  it('should return false for normal years', () => {
    expect(isLeapYear(2019)).toBe(false)
    expect(isLeapYear(2021)).toBe(false)
  })
})

describe('getTotalDaysBetween1900AndYear(year)', () => {
  it('should return 0 when the year is 1900', () => {
    expect(getTotalDaysBetween1900AndYear(1900)).toBe(0)
  })

  it('should return 365 for year 1901 (1900 is not leap year)', () => {
    // 1900 มี 365 วัน, ดังนั้นถึงก่อน 1901 = 365
    expect(getTotalDaysBetween1900AndYear(1901)).toBe(365)
  })

  it('should return 730 for year 1902', () => {
    // 1900 (365) + 1901 (365) = 730
    expect(getTotalDaysBetween1900AndYear(1902)).toBe(365 + 365)
  })

  it('checks a known leap boundary (1904)', () => {
    // 1900 (365) + 1901 (365) + 1902 (365) + 1903 (365) = 1460
    expect(getTotalDaysBetween1900AndYear(1904)).toBe(1460)
  })
})

describe('getDaysBeforeMonthInYear(year, month)', () => {
  it('should return 0 when month = 1 (January)', () => {
    expect(getDaysBeforeMonthInYear(1900, 1)).toBe(0)
    expect(getDaysBeforeMonthInYear(2020, 1)).toBe(0)
  })

  it('should handle non-leap year (1900) for month=3 => 59 days', () => {
    // Jan = 31, Feb = 28 => 31 + 28 = 59
    expect(getDaysBeforeMonthInYear(1900, 3)).toBe(59)
  })

  it('should handle leap year (2020) for month=3 => 60 days', () => {
    // Jan = 31, Feb = 29 => 31 + 29 = 60
    expect(getDaysBeforeMonthInYear(2020, 3)).toBe(60)
  })

  it('for year=2021 (normal year), month=2 => should be 31 days', () => {
    // Jan = 31
    expect(getDaysBeforeMonthInYear(2021, 2)).toBe(31)
  })
})

describe('calculateDayOfWeek(year, month, day)', () => {
  it('1/1/1900 should be Monday', () => {
    expect(calculateDayOfWeek(1900, 1, 1)).toBe('Monday')
  })

  it('2/1/1900 should be Tuesday', () => {
    expect(calculateDayOfWeek(1900, 1, 2)).toBe('Tuesday')
  })

  it('29/2/2020 should be Saturday (leap day in leap year)', () => {
    expect(calculateDayOfWeek(2020, 2, 29)).toBe('Saturday')
  })

  it('15/8/2023 should be Tuesday', () => {
    // สามารถเช็คได้จาก calculation หรือแหล่งอื่น
    expect(calculateDayOfWeek(2023, 8, 15)).toBe('Tuesday')
  })
})