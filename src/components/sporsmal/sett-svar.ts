import dayjs from 'dayjs'

import { SvarEnums } from '../../types/enums'
import { RSSvar } from '../../types/rs-types/rs-svar'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import { empty } from '../../utils/constants'

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

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, any>): void => {
    const verdi = hentVerdier(sporsmal, verdier)
    if (
        verdi === undefined &&
        sporsmal.svartype !== RSSvartype.IKKE_RELEVANT &&
        sporsmal.svartype !== RSSvartype.CHECKBOX_GRUPPE &&
        sporsmal.svartype !== RSSvartype.RADIO &&
        sporsmal.svartype !== RSSvartype.INFO_BEHANDLINGSDAGER
    ) {
        return
    }

    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
        case RSSvartype.CHECKBOX:
            checkboxSvar(sporsmal, verdi)
            break
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            radiogruppeSvar(sporsmal, verdi)
            break
        case RSSvartype.RADIO_GRUPPE_UKEKALENDER:
            ukekalenderSvar(sporsmal, verdi)
            break
        case RSSvartype.LAND:
            landSvar(sporsmal, verdi)
            break
        case RSSvartype.DATO:
            datoSvar(sporsmal, verdi)
            break
        case RSSvartype.DATOER:
            datoerSvar(sporsmal, verdi)
            break
        case RSSvartype.PERIODE:
        case RSSvartype.PERIODER:
            periodeSvar(sporsmal, verdi)
            break
        case RSSvartype.KVITTERING:
            // Denne settes i opplasting-form
            return
        case RSSvartype.RADIO:
        case RSSvartype.IKKE_RELEVANT:
        case RSSvartype.INFO_BEHANDLINGSDAGER:
        case RSSvartype.CHECKBOX_GRUPPE:
            // Skal ikke ha svarverdi
            break
        default:
            sporsmal.svarliste = {
                sporsmalId: sporsmal.id,
                svar: [{ verdi: verdi ? verdi.toString() : '' }],
            }
    }

    sporsmal.undersporsmal.forEach((spm) => {
        settSvar(spm, verdier)
    })
}

const checkboxSvar = (sporsmal: Sporsmal, verdi: any) => {
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: [
            {
                verdi: verdi === SvarEnums.CHECKED || verdi === true ? SvarEnums.CHECKED : '',
            },
        ],
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

const ukekalenderSvar = (sporsmal: Sporsmal, verdi: any) => {
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: [{ verdi: verdi ? verdi.toString() : 'Ikke til behandling' }],
    }
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
