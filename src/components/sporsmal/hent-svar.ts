import { SvarEnums } from '../../types/enums'
import { RSSvar } from '../../types/rs-types/rs-svar'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal, svarverdiToKvittering } from '../../types/types'
import { empty } from '../../utils/constants'

import { FormPeriode } from './typer/periode-komp'

export const hentSvar = (sporsmal: Sporsmal): any => {
    const svarliste = sporsmal.svarliste
    const svar = svarliste.svar[0]

    const svartype = sporsmal.svartype
    switch (svartype) {
        case RSSvartype.INFO_BEHANDLINGSDAGER:
            return sporsmal.undersporsmal.map((uspm) => uspm.svarliste)

        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL:
            return svar?.verdi === 'CHECKED'

        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.RADIO_GRUPPE_UKEKALENDER:
            return (
                sporsmal.undersporsmal.find((spm: Sporsmal) => {
                    return spm.svarliste.svar[0]?.verdi === SvarEnums.CHECKED
                })?.sporsmalstekst || undefined
            )

        case RSSvartype.DATOER:
        case RSSvartype.LAND:
        case RSSvartype.PERIODER:
            return svarliste.svar.map((svar: RSSvar) => svar.verdi)

        case RSSvartype.KVITTERING:
            return svarliste.svar.map((s) => svarverdiToKvittering(s.verdi))
    }

    if (svar === undefined) {
        return sporsmal.svartype.toString().startsWith('PERIODE') || sporsmal.svartype.toString().startsWith('DATOER')
            ? []
            : ''
    }

    return svar.verdi
}

export const hentPerioder = (sporsmal: Sporsmal) => {
    const perioder: number[] = []
    sporsmal.svarliste.svar.forEach((svar, idx) => perioder.push(idx))
    return perioder
}

export const hentPeriode = (sporsmal: Sporsmal, index: number) => {
    const svar = sporsmal.svarliste.svar[index]
    const periode: FormPeriode = { fom: '', tom: '' }
    if (svar === empty) {
        return periode
    }
    return JSON.parse(svar.verdi) as FormPeriode
}

export const hentPeriodeListe = (sporsmal: Sporsmal) => {
    return hentPerioder(sporsmal).map((i) => hentPeriode(sporsmal, i))
}

export const hentFormState = (sporsmal: Sporsmal) => {
    return hentSvarliste(sporsmal)
}

const hentSvarliste = (sporsmal: Sporsmal) => {
    let svar: any = {}

    // PERIODER har ingen input på spm.id, de ligger i spm.id_idx
    if (sporsmal.svartype === RSSvartype.PERIODER) {
        hentSvar(sporsmal).forEach((periode: string, idx: number) => {
            svar[sporsmal.id + '_' + idx] = JSON.parse(periode)
        })
    } else {
        svar[sporsmal.id] = hentSvar(sporsmal)
    }

    sporsmal.undersporsmal.forEach((spm) => {
        const alleUndersporsmalSvar: any = hentSvarliste(spm)
        svar = { ...svar, ...alleUndersporsmalSvar }
    })
    return svar
}
