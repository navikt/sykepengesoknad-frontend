import { describe, expect, it } from 'vitest'

import {
    fraInputdatoTilJSDato,
    fraBackendTilDate,
    tilBackendDatoFraDatoobjekt,
    tilLesbarDatoMedArstall,
    tilLesbarPeriodeMedArstall,
    tilLesbarDatoUtenAarstall,
    tilOsloDatoFraDato,
    toDate,
} from './dato-utils'

/**
 * Tidssone-tester for dato-utils med date-fns/tz.
 *
 * Kjør med TZ=America/New_York for å verifisere tidssone-sikkerhet:
 *   TZ=America/New_York npm run test:ci -- src/utils/dato-utils.test.ts
 *
 * Løsning: TZDate med eksplisitt Europe/Oslo tidssone sikrer at
 * dato-strenger alltid tolkes korrekt uavhengig av brukerens tidssone.
 */

describe('dato-utils tidssone-sikkerhet (date-fns/tz)', () => {
    describe('toDate (kjernefunksjon)', () => {
        it('parser 2020-04-01 til 1. april uansett tidssone', () => {
            const dato = toDate('2020-04-01')
            expect(dato.getDate()).toBe(1)
            expect(dato.getMonth()).toBe(3)
            expect(dato.getFullYear()).toBe(2020)
        })

        it('parser 2024-01-01 til 1. januar uansett tidssone', () => {
            const dato = toDate('2024-01-01')
            expect(dato.getDate()).toBe(1)
            expect(dato.getMonth()).toBe(0)
            expect(dato.getFullYear()).toBe(2024)
        })

        it('parser 2023-12-31 til 31. desember uansett tidssone', () => {
            const dato = toDate('2023-12-31')
            expect(dato.getDate()).toBe(31)
            expect(dato.getMonth()).toBe(11)
            expect(dato.getFullYear()).toBe(2023)
        })
    })

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

        it('viser korrekt periode når fom er Date-objekt med tidssoneforskyvning', () => {
            const fomSomDateObjekt = new Date('2020-03-31T22:00:00.000Z')
            expect(tilLesbarPeriodeMedArstall(fomSomDateObjekt, '2020-04-24')).toBe('1. – 24. april 2020')
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

    describe('tilBackendDatoFraDatoobjekt', () => {
        it('beholder Oslo-kalenderdag når datoobjekt er UTC-midnatt', () => {
            const utcMidnatt = new Date('2021-01-04T00:00:00.000Z')
            expect(tilBackendDatoFraDatoobjekt(utcMidnatt)).toBe('2021-01-04')
        })

        it('beholder Oslo-kalenderdag når datoobjekt er Oslo-midnatt som UTC-instant', () => {
            const osloMidnattSomUtcInstant = new Date('2020-03-31T22:00:00.000Z')
            expect(tilBackendDatoFraDatoobjekt(osloMidnattSomUtcInstant)).toBe('2020-04-01')
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

    describe('tilOsloDatoFraDato', () => {
        it('konverterer UTC-midnatt dato korrekt til Oslo (regresjon: NYC-tidssone-bug)', () => {
            // UTC midnatt 4. januar = NY 3. januar kl 19:00.
            // Feil implementasjon brukte lokal getDate() og ga Oslo jan 3.
            const utcMidnatt = new Date('2021-01-04T00:00:00.000Z')
            const oslo = tilOsloDatoFraDato(utcMidnatt)
            expect(oslo.getFullYear()).toBe(2021)
            expect(oslo.getMonth()).toBe(0)
            expect(oslo.getDate()).toBe(4)
        })

        it('konverterer lokal midnatt dato korrekt til Oslo', () => {
            const lokalDato = new Date(2021, 0, 4)
            const oslo = tilOsloDatoFraDato(lokalDato)
            expect(oslo.getFullYear()).toBe(2021)
            expect(oslo.getMonth()).toBe(0)
            expect(oslo.getDate()).toBe(4)
        })

        it('round-trip: tilOsloDatoFraDato(toDate(str)) gir riktig dag', () => {
            const oslo = tilOsloDatoFraDato(toDate('2021-01-04'))
            expect(oslo.getFullYear()).toBe(2021)
            expect(oslo.getMonth()).toBe(0)
            expect(oslo.getDate()).toBe(4)
        })
    })
})
