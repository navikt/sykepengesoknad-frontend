import { test, expect } from 'vitest'

import { toDate } from './dato-utils'
import { andrePinsedag, easterSunday, førstePinsedag, kristiHimmelfartsdag } from './helligdager-utils'

function expectSameDate(actual: Date, expectedIso: string) {
    const expected = toDate(expectedIso)
    expect(actual.getFullYear()).toBe(expected.getFullYear())
    expect(actual.getMonth()).toBe(expected.getMonth())
    expect(actual.getDate()).toBe(expected.getDate())
}

test('Påske 2020', () => {
    expectSameDate(easterSunday(2020), '2020-04-12')
})

test('Påske 2021', () => {
    expectSameDate(easterSunday(2021), '2021-04-04')
})

test('Påske 2022', () => {
    expectSameDate(easterSunday(2022), '2022-04-17')
})

test('Påske 2023', () => {
    expectSameDate(easterSunday(2023), '2023-04-09')
})

test('Påske 2024', () => {
    expectSameDate(easterSunday(2024), '2024-03-31')
})

test('Påske 2025', () => {
    expectSameDate(easterSunday(2025), '2025-04-20')
})

test('Påske 2026', () => {
    expectSameDate(easterSunday(2026), '2026-04-05')
})

test('Påske 2027', () => {
    expectSameDate(easterSunday(2027), '2027-03-28')
})

test('Påske 2028', () => {
    expectSameDate(easterSunday(2028), '2028-04-16')
})

test('Påske 2029', () => {
    expectSameDate(easterSunday(2029), '2029-04-01')
})

test('Påske 2030', () => {
    expectSameDate(easterSunday(2030), '2030-04-21')
})

test('Kristi himmelfartsdag 2020', () => {
    expectSameDate(kristiHimmelfartsdag(2020), '2020-05-21')
})

test('Kristi himmelfartsdag 2021', () => {
    expectSameDate(kristiHimmelfartsdag(2021), '2021-05-13')
})

test('Kristi himmelfartsdag 2022', () => {
    expectSameDate(kristiHimmelfartsdag(2022), '2022-05-26')
})

test('Kristi himmelfartsdag 2023', () => {
    expectSameDate(kristiHimmelfartsdag(2023), '2023-05-18')
})

test('Kristi himmelfartsdag 2024', () => {
    expectSameDate(kristiHimmelfartsdag(2024), '2024-05-09')
})

test('Kristi himmelfartsdag 2025', () => {
    expectSameDate(kristiHimmelfartsdag(2025), '2025-05-29')
})

test('første pinsedag 2020', () => {
    expectSameDate(førstePinsedag(2020), '2020-05-31')
})

test('første pinsedag 2021', () => {
    expectSameDate(førstePinsedag(2021), '2021-05-23')
})

test('første pinsedag 2022', () => {
    expectSameDate(førstePinsedag(2022), '2022-06-05')
})

test('første pinsedag 2023', () => {
    expectSameDate(førstePinsedag(2023), '2023-05-28')
})

test('første pinsedag 2024', () => {
    expectSameDate(førstePinsedag(2024), '2024-05-19')
})

test('første pinsedag 2025', () => {
    expectSameDate(førstePinsedag(2025), '2025-06-08')
})

test('andre pinsedag 2022', () => {
    expectSameDate(andrePinsedag(2022), '2022-06-06')
})

test('andre pinsedag 2023', () => {
    expectSameDate(andrePinsedag(2023), '2023-05-29')
})

test('andre pinsedag 2024', () => {
    expectSameDate(andrePinsedag(2024), '2024-05-20')
})

test('andre pinsedag 2025', () => {
    expectSameDate(andrePinsedag(2025), '2025-06-09')
})
