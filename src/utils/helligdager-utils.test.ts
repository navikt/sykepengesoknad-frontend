import dayjs from 'dayjs'
import { test, expect } from 'vitest'

import { andrePinsedag, easterSunday, førstePinsedag, kristiHimmelfartsdag } from './helligdager-utils'

test('Påske 2020', () => {
    expect(easterSunday(2020)).toEqual(dayjs('2020.04.12'))
})

test('Påske 2021', () => {
    expect(easterSunday(2021)).toEqual(dayjs('2021.04.04'))
})

test('Påske 2022', () => {
    expect(easterSunday(2022)).toEqual(dayjs('2022.04.17'))
})

test('Påske 2023', () => {
    expect(easterSunday(2023)).toEqual(dayjs('2023.04.09'))
})

test('Påske 2024', () => {
    expect(easterSunday(2024)).toEqual(dayjs('2024.03.31'))
})

test('Påske 2025', () => {
    expect(easterSunday(2025)).toEqual(dayjs('2025.04.20'))
})

test('Påske 2026', () => {
    expect(easterSunday(2026)).toEqual(dayjs('2026.04.05'))
})

test('Påske 2027', () => {
    expect(easterSunday(2027)).toEqual(dayjs('2027.03.28'))
})

test('Påske 2028', () => {
    expect(easterSunday(2028)).toEqual(dayjs('2028.04.16'))
})

test('Påske 2029', () => {
    expect(easterSunday(2029)).toEqual(dayjs('2029.04.01'))
})

test('Påske 2030', () => {
    expect(easterSunday(2030)).toEqual(dayjs('2030.04.21'))
})

test('Kristi himmelfartsdag 2020', () => {
    expect(kristiHimmelfartsdag(2020)).toEqual(dayjs('2020.05.21'))
})

test('Kristi himmelfartsdag 2021', () => {
    expect(kristiHimmelfartsdag(2021)).toEqual(dayjs('2021.05.13'))
})

test('Kristi himmelfartsdag 2022', () => {
    expect(kristiHimmelfartsdag(2022)).toEqual(dayjs('2022.05.26'))
})

test('Kristi himmelfartsdag 2023', () => {
    expect(kristiHimmelfartsdag(2023)).toEqual(dayjs('2023.05.18'))
})

test('Kristi himmelfartsdag 2024', () => {
    expect(kristiHimmelfartsdag(2024)).toEqual(dayjs('2024.05.09'))
})

test('Kristi himmelfartsdag 2025', () => {
    expect(kristiHimmelfartsdag(2025)).toEqual(dayjs('2025.05.29'))
})

test('første pinsedag 2020', () => {
    expect(førstePinsedag(2020)).toEqual(dayjs('2020.05.31'))
})

test('første pinsedag 2021', () => {
    expect(førstePinsedag(2021)).toEqual(dayjs('2021.05.23'))
})

test('første pinsedag 2022', () => {
    expect(førstePinsedag(2022)).toEqual(dayjs('2022.06.05'))
})

test('første pinsedag 2023', () => {
    expect(førstePinsedag(2023)).toEqual(dayjs('2023.05.28'))
})

test('første pinsedag 2024', () => {
    expect(førstePinsedag(2024)).toEqual(dayjs('2024.05.19'))
})

test('første pinsedag 2025', () => {
    expect(førstePinsedag(2025)).toEqual(dayjs('2025.06.08'))
})

test('andre pinsedag 2022', () => {
    expect(andrePinsedag(2022)).toEqual(dayjs('2022.06.06'))
})

test('andre pinsedag 2023', () => {
    expect(andrePinsedag(2023)).toEqual(dayjs('2023.05.29'))
})

test('andre pinsedag 2024', () => {
    expect(andrePinsedag(2024)).toEqual(dayjs('2024.05.20'))
})

test('andre pinsedag 2025', () => {
    expect(andrePinsedag(2025)).toEqual(dayjs('2025.06.09'))
})
