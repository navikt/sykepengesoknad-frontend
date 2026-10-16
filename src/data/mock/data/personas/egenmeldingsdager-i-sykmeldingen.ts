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
        ansvarserklaring({ id: '8464d59d-db1a-35b7-ab2e-d983163e7ed2' }),
        tilbakeIArbeid({
            fom,
            tom,
            arbeidsgiver: arbeidsgiverNavn,
            id: '41922ee2-35d5-3fdd-b999-26cb2c43ee8a',
            tilbakeNarId: '04886f39-fc09-3650-adf3-157479d382e0',
        }),
        ferieV2({
            fom,
            tom,
            id: '35140c57-86b8-3c72-9f68-d9cc7dfb70b9',
            ferieNarId: 'b7ccd302-d566-3ce1-a0e2-d9d9acdb9462',
        }),
        permisjonV2({
            fom,
            tom,
            id: '5e771931-2979-3312-a0e6-24f00f1562b9',
            permisjonNarId: '08ed4fa4-2cf3-357c-bdef-83a878739daf',
        }),
        arbeidUnderveis100Prosent({
            fom,
            tom,
            arbeidsgiver: arbeidsgiverNavn,
            id: 'd5e80e71-1000-360b-b355-51c8295f82c2',
            timerMaks: '150',
            ids: {
                arbeidsmengde: 'a1cc73a9-905a-3f9c-98bd-fdeee0c274d6',
                prosent: 'a704c2b0-4c40-3f0a-89f1-dd68ca0d2e1b',
                prosentVerdi: '8a3fa97a-1a94-3784-80d7-093dff8ce172',
                timer: '2d8a2c66-8985-3284-9b74-5182980882e1',
                timerVerdi: 'e6b7bfb6-71bc-3a3a-ac07-abc8fb3210b9',
                normalArbeidsuke: '38f26938-65ed-313c-9e2e-39403a390695',
                timerPerUke: '4317b16c-3560-3d0b-bf56-4bfb95c7b578',
            },
        }),
        arbeidUtenforNorge({ id: 'cc6a9361-e27f-365a-9851-64217814f7e0' }),
        andreInntektskilderV2(),
        oppholdUtenforEos({
            fom,
            tom,
            id: '9f5ead98-b8ef-3ed0-8804-1ba1b8c9c4ac',
            oppholdNarId: '5339c2a7-ba97-3a2c-bb2a-2df2acad56b5',
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
