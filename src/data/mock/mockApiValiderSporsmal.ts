import { logger } from '@navikt/next-logger'

import { RSSporsmal } from '../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../types/rs-types/rs-svar'

export function mockApiValiderSporsmal(sporsmal: RSSporsmal): boolean {
    try {
        if (sporsmal.tag === 'BEKREFT_OPPLYSNINGER') return true
        validerAntallSvar(sporsmal)
        validerSvarverdier(sporsmal)
        validerUndersporsmal(sporsmal)
    } catch (e: any) {
        logger.error(`Validering av spørsmål med id ${sporsmal.id} feilet: ${e.message}`)
        return false
    }
    return true
}

function validerAntallSvar(sporsmal: RSSporsmal): void {
    const predikat = (antall: number): boolean => {
        switch (sporsmal.svartype) {
            case 'JA_NEI':
            case 'BELOP':
            case 'KILOMETER':
            case 'CHECKBOX_PANEL':
            case 'DATO':
            case 'MAANED':
            case 'RADIO_GRUPPE_UKEKALENDER':
            case 'RADIO':
            case 'PROSENT':
            case 'PERIODE':
            case 'TIMER':
            case 'TALL':
            case 'CHECKBOX':
            case 'OPPSUMMERING':
            case 'BEKREFTELSESPUNKTER':
                return antall === 1

            case 'FRITEKST':
                return sporsmal.min === null || antall === 1

            case 'RADIO_GRUPPE':
            case 'RADIO_GRUPPE_TIMER_PROSENT':
            case 'IKKE_RELEVANT':
            case 'GRUPPE_AV_UNDERSPORSMAL':
            case 'INFO_BEHANDLINGSDAGER':
            case 'CHECKBOX_GRUPPE':
                return antall === 0

            case 'LAND':
            case 'COMBOBOX_SINGLE':
            case 'COMBOBOX_MULTI':
            case 'PERIODER':
            case 'DATOER':
                return antall > 0

            case 'KVITTERING':
                return antall >= 0

            default:
                return false
        }
    }

    if (!predikat(sporsmal.svar.length)) {
        throw new Error(
            `Spørsmål med id ${sporsmal.id} og svartype ${sporsmal.svartype} og tag ${sporsmal.tag} har feil antall svar ${sporsmal.svar.length}`,
        )
    }
}

function validerUndersporsmal(sporsmal: RSSporsmal): void {
    const besvarteUndersporsmal = sporsmal.undersporsmal.filter((usp) => usp.svar.length > 0)

    switch (sporsmal.svartype) {
        case 'CHECKBOX_GRUPPE':
            if (besvarteUndersporsmal.length === 0) {
                throw new Error(
                    `Spørsmål ${sporsmal.id} av typen ${sporsmal.svartype} må ha minst ett besvart underspørsmål`,
                )
            }
            besvarteUndersporsmal.forEach((usp) => {
                if (!mockApiValiderSporsmal(usp)) throw new Error(`Feil i underspørsmål ${usp.id}`)
            })
            break

        case 'RADIO_GRUPPE':
        case 'RADIO_GRUPPE_TIMER_PROSENT':
            if (besvarteUndersporsmal.length !== 1) {
                throw new Error(
                    `Spørsmål ${sporsmal.id} av typen ${sporsmal.svartype} må ha eksakt ett besvart underspørsmål, men har ${besvarteUndersporsmal.length}`,
                )
            }
            besvarteUndersporsmal.forEach((usp) => {
                if (!mockApiValiderSporsmal(usp)) throw new Error(`Feil i underspørsmål ${usp.id}`)
            })
            break

        case 'BEKREFTELSESPUNKTER':
        case 'OPPSUMMERING':
        case 'JA_NEI':
        case 'CHECKBOX':
        case 'CHECKBOX_PANEL':
        case 'DATOER':
        case 'BELOP':
        case 'KILOMETER':
        case 'DATO':
        case 'MAANED':
        case 'PERIODE':
        case 'PERIODER':
        case 'TIMER':
        case 'FRITEKST':
        case 'LAND':
        case 'COMBOBOX_SINGLE':
        case 'COMBOBOX_MULTI':
        case 'IKKE_RELEVANT':
        case 'GRUPPE_AV_UNDERSPORSMAL':
        case 'PROSENT':
        case 'RADIO':
        case 'TALL':
        case 'INFO_BEHANDLINGSDAGER':
        case 'RADIO_GRUPPE_UKEKALENDER':
        case 'KVITTERING':
            if (sporsmal.kriterieForVisningAvUndersporsmal != null) {
                if (
                    sporsmal.svar.length === 1 &&
                    sporsmal.svar[0].verdi === sporsmal.kriterieForVisningAvUndersporsmal
                ) {
                    sporsmal.undersporsmal.forEach((usp) => {
                        if (!mockApiValiderSporsmal(usp)) throw new Error(`Feil i underspørsmål ${usp.id}`)
                    })
                }
            } else {
                sporsmal.undersporsmal.forEach((usp) => {
                    if (!mockApiValiderSporsmal(usp)) throw new Error(`Feil i underspørsmål ${usp.id}`)
                })
            }
            break

        // Legg til flere case-betingelser etter behov
    }
}

