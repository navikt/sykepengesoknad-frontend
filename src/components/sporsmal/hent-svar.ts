import { SvarEnums } from '../../types/enums'
import { RSSvarliste } from '../../types/rs-types/rs-svarliste'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal, svarverdiToKvittering } from '../../types/types'
import { empty } from '../../utils/constants'
import { FormPeriode } from './typer/periode-komp'

export const hentSvar = (sporsmal: Sporsmal): any => {
    const svarliste = sporsmal.svarliste
    const svar = svarliste.svar[0]

    //TODO: Skrive om til switch case?
    if (sporsmal.svartype === RSSvartype.INFO_BEHANDLINGSDAGER) {
        const ukeliste: RSSvarliste[] = []
        sporsmal.undersporsmal.forEach(uspm => {
            ukeliste.push(uspm.svarliste)
        })
        return ukeliste
    }

    if (sporsmal.svartype.toString().startsWith('RADIO_GRUPPE')) {
        const besvartSporsmal = sporsmal.undersporsmal.find((spm: Sporsmal) => {
            return spm.svarliste.svar[0] && spm.svarliste.svar[0].verdi === SvarEnums.CHECKED
        })
        return besvartSporsmal ? besvartSporsmal.sporsmalstekst : undefined
    }

    if (sporsmal.svartype === RSSvartype.KVITTERING) {
        return svarliste.svar.map(s => svarverdiToKvittering(s.verdi))     // svar.verdi = "kvittering"
    }

    if (sporsmal.svartype === RSSvartype.DATOER) {
        return svarliste.svar
    }

    if (svar === undefined) {
        return sporsmal.svartype.toString().startsWith('PERIODE') ||
        sporsmal.svartype.toString().startsWith('DATOER') ? [] : ''
    }

    return svar.verdi
}

export const hentPerioder = (sporsmal: Sporsmal) => {
    const perioder: number[] = []
    sporsmal.svarliste.svar.forEach((svar, idx) =>
        perioder.push(idx)
    )
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

export const hentPeriodeListe = ( sporsmal: Sporsmal ) => {
    return hentPerioder(sporsmal).map(i => hentPeriode(sporsmal, i))
}

export const hentFormState = (sporsmal: Sporsmal) => {
    return hentSvarliste(sporsmal)
}

const hentSvarliste = (sporsmal: Sporsmal) => {
    let svar: any = {}

    if (sporsmal.svarliste.svar[0] !== undefined) {
        svar[sporsmal.id] = sporsmal.svarliste.svar[0].verdi
    }
    sporsmal.undersporsmal.forEach((spm) => {
        const alleUndersporsmalSvar: any = hentSvarliste(spm)
        svar = { ...svar, ...alleUndersporsmalSvar }
    })
    return svar
}
