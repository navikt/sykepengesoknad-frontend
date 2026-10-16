import { describe, expect, it } from 'vitest'

import { formatterDato, formatterPeriode } from './backend-datoformat'

describe('backend-datoformat', () => {
    it('formaterer dato som backend', () => {
        expect(formatterDato('2025-05-01')).toBe('1. mai 2025')
    })

    it('formaterer perioder i samme måned som backend', () => {
        expect(formatterPeriode('2020-04-01', '2020-04-24')).toBe('1. - 24. april 2020')
    })

    it('formaterer perioder på tvers av måneder som backend', () => {
        expect(formatterPeriode('2020-04-01', '2020-05-24')).toBe('1. april - 24. mai 2020')
    })

    it('formaterer perioder på tvers av år som backend', () => {
        expect(formatterPeriode('2020-04-01', '2021-05-24')).toBe('1. april 2020 - 24. mai 2021')
    })
})
