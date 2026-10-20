import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { sykmeldingMedEgenmeldingsdager } from '../sykmeldinger'

import { Persona } from './personas'

const fom = '2023-03-17'
const tom = '2023-03-23'
const arbeidsgiverNavn = 'Sauefabrikk'

export const soknadUtenEgenmeldingSporsmal: RSSoknad = {
    id: '82baf0be-5568-3062-b9c7-f03eab7993be',
    sykmeldingId: sykmeldingMedEgenmeldingsdager.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2023-03-24',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: fom,
    arbeidsgiver: { navn: arbeidsgiverNavn, orgnummer: '896929119' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' }],
    sporsmal: [
        ansvarserklaring({}),
        tilbakeIArbeid({
            fom,
            tom,
            arbeidsgiver: arbeidsgiverNavn,
        }),
        ferieV2({
            fom,
            tom,
        }),
        permisjonV2({
            fom,
            tom,
        }),
        arbeidUnderveis100Prosent({
            fom,
            tom,
            arbeidsgiver: arbeidsgiverNavn,
            timerMaks: '150',
        }),
        arbeidUtenforNorge({}),
        andreInntektskilderV2(),
        oppholdUtenforEos({
            fom,
            tom,
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    utenlandskSykmelding: false,
    klippet: false,
}

export const egenmeldingSykmeldingaPerson: Persona = {
    soknader: [soknadUtenEgenmeldingSporsmal],
    sykmeldinger: [sykmeldingMedEgenmeldingsdager],
    kontonummer: '12340000000',
    beskrivelse: 'Søknad uten egenmelding spørsmål',
}
