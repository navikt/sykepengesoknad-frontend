import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'
import { arbeidstakerReisetilskuddSyk, sykmeldinger } from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'
import { nyttReisetilskudd } from '../soknad/arbeidstaker-reisetilskudd'

import { Persona } from './personas'

export const delvisUtfyltReisetilskudd: RSSoknad = {
    id: 'a992fd26-3452-41e6-b76e-8bc6d352a0fa',
    sykmeldingId: arbeidstakerReisetilskuddSyk.id,
    soknadstype: 'REISETILSKUDD',
    status: 'NY',
    fom: '2020-04-01',
    tom: '2020-04-24',
    opprettetDato: '2021-09-09',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-04-01',
    sykmeldingUtskrevet: '2020-04-01',
    arbeidsgiver: {
        navn: 'SAUEFABRIKK',
        orgnummer: '896929119',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-24',
            grad: 0,
            sykmeldingstype: 'REISETILSKUDD',
        },
    ],
    sporsmal: [
        {
            id: '1566421',
            tag: 'ANSVARSERKLARING',
            sporsmalstekst: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
            undertekst: null,
            svartype: 'CHECKBOX_PANEL',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [
                {
                    verdi: 'CHECKED',
                },
            ],
            undersporsmal: [],
        },
        {
            id: '1566424',
            tag: 'TRANSPORT_TIL_DAGLIG',
            sporsmalstekst: 'Brukte du bil eller offentlig transport til og fra jobben før du ble sykmeldt?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'NEI',
                },
            ],
            undersporsmal: [
                {
                    id: '1566425',
                    tag: 'TYPE_TRANSPORT',
                    sporsmalstekst: 'Hva slags type transport brukte du?',
                    undertekst: null,
                    svartype: 'CHECKBOX_GRUPPE',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: '1566426',
                            tag: 'OFFENTLIG_TRANSPORT_TIL_DAGLIG',
                            sporsmalstekst: 'Offentlig transport',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '1566427',
                                    tag: 'OFFENTLIG_TRANSPORT_BELOP',
                                    sporsmalstekst: 'Hvor mye betaler du vanligvis i måneden for offentlig transport?',
                                    undertekst: null,
                                    svartype: 'BELOP',
                                    min: '0',
                                    max: null,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                        {
                            id: '1566428',
                            tag: 'BIL_TIL_DAGLIG',
                            sporsmalstekst: 'Bil',
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
            ],
        },
        {
            id: '1566444',
            tag: 'REISE_MED_BIL',
            sporsmalstekst:
                'Reiste du med egen bil, leiebil eller kollega til jobben mellom 23. desember 2020 - 7. januar 2021?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [
                {
                    verdi: 'NEI',
                },
            ],
            undersporsmal: [
                {
                    id: '1566445',
                    tag: 'BIL_DATOER',
                    sporsmalstekst: 'Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?',
                    undertekst: null,
                    svartype: 'DATOER',
                    min: '2020-12-23',
                    max: '2021-01-07',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: '1566446',
                    tag: 'BIL_BOMPENGER',
                    sporsmalstekst: 'Hadde du utgifter til bompenger?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'JA',
                    svar: [],
                    undersporsmal: [
                        {
                            id: '1566447',
                            tag: 'BIL_BOMPENGER_BELOP',
                            sporsmalstekst: 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?',
                            undertekst: null,
                            svartype: 'BELOP',
                            min: '0',
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                    ],
                },
                {
                    id: '1566448',
                    tag: 'KM_HJEM_JOBB',
                    sporsmalstekst: 'Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?',
                    undertekst: null,
                    svartype: 'KILOMETER',
                    min: '0',
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1566434',
            tag: 'KVITTERINGER',
            sporsmalstekst: 'Last opp kvitteringer for reiser til og fra jobben mellom 1. - 24. april 2020.',
            undertekst: null,
            svartype: 'KVITTERING',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '1566435',
            tag: 'UTBETALING',
            sporsmalstekst: 'Legger arbeidsgiveren din ut for reisene?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [
                {
                    verdi: 'NEI',
                },
            ],
            undersporsmal: [],
        },
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

export const feilVedSlettingAvKvittering: RSSoknad = jsonDeepCopy(nyttReisetilskudd)
feilVedSlettingAvKvittering.id = 'd4ce1c57-1f91-411b-ab64-beabbba29b65'

export const reisetilskuddTestPerson: Persona = {
    soknader: [delvisUtfyltReisetilskudd, feilVedSlettingAvKvittering],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'Reisetilskudd som er delvis utfylt og reisetilskudd som feiler på sletting av kvittering',
}
