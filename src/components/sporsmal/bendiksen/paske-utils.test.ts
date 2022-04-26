import dayjs from 'dayjs'

import { easterSunday } from './paske-utils'

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
