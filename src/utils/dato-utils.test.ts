import { describe, expect, it } from 'vitest'

import {
    fraInputdatoTilJSDato,
    fraBackendTilDate,
    tilLesbarDatoMedArstall,
    tilLesbarPeriodeMedArstall,
    tilLesbarDatoUtenAarstall,
} from './dato-utils'

/**
 * Tidssone-tester for dato-utils.
 *
 * Kjør med TZ=America/New_York for å verifisere tidssone-sikkerhet:
 *   TZ=America/New_York npm run test:ci -- src/utils/dato-utils.test.ts
 *
 * Problemet: `new Date('2020-04-01')` tolkes som UTC midnight.
 * I UTC-5 gir getDate() = 31 (mars), ikke 1 (april).
 * Løsning: bruk dayjs() som parser dato-strenger som lokal tid.
 */

describe('dato-utils tidssone-sikkerhet', () => {
    describe('tilLesbarDatoMedArstall', () => {
        it('viser 1. april 2020 for 2020-04-01', () => {
            expect(tilLesbarDatoMedArstall('2020-04-01')).toBe('1. april 2020')
        })

        it('viser 1. januar 2024 for 2024-01-01', () => {
            expect(tilLesbarDatoMedArstall('2024-01-01')).toBe('1. januar 2024')
        })

        it('viser 31. desember 2023 for 2023-12-31', () => {
            expect(tilLesbarDatoMedArstall('2023-12-31')).toBe('31. desember 2023')
        })
    })

    describe('tilLesbarDatoUtenAarstall', () => {
        it('viser 1. april for 2020-04-01', () => {
            expect(tilLesbarDatoUtenAarstall('2020-04-01')).toBe('1. april')
        })
    })

    describe('tilLesbarPeriodeMedArstall', () => {
        it('viser korrekt periode innenfor samme måned', () => {
            expect(tilLesbarPeriodeMedArstall('2020-04-01', '2020-04-24')).toBe('1. – 24. april 2020')
        })

        it('viser korrekt periode over månedsskifte', () => {
            expect(tilLesbarPeriodeMedArstall('2020-04-01', '2020-05-24')).toBe('1. april – 24. mai 2020')
        })

        it('viser korrekt periode over årsskifte', () => {
            expect(tilLesbarPeriodeMedArstall('2023-12-01', '2024-01-15')).toBe('1. desember 2023 – 15. januar 2024')
        })
    })

    describe('fraBackendTilDate', () => {
        it('parser 2020-04-01 til 1. april', () => {
            const dato = fraBackendTilDate('2020-04-01')!
            expect(dato.getDate()).toBe(1)
            expect(dato.getMonth()).toBe(3)
        })

        it('parser 2024-01-01 til 1. januar', () => {
            const dato = fraBackendTilDate('2024-01-01')!
            expect(dato.getDate()).toBe(1)
            expect(dato.getMonth()).toBe(0)
        })
    })

    describe('fraInputdatoTilJSDato', () => {
        it('parser 01.04.2020 til 1. april uansett tidssone', () => {
            const dato = fraInputdatoTilJSDato('01.04.2020')
            expect(dato.getDate()).toBe(1)
            expect(dato.getMonth()).toBe(3)
            expect(dato.getFullYear()).toBe(2020)
        })

        it('parser 01.01.2024 til 1. januar uansett tidssone', () => {
            const dato = fraInputdatoTilJSDato('01.01.2024')
            expect(dato.getDate()).toBe(1)
            expect(dato.getMonth()).toBe(0)
            expect(dato.getFullYear()).toBe(2024)
        })

        it('parser 31.12.2023 til 31. desember uansett tidssone', () => {
            const dato = fraInputdatoTilJSDato('31.12.2023')
            expect(dato.getDate()).toBe(31)
            expect(dato.getMonth()).toBe(11)
            expect(dato.getFullYear()).toBe(2023)
        })
    })
})
