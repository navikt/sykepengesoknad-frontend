import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterDato, formatterPeriode } from './backend-datoformat'

type EgenmeldingerSvar = {
    readonly hoved?: RSSvar[]
    readonly tidligereSyk?: RSSvar[]
    readonly tidligereEgenmelding?: RSSvar[]
    readonly egenmeldingerNar?: RSSvar[]
    readonly tidligerePapirsykmelding?: RSSvar[]
    readonly papirsykmeldingNar?: RSSvar[]
}

type EgenmeldingerValg = {
    readonly fom: string
    readonly tom: string
    readonly sykmeldtDato: string
    readonly min: string
    readonly max: string
    readonly id?: string
    readonly svar?: EgenmeldingerSvar
}

export const egenmeldinger = ({
    fom,
    tom,
    sykmeldtDato,
    min,
    max,
    id = '89',
    svar = {},
}: EgenmeldingerValg): RSSporsmal => {
    const sykmeldtDatoTekst = formatterDato(sykmeldtDato)

    return {
        id,
        tag: 'EGENMELDINGER',
        sporsmalstekst: `Vi har registrert at du ble sykmeldt onsdag ${sykmeldtDatoTekst}. Var du syk og borte fra jobb i perioden ${formatterPeriode(fom, tom)}?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: svar.hoved ?? [],
        undersporsmal: [
            {
                id: '90',
                tag: 'TIDLIGERE_SYK',
                sporsmalstekst: null,
                undertekst: null,
                svartype: 'CHECKBOX_GRUPPE',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: svar.tidligereSyk ?? [],
                undersporsmal: [
                    {
                        id: '91',
                        tag: 'TIDLIGERE_EGENMELDING',
                        sporsmalstekst: 'Jeg var syk med egenmelding',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: svar.tidligereEgenmelding ?? [],
                        undersporsmal: [
                            {
                                id: '92',
                                tag: 'EGENMELDINGER_NAR',
                                sporsmalstekst: `Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før ${sykmeldtDatoTekst}.`,
                                undertekst: null,
                                svartype: 'PERIODER',
                                min,
                                max,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: svar.egenmeldingerNar ?? [],
                                undersporsmal: [],
                            },
                        ],
                    },
                    {
                        id: '93',
                        tag: 'TIDLIGERE_PAPIRSYKMELDING',
                        sporsmalstekst: 'Jeg var syk med papirsykmelding',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: svar.tidligerePapirsykmelding ?? [],
                        undersporsmal: [
                            {
                                id: '94',
                                tag: 'PAPIRSYKMELDING_NAR',
                                sporsmalstekst: `Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før ${sykmeldtDatoTekst}.`,
                                undertekst: null,
                                svartype: 'PERIODER',
                                min,
                                max,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: svar.papirsykmeldingNar ?? [],
                                undersporsmal: [],
                            },
                        ],
                    },
                ],
            },
        ],
    }
}