function validerSvarverdier(sporsmal: RSSporsmal): void {
    sporsmal.svar.forEach((svar) => validerSvarverdi(sporsmal, svar))
}

function validerSvarverdi(sporsmal: RSSporsmal, svar: RSSvar): void {
    const verdi = svar.verdi
    let predikat: () => boolean = () => false

    switch (sporsmal.svartype) {
        case 'FRITEKST':
            predikat = () => sporsmal.min === null || verdi.trim().length >= parseInt(sporsmal.min)
            break

        case 'COMBOBOX_SINGLE':
        case 'COMBOBOX_MULTI':
        case 'LAND':
            predikat = () => verdi.trim() !== ''
            break

        case 'JA_NEI':
            predikat = () => verdi === 'JA' || verdi === 'NEI'
            break

        case 'CHECKBOX_PANEL':
        case 'RADIO':
            predikat = () => verdi === 'CHECKED'
            break

        case 'CHECKBOX':
            predikat = () => verdi === 'CHECKED' || verdi === ''
            break

        case 'DATO':
        case 'MAANED':
        case 'DATOER':
            predikat = () => erDato(verdi)
            break

        case 'PROSENT':
        case 'BELOP':
            predikat = () => erHeltall(verdi)
            break

        case 'TIMER':
        case 'TALL':
            predikat = () => erFlyttall(verdi)
            break

        case 'KILOMETER':
            predikat = () => erDoubleMedMaxEnDesimal(verdi)
            break

        case 'KVITTERING':
            // Implementer validerKvittering(svar.verdi) // TODO implementer validering
            predikat = () => true

            break

        case 'PERIODE':
        case 'PERIODER':
            predikat = () => erPeriode(verdi)
            break

        case 'RADIO_GRUPPE_UKEKALENDER':
            predikat = () => verdi === 'INGEN_BEHANDLING' || erDato(verdi)
            break

        case 'RADIO_GRUPPE':
        case 'RADIO_GRUPPE_TIMER_PROSENT':
        case 'IKKE_RELEVANT':
        case 'GRUPPE_AV_UNDERSPORSMAL':
        case 'INFO_BEHANDLINGSDAGER':
        case 'CHECKBOX_GRUPPE':
            throw new Error('Skal ha validert 0 svar allerede')

        case 'BEKREFTELSESPUNKTER':
        case 'OPPSUMMERING':
            predikat = () => verdi === 'true'
    }

    if (!predikat()) {
        throw new Error(
            `Spørsmål ${sporsmal.id} med svartype: ${sporsmal.svartype} og med tag: ${sporsmal.tag} har feil svarverdi: ${verdi}.`,
        )
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function erDato(verdi: string): boolean {
    // Implementer logikken for å sjekke om en streng er en gyldig dato
    return true // Placeholder
}

function erHeltall(verdi: string): boolean {
    return !isNaN(parseInt(verdi))
}

function erFlyttall(verdi: string): boolean {
    return !isNaN(parseFloat(verdi.replace(',', '.')))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function erDoubleMedMaxEnDesimal(verdi: string): boolean {
    // Implementer logikken for å sjekke om en streng er et tall med maks én desimal
    return true // Placeholder
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function erPeriode(verdi: string): boolean {
    // Implementer logikken for å sjekke om en streng representerer en gyldig periode
    return true // Placeholder
}

// Tilpass og implementer andre nødvendige funksjoner
