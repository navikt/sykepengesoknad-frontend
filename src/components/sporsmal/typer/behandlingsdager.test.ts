import { describe, expect, it } from 'vitest'
import { getISOWeek } from 'date-fns'

import { osloDate, tilLokalDatoFraDato } from '../../../utils/dato-utils'

import {
    erSammeKalenderDag,
    fjernKalenderDato,
    finnEndringIValgteDatoer,
    tilOsloKalenderDato,
} from './kalender-dato-utils'

const ukeNummer = (dato: Date) => getISOWeek(tilLokalDatoFraDato(tilOsloKalenderDato(dato)))

function velgDato(datoerFraKalender: Date[], tidligereValgteDatoer: Date[]): Date[] {
    const endring = finnEndringIValgteDatoer(datoerFraKalender, tidligereValgteDatoer)
    if (endring.type === 'avvalgt') {
        return fjernKalenderDato(tidligereValgteDatoer, endring.dato)
    }
    if (endring.type === 'ingen') return tidligereValgteDatoer

    const nyDatoMedOsloTidssone = tilOsloKalenderDato(endring.dato)
    const valgtUke = ukeNummer(nyDatoMedOsloTidssone)
    const beholdteDatoer = tidligereValgteDatoer.filter((tidligereDato) => ukeNummer(tidligereDato) !== valgtUke)

    return [...beholdteDatoer, nyDatoMedOsloTidssone]
}

describe('Behandlingsdager — en dag per uke', () => {
    const mandagUkeTo = osloDate(2024, 1, 8)
    const tirsdagUkeTo = osloDate(2024, 1, 9)
    const onsdagUkeTo = osloDate(2024, 1, 10)
    const mandagUkeTre = osloDate(2024, 1, 15)

    it('velger mandag når ingen er valgt fra før', () => {
        const resultat = velgDato([mandagUkeTo], [])
        expect(resultat).toHaveLength(1)
        expect(erSammeKalenderDag(resultat[0], mandagUkeTo)).toBe(true)
    })

    it('legger til dag i ny uke uten å fjerne eksisterende', () => {
        const resultat = velgDato([mandagUkeTo, mandagUkeTre], [mandagUkeTo])
        expect(resultat).toHaveLength(2)
        expect(resultat.some((dato) => erSammeKalenderDag(dato, mandagUkeTo))).toBe(true)
        expect(resultat.some((dato) => erSammeKalenderDag(dato, mandagUkeTre))).toBe(true)
    })

    it('erstatter onsdag med mandag i samme uke', () => {
        const datoerFraKalender = [mandagUkeTo, onsdagUkeTo]
        const resultat = velgDato(datoerFraKalender, [onsdagUkeTo])

        expect(resultat).toHaveLength(1)
        expect(erSammeKalenderDag(resultat[0], mandagUkeTo)).toBe(true)
    })

    it('erstatter mandag med onsdag i samme uke', () => {
        const datoerFraKalender = [mandagUkeTo, onsdagUkeTo]
        const resultat = velgDato(datoerFraKalender, [mandagUkeTo])

        expect(resultat).toHaveLength(1)
        expect(erSammeKalenderDag(resultat[0], onsdagUkeTo)).toBe(true)
    })

    it('erstatter tirsdag med mandag i samme uke', () => {
        const datoerFraKalender = [mandagUkeTo, tirsdagUkeTo]
        const resultat = velgDato(datoerFraKalender, [tirsdagUkeTo])

        expect(resultat).toHaveLength(1)
        expect(erSammeKalenderDag(resultat[0], mandagUkeTo)).toBe(true)
    })

    it('fjerner dag når den avvelges', () => {
        const datoerFraKalender = [mandagUkeTre]
        const resultat = velgDato(datoerFraKalender, [mandagUkeTo, mandagUkeTre])

        expect(resultat).toHaveLength(1)
        expect(erSammeKalenderDag(resultat[0], mandagUkeTre)).toBe(true)
    })

    it('beregner uke likt i oslo og utc', () => {
        expect(ukeNummer(mandagUkeTo)).toBe(2)
        const sondag = osloDate(2024, 1, 7)
        expect(ukeNummer(sondag)).toBe(1)
    })
})
