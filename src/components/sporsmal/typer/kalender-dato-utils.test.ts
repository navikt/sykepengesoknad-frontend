import { describe, expect, it } from 'vitest'
import { TZDate } from '@date-fns/tz'

import { erSammeKalenderDag, tilLokalKalenderDato, tilOsloKalenderDatoFraDato } from './kalender-dato-utils'

describe('kalender-dato-utils', () => {
    it('bevarer år, måned og dag uten tidssoneforskyvning', () => {
        const bangkokDato = new TZDate('2021-01-04', 'Asia/Bangkok')
        const osloKalenderdato = tilOsloKalenderDatoFraDato(bangkokDato)

        expect(osloKalenderdato.getFullYear()).toBe(2021)
        expect(osloKalenderdato.getMonth()).toBe(0)
        expect(osloKalenderdato.getDate()).toBe(4)
    })

    it('sammenligner samme kalenderdag i Oslo selv om Date-objekter har ulik tidssonevisning', () => {
        const utcMidnatt = new Date('2021-01-04T00:00:00.000Z')
        const lokalKalenderdato = new Date(2021, 0, 4)

        expect(erSammeKalenderDag(utcMidnatt, lokalKalenderdato)).toBe(true)
    })

    it('normaliserer Date-objekt til lokal kalenderdato basert på Oslo-dag', () => {
        const osloMidnattSomUtcInstant = new Date('2020-03-31T22:00:00.000Z')
        const lokalKalenderdato = tilLokalKalenderDato(osloMidnattSomUtcInstant)

        expect(lokalKalenderdato.getFullYear()).toBe(2020)
        expect(lokalKalenderdato.getMonth()).toBe(3)
        expect(lokalKalenderdato.getDate()).toBe(1)
    })

    it('beholder samme kalenderdag når vi går lokal -> oslo -> lokal', () => {
        const lokalKlikkDato = new Date(2021, 0, 4)
        const lagretSomOslo = tilOsloKalenderDatoFraDato(lokalKlikkDato)
        const vistILokalKalender = tilLokalKalenderDato(lagretSomOslo)

        expect(vistILokalKalender.getFullYear()).toBe(2021)
        expect(vistILokalKalender.getMonth()).toBe(0)
        expect(vistILokalKalender.getDate()).toBe(4)
    })

    it('beholder kalenderdag ved lagring fra østlig tidssone', () => {
        const bangkokKlikkDato = new TZDate('2021-01-04', 'Asia/Bangkok')
        const lagretSomOslo = tilOsloKalenderDatoFraDato(bangkokKlikkDato)
        const vistILokalKalender = tilLokalKalenderDato(lagretSomOslo)

        expect(vistILokalKalender.getFullYear()).toBe(2021)
        expect(vistILokalKalender.getMonth()).toBe(0)
        expect(vistILokalKalender.getDate()).toBe(4)
    })
})
