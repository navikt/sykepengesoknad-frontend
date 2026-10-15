import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'
import {
    arbeidsledig100Syk,
    arbeidstaker100Syk,
    frilanser100Syk,
    syk1,
    syk2,
    syk3,
    syk4,
    syk5,
    syk7,
    syk8,
} from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { friskmeldt } from '../sporsmal/friskmeldt'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { tilSlutt } from '../sporsmal/til-slutt'
import { land } from '../sporsmal/land'
import { periodeUtland } from '../sporsmal/periodeutland'
import { arbeidsgiverUtland } from '../sporsmal/arbeidsgiver-utland'
import { ferieUtland } from '../sporsmal/ferie-utland'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'

import { arbeidstaker } from './arbeidstaker'
import { utgattSoknad } from './arbeidstaker-utgatt'
import { sendtArbeidsledig } from './arbeidsledig-sendt'
import { avbruttSoknad } from './arbeidstaker-avbrutt'
import { veldigLangSoknad } from './veldig-lang-soknad'

const arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerFom = '2020-04-01'
const arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerTom = '2020-04-24'
const arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerArbeidsgiver = '995816598 sitt orgnavn :)'

export const arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger: RSSoknad = {
    id: '5b74f271-5b94-455a-b79f-428f593f2b98',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerFom,
    tom: arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerTom,
    opprettetDato: '2020-06-08',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-05-23',
    sykmeldingUtskrevet: '2020-05-23',
    arbeidsgiver: { navn: arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerArbeidsgiver, orgnummer: '995816598' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerFom,
            tom: arbeidstakersoknadMedUtenlandsoppholdSoktSykepengerTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [ansvarserklaring({ id: '636' }), oppsummering()],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const arbeidsledigKvitteringFom = '2020-04-01'
const arbeidsledigKvitteringTom = '2020-04-24'
const arbeidsledigKvitteringArbeidsgiver = null

export const arbeidsledigKvittering: RSSoknad = {
    id: 'd3756302-4488-4f15-837b-38d51bc9b773',
    sykmeldingId: arbeidsledig100Syk.id,
    soknadstype: 'ARBEIDSLEDIG',
    status: 'NY',
    fom: arbeidsledigKvitteringFom,
    tom: arbeidsledigKvitteringTom,
    opprettetDato: '2020-06-23',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-06-07',
    sykmeldingUtskrevet: '2020-06-07',
    arbeidsgiver: arbeidsledigKvitteringArbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSLEDIG',
    soknadPerioder: [
        {
            fom: arbeidsledigKvitteringFom,
            tom: arbeidsledigKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '127' }),
        friskmeldt({ fom: arbeidsledigKvitteringFom, tom: arbeidsledigKvitteringTom, id: '98', startId: '99' }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const sendtArbeidsledigKvitteringFom = '2020-01-01'
const sendtArbeidsledigKvitteringTom = '2020-01-10'
const sendtArbeidsledigKvitteringArbeidsgiver = null

export const sendtArbeidsledigKvittering: RSSoknad = {
    id: '162b42d7-2600-44ea-905e-d3bae7f23404',
    sykmeldingId: arbeidsledig100Syk.id,
    soknadstype: 'ARBEIDSLEDIG',
    status: 'SENDT',
    fom: sendtArbeidsledigKvitteringFom,
    tom: sendtArbeidsledigKvitteringTom,
    opprettetDato: '2020-06-23',
    sendtTilNAVDato: '2020-04-23T09:56:10.624Z',
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-06-07',
    arbeidsgiver: sendtArbeidsledigKvitteringArbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSLEDIG',
    soknadPerioder: [
        {
            fom: sendtArbeidsledigKvitteringFom,
            tom: sendtArbeidsledigKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '93', svar: [{ verdi: 'CHECKED' }] }),
        friskmeldt({
            fom: sendtArbeidsledigKvitteringFom,
            tom: sendtArbeidsledigKvitteringTom,
            id: '98',
            startId: '99',
            svar: [{ verdi: 'JA' }],
        }),
        andreInntektskilder({
            fom: sendtArbeidsledigKvitteringFom,
            tom: sendtArbeidsledigKvitteringTom,
            id: '100',
            gruppeId: '101',
            svar: [{ verdi: 'NEI' }],
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD', id: '102', erDuSykmeldtId: '103' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG', id: '104', erDuSykmeldtId: '105' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA', id: '106', erDuSykmeldtId: '107' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER', id: '108', erDuSykmeldtId: '109' },
                { tag: 'INNTEKTSKILDE_FRILANSER', id: '110', erDuSykmeldtId: '111' },
                { tag: 'INNTEKTSKILDE_OMSORGSLONN', id: '112', erDuSykmeldtId: '113' },
                { tag: 'INNTEKTSKILDE_FOSTERHJEM', id: '114', erDuSykmeldtId: '115' },
                { tag: 'INNTEKTSKILDE_ANNET', id: '116' },
            ],
        }),
        oppholdUtenforEos({
            fom: sendtArbeidsledigKvitteringFom,
            tom: sendtArbeidsledigKvitteringTom,
            id: '120',
            oppholdNarId: '121',
            svar: [{ verdi: 'NEI' }],
        }),
        arbeidUtenforNorge({ id: '124', svar: [{ verdi: 'NEI' }] }),
        tilSlutt({ svar: [{ verdi: 'true' }] }),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const delvisUtfylltArbeidsledigFom = '2020-04-01'
const delvisUtfylltArbeidsledigTom = '2020-04-24'
const delvisUtfylltArbeidsledigArbeidsgiver = null

export const delvisUtfylltArbeidsledig: RSSoknad = {
    id: '99c14afb-f654-4df5-8612-085fe235536f',
    sykmeldingId: arbeidsledig100Syk.id,
    soknadstype: 'ARBEIDSLEDIG',
    status: 'NY',
    fom: delvisUtfylltArbeidsledigFom,
    tom: delvisUtfylltArbeidsledigTom,
    opprettetDato: '2019-07-23',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-06-07',
    arbeidsgiver: delvisUtfylltArbeidsledigArbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSLEDIG',
    soknadPerioder: [
        {
            fom: delvisUtfylltArbeidsledigFom,
            tom: delvisUtfylltArbeidsledigTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '93', svar: [{ verdi: 'CHECKED' }] }),
        arbeidUtenforNorge({ id: '1243', svar: [{ verdi: 'NEI' }] }),
        arbeidUtenforNorge({ id: '1334' }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const oppholdUtlandKvitteringFom = null
const oppholdUtlandKvitteringTom = null
const oppholdUtlandKvitteringArbeidsgiver = null

export const oppholdUtlandKvittering: RSSoknad = {
    id: 'f01cbf75-c7e6-4733-bee3-ecb8396ba1f1',
    sykmeldingId: null,
    soknadstype: 'OPPHOLD_UTLAND',
    status: 'NY',
    fom: oppholdUtlandKvitteringFom,
    tom: oppholdUtlandKvitteringTom,
    opprettetDato: '2020-06-03',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: null,
    sykmeldingUtskrevet: null,
    arbeidsgiver: oppholdUtlandKvitteringArbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: null,
    soknadPerioder: [],
    sporsmal: [
        land({ id: '2' }),
        periodeUtland({ id: '1', fom: '2020-03-03', tom: '2020-12-31' }),
        arbeidsgiverUtland({ id: '3', undersporsmal: [ferieUtland({ id: '5' })] }),
        oppsummering(),
    ],
    egenmeldtSykmelding: null,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const selvstendigKvitteringFom = '2020-04-01'
const selvstendigKvitteringTom = '2020-04-24'
const selvstendigKvitteringArbeidsgiver = null
const selvstendigKvitteringTilbakeFom = '2024-01-16'
const selvstendigKvitteringTilbakeTom = '2024-01-22'

export const selvstendigKvittering: RSSoknad = {
    id: '8e267bc7-b213-4f19-a423-1543e09e0dc1',
    sykmeldingId: frilanser100Syk.id,
    soknadstype: 'SELVSTENDIGE_OG_FRILANSERE',
    status: 'NY',
    fom: selvstendigKvitteringFom,
    tom: selvstendigKvitteringTom,
    opprettetDato: '2020-06-23',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-06-01',
    sykmeldingUtskrevet: '2020-06-01',
    arbeidsgiver: selvstendigKvitteringArbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'NAERINGSDRIVENDE',
    soknadPerioder: [
        {
            fom: selvstendigKvitteringFom,
            tom: selvstendigKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '161' }),
        tilbakeIArbeid({
            fom: selvstendigKvitteringTilbakeFom,
            tom: selvstendigKvitteringTilbakeTom,
            tekstvariant: 'selvstendigNaeringsdrivende',
            id: '79c730fc-155e-3088-97cd-8817df252068',
            tilbakeNarId: 'e9a48ebc-3ce0-3e37-9e70-f670c299ba23',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

selvstendigKvittering.sporsmal = selvstendigKvittering.sporsmal.map((sporsmal) => {
    if (sporsmal.tag !== 'TILBAKE_I_ARBEID') return sporsmal
    return tilbakeIArbeid({
        fom: selvstendigKvitteringFom,
        tom: selvstendigKvitteringTom,
        tekstvariant: 'selvstendigNaeringsdrivende',
        id: sporsmal.id,
        svar: sporsmal.svar,
        tilbakeNarId: sporsmal.undersporsmal[0].id,
        tilbakeNarSvar: sporsmal.undersporsmal[0].svar,
    })
})

const arbeidstakerInnenforArbeidsgiverperiodeKvitteringFom = '2020-04-01'
const arbeidstakerInnenforArbeidsgiverperiodeKvitteringTom = '2020-04-05'
const arbeidstakerInnenforArbeidsgiverperiodeKvitteringArbeidsgiver = 'arb1'

export const arbeidstakerInnenforArbeidsgiverperiodeKvittering: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b0',
    sykmeldingId: syk1.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakerInnenforArbeidsgiverperiodeKvitteringFom,
    tom: arbeidstakerInnenforArbeidsgiverperiodeKvitteringTom,
    opprettetDato: '2020-01-01',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-01-01',
    arbeidsgiver: {
        navn: arbeidstakerInnenforArbeidsgiverperiodeKvitteringArbeidsgiver,
        orgnummer: '1',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: arbeidstakerInnenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerInnenforArbeidsgiverperiodeKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '318' }),
        tilbakeIArbeid({
            fom: arbeidstakerInnenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerInnenforArbeidsgiverperiodeKvitteringTom,
            arbeidsgiver: arbeidstakerInnenforArbeidsgiverperiodeKvitteringArbeidsgiver,
            id: '900',
            tilbakeNarId: '96',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const arbeidstakerUtenforArbeidsgiverperiodeKvitteringFom = '2020-04-01'
const arbeidstakerUtenforArbeidsgiverperiodeKvitteringTom = '2020-04-20'
const arbeidstakerUtenforArbeidsgiverperiodeKvitteringArbeidsgiver = 'arb2'

export const arbeidstakerUtenforArbeidsgiverperiodeKvittering: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b1',
    sykmeldingId: syk2.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakerUtenforArbeidsgiverperiodeKvitteringFom,
    tom: arbeidstakerUtenforArbeidsgiverperiodeKvitteringTom,
    opprettetDato: '2020-01-01',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-01-01',
    arbeidsgiver: {
        navn: arbeidstakerUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
        orgnummer: '2',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: arbeidstakerUtenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerUtenforArbeidsgiverperiodeKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '318' }),
        tilbakeIArbeid({
            fom: arbeidstakerUtenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerUtenforArbeidsgiverperiodeKvitteringTom,
            arbeidsgiver: arbeidstakerUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
            id: '900',
            tilbakeNarId: '96',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringFom = '2020-04-01'
const arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringTom = '2020-04-10'
const arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver = 'arb3'

export const arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b2',
    sykmeldingId: syk3.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringFom,
    tom: arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringTom,
    opprettetDato: '2020-01-10',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-01-10',
    arbeidsgiver: {
        navn: arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
        orgnummer: '3',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-10',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '318' }),
        tilbakeIArbeid({
            fom: arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringTom,
            arbeidsgiver: arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
            id: '900',
            tilbakeNarId: '96',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom = '2020-04-01'
const arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom = '2020-04-16'
const arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver = 'arb1'

export const arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b3',
    sykmeldingId: syk4.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom,
    tom: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom,
    opprettetDato: '2020-01-06',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-01-06',
    arbeidsgiver: {
        navn: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
        orgnummer: '1',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '318' }),
        tilbakeIArbeid({
            fom: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom,
            arbeidsgiver: arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
            id: '900',
            tilbakeNarId: '96',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const arbeidstakerUtenOppholdKvitteringFom = '2020-04-01'
const arbeidstakerUtenOppholdKvitteringTom = '2020-04-05'
const arbeidstakerUtenOppholdKvitteringArbeidsgiver = 'arb1'

export const arbeidstakerUtenOppholdKvittering: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b4',
    sykmeldingId: syk5.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakerUtenOppholdKvitteringFom,
    tom: arbeidstakerUtenOppholdKvitteringTom,
    opprettetDato: '2020-01-21',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-21',
    sykmeldingUtskrevet: '2020-01-21',
    arbeidsgiver: {
        navn: arbeidstakerUtenOppholdKvitteringArbeidsgiver,
        orgnummer: '1',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: arbeidstakerUtenOppholdKvitteringFom,
            tom: arbeidstakerUtenOppholdKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '318' }),
        tilbakeIArbeid({
            fom: arbeidstakerUtenOppholdKvitteringFom,
            tom: arbeidstakerUtenOppholdKvitteringTom,
            arbeidsgiver: arbeidstakerUtenOppholdKvitteringArbeidsgiver,
            id: '900',
            tilbakeNarId: '96',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const sok6Fom = '2020-03-01'
const sok6Tom = '2020-03-05'
const sok6Arbeidsgiver = 'arb4'

export const sok6: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b5',
    sykmeldingId: 'trengs for sok7',
    soknadstype: 'ARBEIDSTAKERE',
    status: 'SENDT',
    fom: sok6Fom,
    tom: sok6Tom,
    opprettetDato: '2020-01-01',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-01-01',
    arbeidsgiver: {
        navn: sok6Arbeidsgiver,
        orgnummer: '4',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: sok6Fom,
            tom: sok6Tom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [ansvarserklaring({ id: '318' }), oppsummering()],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom = '2020-04-01'
const arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom = '2020-04-16'
const arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver = 'arb4'

export const arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b6',
    sykmeldingId: syk7.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom,
    tom: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom,
    opprettetDato: '2020-01-10',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-01-10',
    arbeidsgiver: {
        navn: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
        orgnummer: '4',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '318' }),
        tilbakeIArbeid({
            fom: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringFom,
            tom: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringTom,
            arbeidsgiver: arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvitteringArbeidsgiver,
            id: '900',
            tilbakeNarId: '96',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
const arbeidstakerMedOppholdKvitteringFom = '2020-04-01'
const arbeidstakerMedOppholdKvitteringTom = '2020-04-05'
const arbeidstakerMedOppholdKvitteringArbeidsgiver = 'arb5'

export const arbeidstakerMedOppholdKvittering: RSSoknad = {
    id: '08a516f1-62be-45ee-8ce3-4ba0294728b7',
    sykmeldingId: syk8.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: arbeidstakerMedOppholdKvitteringFom,
    tom: arbeidstakerMedOppholdKvitteringTom,
    opprettetDato: '2020-02-05',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2020-02-01',
    arbeidsgiver: {
        navn: arbeidstakerMedOppholdKvitteringArbeidsgiver,
        orgnummer: '5',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-05',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '318' }),
        tilbakeIArbeid({
            fom: arbeidstakerMedOppholdKvitteringFom,
            tom: arbeidstakerMedOppholdKvitteringTom,
            arbeidsgiver: arbeidstakerMedOppholdKvitteringArbeidsgiver,
            id: '900',
            tilbakeNarId: '96',
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
export const foranArbeidstakerMedOppholdKvittering: RSSoknad = jsonDeepCopy(arbeidstakerMedOppholdKvittering)
foranArbeidstakerMedOppholdKvittering.id = '35dc9bfb-e935-4f02-931f-9fa5306bbceb'
foranArbeidstakerMedOppholdKvittering.status = 'SENDT'
foranArbeidstakerMedOppholdKvittering.sendtTilArbeidsgiverDato = new Date(Date.now() - 86400000).toISOString()
const foranArbeidstakerMedOppholdKvitteringFom = '2020-03-25'
const foranArbeidstakerMedOppholdKvitteringTom = '2020-03-27'
foranArbeidstakerMedOppholdKvittering.fom = foranArbeidstakerMedOppholdKvitteringFom
foranArbeidstakerMedOppholdKvittering.tom = foranArbeidstakerMedOppholdKvitteringTom
foranArbeidstakerMedOppholdKvittering.soknadPerioder[0].fom = foranArbeidstakerMedOppholdKvitteringFom
foranArbeidstakerMedOppholdKvittering.soknadPerioder[0].tom = foranArbeidstakerMedOppholdKvitteringTom
foranArbeidstakerMedOppholdKvittering.sporsmal = foranArbeidstakerMedOppholdKvittering.sporsmal.map((sporsmal) => {
    if (sporsmal.tag !== 'TILBAKE_I_ARBEID') return sporsmal
    return tilbakeIArbeid({
        fom: foranArbeidstakerMedOppholdKvitteringFom,
        tom: foranArbeidstakerMedOppholdKvitteringTom,
        arbeidsgiver: foranArbeidstakerMedOppholdKvittering.arbeidsgiver?.navn ?? undefined,
        id: sporsmal.id,
        svar: sporsmal.svar,
        tilbakeNarId: sporsmal.undersporsmal[0].id,
        tilbakeNarSvar: sporsmal.undersporsmal[0].svar,
    })
})

export const soknadSomTriggerSporsmalFinnesIkkeISoknad: RSSoknad = jsonDeepCopy(arbeidstaker)
soknadSomTriggerSporsmalFinnesIkkeISoknad.id = '2c45e5b3-1e0b-486a-ab6c-555b1ea02ed1'

export const soknadSomTriggerFeilStatusForOppdaterSporsmal: RSSoknad = jsonDeepCopy(arbeidstaker)
soknadSomTriggerFeilStatusForOppdaterSporsmal.id = '3335e5b3-1e0b-486a-ab6c-555b1ea02ed1'

export const soknadSomTrigger401ForOppdaterSporsmal: RSSoknad = jsonDeepCopy(arbeidstaker)
soknadSomTrigger401ForOppdaterSporsmal.id = '3335e5b3-1e0b-486a-ab6c-555b1ea02ed9'

export const arbeidstakerTilKorrigering: RSSoknad = jsonDeepCopy(arbeidstaker)
arbeidstakerTilKorrigering.id = '3335e5b3-1e0b-486a-ab6c-555b1ea02e99'
arbeidstakerTilKorrigering.status = 'UTKAST_TIL_KORRIGERING'
export const soknaderIntegration = [
    utgattSoknad,
    arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger,
    sendtArbeidsledig,
    avbruttSoknad,
    veldigLangSoknad,
    arbeidsledigKvittering,
    arbeidstakerTilKorrigering,
    soknadSomTrigger401ForOppdaterSporsmal,
    sendtArbeidsledigKvittering,
    oppholdUtlandKvittering,
    selvstendigKvittering,
    foranArbeidstakerMedOppholdKvittering,
    delvisUtfylltArbeidsledig,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdKvittering,
    sok6,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdKvittering,
    soknadSomTriggerSporsmalFinnesIkkeISoknad,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
] as RSSoknad[]
