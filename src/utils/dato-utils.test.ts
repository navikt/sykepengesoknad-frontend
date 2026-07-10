import { describe, expect, it } from 'vitest'
import { TZDate } from '@date-fns/tz'

import {
    fraInputdatoTilJSDato,
    fraBackendTilDate,
    serializerDatoTilOslo,
    tilLesbarDatoMedArstall,
    tilLesbarPeriodeMedArstall,
    tilLesbarDatoUtenAarstall,
    toDate,
} from './dato-utils'

const nyYorkDato = (iso: string) => new Date(iso)

/**
 * Tidssone-tester for dato-utils med date-fns/tz.
 *
 * Kjøres i Europe/Oslo, America/New_York og UTC via `npm run test:ci`.
 *
 * Løsning: TZDate med eksplisitt Europe/Oslo tidssone sikrer at
 * dato-strenger alltid tolkes korrekt uavhengig av brukerens tidssone.
 */

describe('dato-utils tidssone-sikkerhet (date-fns/tz)', () => {
    describe('toDate (kjernefunksjon)', () => {
        it('parser 2020-04-01 til 1. april uansett tidssone', () => {
            const dato = toDate('2020-04-01')
            expect(dato.getFullYear()).toBe(2020)
            expect(dato.getMonth()).toBe(3)
            expect(dato.getDate()).toBe(1)
        })

        it('parser 2024-01-01 til 1. januar uansett tidssone', () => {
            const dato = toDate('2024-01-01')
            expect(dato.getFullYear()).toBe(2024)
            expect(dato.getMonth()).toBe(0)
            expect(dato.getDate()).toBe(1)
        })

        it('parser 2023-12-31 til 31. desember uansett tidssone', () => {
            const dato = toDate('2023-12-31')
            expect(dato.getFullYear()).toBe(2023)
            expect(dato.getMonth()).toBe(11)
            expect(dato.getDate()).toBe(31)
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

        it('viser riktig dato for en Date laget i New York', () => {
            expect(tilLesbarDatoMedArstall(nyYorkDato('2021-01-04T05:00:00.000Z'))).toBe('4. januar 2021')
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

        it('viser korrekt periode når fom er en New York-dato', () => {
            expect(tilLesbarPeriodeMedArstall(nyYorkDato('2020-04-01T04:00:00.000Z'), '2020-04-24')).toBe(
                '1. – 24. april 2020',
            )
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

    describe('serializerDatoTilOslo', () => {
        it('beholder kalenderdag når datoobjekt kommer fra New York-midnatt', () => {
            expect(serializerDatoTilOslo(nyYorkDato('2021-01-04T05:00:00.000Z'))).toBe('2021-01-04')
        })

        it('beholder kalenderdag når datoobjekt kommer fra New York og vises i Oslo', () => {
            expect(serializerDatoTilOslo(nyYorkDato('2020-04-01T04:00:00.000Z'))).toBe('2020-04-01')
        })

        it('konverterer Bangkok-midnatt til Oslo-kalenderdag', () => {
            const bangkokDato = new TZDate('2021-01-04', 'Asia/Bangkok')
            expect(serializerDatoTilOslo(bangkokDato)).toBe('2021-01-04')
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
