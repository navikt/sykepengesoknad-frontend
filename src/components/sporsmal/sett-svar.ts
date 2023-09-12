import dayjs from 'dayjs'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import { empty } from '../../utils/constants'
import { SvarEnums } from '../../types/enums'
import { RSSvar } from '../../types/rs-types/rs-svar'

import VaerKlarOverAtTekster from './vaer-klar-over-at-tekster'

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
    if (
        verdi === undefined &&
        sporsmal.svartype !== RSSvartype.IKKE_RELEVANT &&
        sporsmal.svartype !== RSSvartype.RADIO &&
        sporsmal.svartype !== RSSvartype.CHECKBOX &&
        sporsmal.svartype !== RSSvartype.INFO_BEHANDLINGSDAGER
    ) {
        return sporsmal
    }

    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
            return checkboxPanelSvar(sporsmal, verdi)
        case RSSvartype.CHECKBOX_GRUPPE:
            return checkboksGruppeSvar(sporsmal, verdi, verdier)
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            return radiogruppeSvar(sporsmal, verdi, verdier)
        case RSSvartype.INFO_BEHANDLINGSDAGER:
            return behandlingsdagerSvar(sporsmal, verdi)
        case RSSvartype.LAND:
        case RSSvartype.COMBOBOX_MULTI:
            return landSvar(sporsmal, verdi)
        case RSSvartype.DATO:
            return datoSvar(sporsmal, verdi)
        case RSSvartype.DATOER:
            return datoerSvar(sporsmal, verdi)
        case RSSvartype.PERIODE:
        case RSSvartype.PERIODER:
            return periodeSvar(sporsmal, verdi)
        case RSSvartype.KVITTERING:
            // Denne settes i opplasting-form
            return sporsmal
        case RSSvartype.IKKE_RELEVANT:
        case RSSvartype.RADIO:
        case RSSvartype.CHECKBOX: {
            const undersporsmal: ReadonlyArray<Sporsmal> = sporsmal.undersporsmal.map((spm) => settSvar(spm, verdier))
            // svarliste settes i gruppe fra radio og checkbox
            return sporsmal.copyWith({ undersporsmal: undersporsmal })
        }

        default:
            const svarliste = {
                sporsmalId: sporsmal.id,
                svar: [{ verdi: verdi ? verdi.toString() : '' }],
            }
            const undersporsmal: ReadonlyArray<Sporsmal> = sporsmal.undersporsmal.map((spm) => settSvar(spm, verdier))
            return sporsmal.copyWith({ svarliste: svarliste, undersporsmal: undersporsmal })
    }
}

const checkboxPanelSvar = (sporsmal: Sporsmal, verdi: any) => {
    let svarArray

    if (sporsmal.tag === 'BEKREFT_OPPLYSNINGER' && (verdi === SvarEnums.CHECKED || verdi === true)) {
        // Konverter tekster til ønsket format
        svarArray = Object.values(VaerKlarOverAtTekster).map((str) => ({ verdi: str }))
    } else {
        svarArray = [
            {
                verdi: verdi === SvarEnums.CHECKED || verdi === true ? SvarEnums.CHECKED : '',
            },
        ]
    }

    const svarliste = {
        svar: svarArray,
    }

    return sporsmal.copyWith({ svarliste: svarliste })
}

const behandlingsdagerSvar = (sporsmal: Sporsmal, verdi: Date[]): Sporsmal => {
    const selectedDays = verdi

    const undersporsmal = sporsmal.undersporsmal
        .map((spm) => {
            return spm.copyWith({
                svarliste: {
                    svar: [{ verdi: 'Ikke til behandling' }],
                },
            })
        })
        .map((spm) => {
            for (const date of selectedDays) {
                if (date <= dayjs(spm.max).toDate() && date >= dayjs(spm.min).toDate()) {
                    return spm.copyWith({
                        svarliste: {
                            svar: [{ verdi: dayjs(date).format('YYYY-MM-DD') }],
                        },
                    })
                }
            }
            return spm
        })
    return sporsmal.copyWith({ undersporsmal: undersporsmal })
}

const landSvar = (sporsmal: Sporsmal, verdi: string[]) => {
    const svarliste = {
        sporsmalId: sporsmal.id,
        svar: verdi.map((a) => {
            return { verdi: a }
        }),
    }
    return sporsmal.copyWith({ svarliste: svarliste })
}

const radiogruppeSvar = (sporsmal: Sporsmal, verdi: any, verdier: Record<string, any>) => {
    const undersporsmal = sporsmal.undersporsmal
        .map((uspm) => {
            const erValgt = uspm.sporsmalstekst === verdi
            const svarliste = {
                sporsmalId: uspm.id,
                svar: [{ verdi: erValgt ? SvarEnums.CHECKED : '' }],
            }
            return uspm.copyWith({ svarliste: svarliste })
        })
        .map((spm) => settSvar(spm, verdier))
    return sporsmal.copyWith({ undersporsmal: undersporsmal })
}

const checkboksGruppeSvar = (sporsmal: Sporsmal, verdi: string[], verdier: Record<string, any>) => {
    const undersporsmal = sporsmal.undersporsmal
        .map((uspm) => {
            const erValgt = verdi.includes(uspm.sporsmalstekst)
            const svarliste = {
                sporsmalId: uspm.id,
                svar: [{ verdi: erValgt ? SvarEnums.CHECKED : '' }],
            }
            return uspm.copyWith({ svarliste: svarliste })
        })
        .map((spm) => settSvar(spm, verdier))
    return sporsmal.copyWith({ undersporsmal: undersporsmal })
}

const periodeSvar = (sporsmal: Sporsmal, verdi: any) => {
    if (Array.isArray(verdi)) {
        const svarliste = {
            sporsmalId: sporsmal.id,
            svar: verdi.map((periode) => {
                return { verdi: JSON.stringify(periode) }
            }),
        }
        return sporsmal.copyWith({ svarliste: svarliste })
    }
    return sporsmal
}

const datoSvar = (sporsmal: Sporsmal, verdi: any) => {
    const svar: RSSvar[] = []
    if (verdi !== undefined) {
        svar.push({
            verdi: dayjs(verdi).format('YYYY-MM-DD'),
        })
    }
    const svarliste = {
        sporsmalId: sporsmal.id,
        svar: svar,
    }
    return sporsmal.copyWith({ svarliste: svarliste })
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

    const svarliste = {
        sporsmalId: sporsmal.id,
        svar: svar,
    }
    return sporsmal.copyWith({ svarliste: svarliste })
}
