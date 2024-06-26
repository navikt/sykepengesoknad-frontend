import { v4 } from 'uuid'

import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const inntektsopplysningerLegacy: RSSporsmal = {
    id: v4().toString(),
    tag: 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN',
    sporsmalstekst: 'Har det vært drift i virksomheten din fram til dagen du ble sykmeldt?',
    undertekst: null,
    svartype: 'RADIO_GRUPPE',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar: [],
    undersporsmal: [
        {
            id: v4().toString(),
            tag: 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN_JA',
            sporsmalstekst: 'Ja',
            undertekst: null,
            svartype: 'RADIO',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'CHECKED',
            svar: [],
            undersporsmal: [
                {
                    id: v4().toString(),
                    tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET',
                    sporsmalstekst: 'Er du ny i arbeidslivet etter 1.1.2019?',
                    undertekst: null,
                    svartype: 'RADIO_GRUPPE',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: v4().toString(),
                            tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_JA',
                            sporsmalstekst: 'Ja',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: v4().toString(),
                                    tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_DATO',
                                    sporsmalstekst: 'Når begynte du i arbeidslivet?',
                                    undertekst: null,
                                    svartype: 'DATO',
                                    min: null,
                                    max: null,
                                    kriterieForVisningAvUndersporsmal: 'JA',
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                        {
                            id: v4().toString(),
                            tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_NEI',
                            sporsmalstekst: 'Nei',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: v4().toString(),
                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING',
                                    sporsmalstekst:
                                        'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1.1.2019 og frem til sykmeldingstidspunktet?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    kriterieForVisningAvUndersporsmal: 'JA',
                                    svar: [],
                                    undersporsmal: [
                                        {
                                            id: v4().toString(),
                                            tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE',
                                            sporsmalstekst:
                                                'Hvilken endring har skjedd i din arbeidssituasjon eller virksomhet?',
                                            undertekst: 'Du kan velge en eller flere alternativer',
                                            svartype: 'CHECKBOX_GRUPPE',
                                            min: null,
                                            max: null,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [],
                                            undersporsmal: [
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_OPPRETTELSE_NEDLEGGELSE',
                                                    sporsmalstekst:
                                                        'Opprettelse eller nedleggelse av næringsvirksomhet',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_ENDRET_INNSATS',
                                                    sporsmalstekst: 'Økt eller redusert innsats',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_OMLEGGING_AV_VIRKSOMHETEN',
                                                    sporsmalstekst: 'Omlegging av virksomheten',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_ENDRET_MARKEDSSITUASJON',
                                                    sporsmalstekst: 'Endret markedssituasjon',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_ANNET',
                                                    sporsmalstekst: 'Annet',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                            ],
                                        },
                                        {
                                            id: v4().toString(),
                                            tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT',
                                            sporsmalstekst:
                                                'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
                                            undertekst: null,
                                            svartype: 'JA_NEI',
                                            min: null,
                                            max: null,
                                            kriterieForVisningAvUndersporsmal: 'JA',
                                            svar: [],
                                            undersporsmal: [
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_DATO',
                                                    sporsmalstekst: 'Når skjedde den siste varige endringen?',
                                                    undertekst: null,
                                                    svartype: 'DATO',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: v4().toString(),
            tag: 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN_NEI',
            sporsmalstekst: 'Nei',
            undertekst: null,
            svartype: 'RADIO',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'CHECKED',
            svar: [],
            undersporsmal: [
                {
                    id: v4().toString(),
                    tag: 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN_OPPHORT',
                    sporsmalstekst: 'Når opphørte driften i virksomheten?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
}

export const inntektsopplysninger: RSSporsmal = {
    id: v4().toString(),
    tag: 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET',
    sporsmalstekst: 'Har du registrert virksomheten din som avviklet og slettet i Altinn før du ble sykmeldt?',
    undertekst: null,
    svartype: 'RADIO_GRUPPE',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar: [],
    undersporsmal: [
        {
            id: v4().toString(),
            tag: 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET_JA',
            sporsmalstekst: 'Ja',
            undertekst: null,
            svartype: 'RADIO',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'CHECKED',
            svar: [],

            undersporsmal: [
                {
                    id: v4().toString(),
                    tag: 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET_NAR',
                    sporsmalstekst: 'Når ble virksomheten avviklet?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: v4().toString(),
            tag: 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET_NEI',
            sporsmalstekst: 'Nei',
            undertekst: null,
            svartype: 'RADIO',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'CHECKED',
            svar: [],
            undersporsmal: [
                {
                    id: v4().toString(),
                    tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET',
                    sporsmalstekst: 'Er du ny i arbeidslivet etter 1.1.2019?',
                    undertekst: null,
                    svartype: 'RADIO_GRUPPE',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: v4().toString(),
                            tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_JA',
                            sporsmalstekst: 'Ja',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: v4().toString(),
                                    tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_DATO',
                                    sporsmalstekst: 'Når begynte du i arbeidslivet?',
                                    undertekst: null,
                                    svartype: 'DATO',
                                    min: null,
                                    max: null,
                                    kriterieForVisningAvUndersporsmal: 'JA',
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                        {
                            id: v4().toString(),
                            tag: 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_NEI',
                            sporsmalstekst: 'Nei',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: v4().toString(),
                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING',
                                    sporsmalstekst:
                                        'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1.1.2019 og frem til sykmeldingstidspunktet?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    kriterieForVisningAvUndersporsmal: 'JA',
                                    svar: [],
                                    undersporsmal: [
                                        {
                                            id: v4().toString(),
                                            tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE',
                                            sporsmalstekst:
                                                'Hvilken endring har skjedd i din arbeidssituasjon eller virksomhet?',
                                            undertekst: 'Du kan velge en eller flere alternativer',
                                            svartype: 'CHECKBOX_GRUPPE',
                                            min: null,
                                            max: null,
                                            kriterieForVisningAvUndersporsmal: null,
                                            svar: [],
                                            undersporsmal: [
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_OPPRETTELSE_NEDLEGGELSE',
                                                    sporsmalstekst:
                                                        'Opprettelse eller nedleggelse av næringsvirksomhet',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_ENDRET_INNSATS',
                                                    sporsmalstekst: 'Økt eller redusert innsats',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_OMLEGGING_AV_VIRKSOMHETEN',
                                                    sporsmalstekst: 'Omlegging av virksomheten',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_ENDRET_MARKEDSSITUASJON',
                                                    sporsmalstekst: 'Endret markedssituasjon',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_BEGRUNNELSE_ANNET',
                                                    sporsmalstekst: 'Annet',
                                                    undertekst: null,
                                                    svartype: 'CHECKBOX',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                            ],
                                        },
                                        {
                                            id: v4().toString(),
                                            tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT',
                                            sporsmalstekst:
                                                'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
                                            undertekst: null,
                                            svartype: 'JA_NEI',
                                            min: null,
                                            max: null,
                                            kriterieForVisningAvUndersporsmal: 'JA',
                                            svar: [],
                                            undersporsmal: [
                                                {
                                                    id: v4().toString(),
                                                    tag: 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_DATO',
                                                    sporsmalstekst: 'Når skjedde den siste varige endringen?',
                                                    undertekst: null,
                                                    svartype: 'DATO',
                                                    min: null,
                                                    max: null,
                                                    kriterieForVisningAvUndersporsmal: null,
                                                    svar: [],
                                                    undersporsmal: [],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
