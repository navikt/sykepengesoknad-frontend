import dayjs from 'dayjs'

import { SvarEnums } from '../../types/enums'
import { RSSvar } from '../../types/rs-types/rs-svar'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import { empty } from '../../utils/constants'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

const hentVerdier = (sporsmal: Sporsmal, verdier: Record<string, any>) => {
    let verdi = verdier[sporsmal.id]
    if (sporsmal.svartype === RSSvartype.PERIODE || sporsmal.svartype === RSSvartype.PERIODER) {
        const startMed = sporsmal.id + '_'
        verdi = Object.entries(verdier)
            .filter(([key]) => key.startsWith(startMed))
            .map(([key]) => verdier[key])
            .filter((verdi) => verdi !== empty && verdi !== false)
    }
    return verdi
}

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, any>): Sporsmal => {
    const verdi = hentVerdier(sporsmal, verdier)
    const mutertSporsmal = sporsmal.copyWith({})
    if (
        verdi === undefined &&
        mutertSporsmal.svartype !== RSSvartype.IKKE_RELEVANT &&
        mutertSporsmal.svartype !== RSSvartype.RADIO &&
        mutertSporsmal.svartype !== RSSvartype.CHECKBOX &&
        mutertSporsmal.svartype !== RSSvartype.INFO_BEHANDLINGSDAGER
    ) {
        return sporsmal
    }
    /*
        switch (mutertSporsmal.svartype) {
            case RSSvartype.CHECKBOX_PANEL:
                return checkboxSvar(mutertSporsmal, verdi)
            case RSSvartype.CHECKBOX_GRUPPE:
                checkboksGruppeSvar(mutertSporsmal, verdi)
                break
            case RSSvartype.RADIO_GRUPPE:
            case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
                radiogruppeSvar(mutertSporsmal, verdi)
                break
            case RSSvartype.INFO_BEHANDLINGSDAGER:
                behandlingsdagerSvar(mutertSporsmal, verdi)
                break
            case RSSvartype.LAND:
                landSvar(mutertSporsmal, verdi)
                break
            case RSSvartype.DATO:
                datoSvar(mutertSporsmal, verdi)
                break
            case RSSvartype.DATOER:
                datoerSvar(mutertSporsmal, verdi)
                break
            case RSSvartype.PERIODE:
            case RSSvartype.PERIODER:
                periodeSvar(mutertSporsmal, verdi)
                break
            case RSSvartype.KVITTERING:
                // Denne settes i opplasting-form
                return mutertSporsmal
            case RSSvartype.RADIO:
            case RSSvartype.IKKE_RELEVANT:
            case RSSvartype.CHECKBOX:
                console.log('Breaker fra checkbox')
                // Skal ikke ha svarverdi
                break
            default:
                mutertSporsmal.svarliste = {
                    sporsmalId: mutertSporsmal.id,
                    svar: [{ verdi: verdi ? verdi.toString() : '' }],
                }
        }
    */
    mutertSporsmal.undersporsmal.map((spm) => settSvar(spm, verdier))
    return mutertSporsmal
}
/*
const checkboxSvar = (sporsmal: Sporsmal, verdi: any) => {
    const svarliste = {
        sporsmalId: sporsmal.id,
        svar: [
            {
                verdi: verdi === SvarEnums.CHECKED || verdi === true ? SvarEnums.CHECKED : '',
            },
        ],
    }
    return sporsmal.copyWith({ svarliste: svarliste })
}

const behandlingsdagerSvar = (sporsmal: Sporsmal, verdi: Date[]) => {
    const selectedDays = verdi

    for (let i = 0; i < sporsmal.undersporsmal.length; i++) {
        sporsmal.undersporsmal[i].svarliste.svar[0] = { verdi: 'Ikke til behandling' }
    }

    for (let i = 0; i < sporsmal.undersporsmal.length; i++) {
        for (const date of selectedDays) {
            if (
                date <= dayjs(sporsmal.undersporsmal[i].max).toDate() &&
                date >= dayjs(sporsmal.undersporsmal[i].min).toDate()
            ) {
                sporsmal.undersporsmal[i].svarliste.svar[0] = { verdi: dayjs(date).format('YYYY-MM-DD') }
            }
        }
    }
}

const landSvar = (sporsmal: Sporsmal, verdi: string[]) => {
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: verdi.map((a) => {
            return { verdi: a }
        }),
    }
}

const radiogruppeSvar = (sporsmal: Sporsmal, verdi: any) => {
    sporsmal.undersporsmal.forEach((uspm) => {
        const erValgt = uspm.sporsmalstekst === verdi
        uspm.svarliste = {
            sporsmalId: uspm.id,
            svar: [{ verdi: erValgt ? SvarEnums.CHECKED : '' }],
        }
    })
}

const checkboksGruppeSvar = (sporsmal: Sporsmal, verdi: string[]) => {
    sporsmal.undersporsmal.forEach((uspm) => {
        const erValgt = verdi.includes(uspm.sporsmalstekst)
        uspm.svarliste = {
            sporsmalId: uspm.id,
            svar: [{ verdi: erValgt ? SvarEnums.CHECKED : '' }],
        }
    })
}

const periodeSvar = (sporsmal: Sporsmal, verdi: any) => {
    if (Array.isArray(verdi)) {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: verdi.map((periode) => {
                return { verdi: JSON.stringify(periode) }
            }),
        }
    }
}

const datoSvar = (sporsmal: Sporsmal, verdi: any) => {
    const svar: RSSvar[] = []
    if (verdi !== undefined) {
        svar.push({
            verdi: dayjs(verdi).format('YYYY-MM-DD'),
        })
    }
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: svar,
    }
}

const datoerSvar = (sporsmal: Sporsmal, verdi: any) => {
    const svar: RSSvar[] = []
    if (verdi !== undefined) {
        verdi.map((dag: string) =>
            svar.push({
                verdi: dayjs(dag).format('YYYY-MM-DD'),
            }),
        )
    }

    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: svar,
    }
}
*/
