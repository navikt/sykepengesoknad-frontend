import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'
import {
    medlemskapOppholdstillatelseSporsmal,
    medlemskapOppholdstillatelseV2Sporsmal,
    medlemskapOppholdUtenforEøsSporsmal,
    medlemskapOppholdUtenforNorgeSporsmal,
    medlemskapUtførtArbeidUtenforNorgeSporsmal,
} from '../sporsmal/medlemskap'
import { utenlandskSykmeldingSporsmalene } from '../sporsmal/utenlandsk-sykmelding-sporsmalene'
import { yrkesskadeV2Sporsmal } from '../sporsmal/yrkesskade-v2'
import { yrkesskadeV1Sporsmal } from '../sporsmal/yrkesskade-v1'
import { kjenteInntektskilder } from '../sporsmal/kjente-inntektskilder'
import {
    naringsdrivendeVirksomhetenAvviklet,
    naringsdrivendeNyIArbeidslivet,
    naringsdrivendeVarigEndring,
    naringsdrivendeOppholdIUtlandet,
    naringsdrivendeOpprettholdtInntekt,
    naringsdrivendeOpprettholdtInntektGradert,
} from '../sporsmal/naringsdrivende'
import { nyttArbeidsforholdSporsmal } from '../sporsmal/nytt-arbeidsforhold'
import { avklaringIfbmReise } from '../sporsmal/avklaringIfbmReise'
import { flereInntektskilderGhost } from '../sporsmal/flere-inntektskilder-ghost'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { andreInntektskilder, inntektskildeTagger } from '../sporsmal/andre-inntektskilder'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { arbeidsgiverUtland } from '../sporsmal/arbeidsgiver-utland'
import { arbeidsledigUtland } from '../sporsmal/arbeidsledig-utland'
import { egenmeldinger } from '../sporsmal/egenmeldinger'
import { fravarForSykmeldingen, fravarForSykmeldingenV2 } from '../sporsmal/fravar-for-sykmeldingen'
import { enkeltstaendeBehandlingsdager } from '../sporsmal/enkeltstaende-behandlingsdager'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { feriePermisjonUtland } from '../sporsmal/ferie-permisjon-utland'
import { fraverForBehandling } from '../sporsmal/fraver-for-behandling'
import { friskmeldt } from '../sporsmal/friskmeldt'
import { jobbetDu100Prosent } from '../sporsmal/jobbet-du-100-prosent'
import { jobbetDuGradert } from '../sporsmal/jobbet-du-gradert'
import { land } from '../sporsmal/land'
import { periodeUtland } from '../sporsmal/periodeutland'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { permittertNaa, permittertPeriode } from '../sporsmal/permittert'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { utdanning } from '../sporsmal/utdanning'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { utland } from '../sporsmal/utland'
import { utlandV2 } from '../sporsmal/utland-v2'
import { brukteReisetilskuddet } from '../sporsmal/brukte-reisetilskuddet'
import { transportTilDaglig } from '../sporsmal/transport-til-daglig'
import { typeTransport } from '../sporsmal/type-transport'
import { bilBompenger, bilBompengerBelop, bilTilDaglig, kmHjemJobb } from '../sporsmal/bil-til-daglig'
import { offentligTransportBelop, offentligTransportTilDaglig } from '../sporsmal/offentlig-transport'
import { bilDatoer, reiseMedBil } from '../sporsmal/reise-med-bil'
import { kvitteringer } from '../sporsmal/kvitteringer'
import { utbetaling } from '../sporsmal/utbetaling'
import { inntektUnderveis, jobbsituasjonenDin, reiseTilUtlandet } from './friskmeldt-til-arbeidsformidling'

const fom = '2020-04-01'
const tom = '2020-04-24'
const arbeidsgiver = 'Posten Norge AS, Bærum'

export const veldigLangSoknad: RSSoknad = {
    id: '214f6e73-8150-4261-8ce5-e2b41907fa58',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2020-05-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: {
        navn: arbeidsgiver,
        orgnummer: '974654458',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom,
            tom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        ansvarserklaring({ id: '687336' }),
        yrkesskadeV1Sporsmal(),
        yrkesskadeV2Sporsmal(),
        medlemskapOppholdstillatelseSporsmal(),
        medlemskapOppholdstillatelseV2Sporsmal(),
        medlemskapOppholdUtenforEøsSporsmal(),
        medlemskapOppholdUtenforNorgeSporsmal(),
        medlemskapUtførtArbeidUtenforNorgeSporsmal(),
        arbeidUnderveis100Prosent({
            fom: '2021-08-12',
            tom: '2021-08-29',
            arbeidsgiver: 'Butikken',
            id: 'f085f79a-ced7-36b0-9259-0806aa57da5f',
            ids: {
                arbeidsmengde: '15b9f776-b61b-3187-9087-4b5be9ac0ac0',
                prosent: 'eb033fe0-5a52-3a36-8bbc-5e0e9a795202',
                prosentVerdi: 'a16a854c-c822-3526-8654-159dc2eb6fb0',
                timer: '07e8f791-8d86-363f-bfca-b85b743e5f66',
                timerVerdi: '5d8e54ed-85af-3481-b7b9-435138d3441a',
                normalArbeidsuke: 'b0cae879-89ec-316c-8560-ebeaedf11755',
                timerPerUke: '67e95c02-f1b9-3033-88ef-0805ffe239b5',
            },
            timerMaks: '386',
            prosentUndertekst: 'Eksempel 40%',
            timerUndertekst: 'Eksempel 12 timer',
            timerTekstSporsmalstegn: true,
            timerPerUkeTekst: null,
            arbeidsgiverFormulering: 'uten',
            hovedtekstvariant: 'uten-arbeidsgiver-i-andre-setning',
            prosentVerdiTekstvariant: 'totalt-prosent',
        }),
        andreInntektskilder({
            fom,
            tom,
            id: '687356',
            gruppeId: '687357',
            sporsmalstekst: `Har du andre inntektskilder enn ${arbeidsgiver}?`,
            gruppeTekst: 'Hvilke andre inntektskilder har du?',
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD', id: '687358', erDuSykmeldtId: '687359' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG', id: '687360', erDuSykmeldtId: '687361' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA', id: '687362', erDuSykmeldtId: '687363' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER', id: '687364', erDuSykmeldtId: '687365' },
                { tag: 'INNTEKTSKILDE_FRILANSER', id: '687366', erDuSykmeldtId: '687367' },
                { tag: 'INNTEKTSKILDE_ANNET', id: '687368' },
            ],
        }),
        andreInntektskilder({
            fom: '2020-05-27',
            tom: '2020-06-11',
            id: '49',
            gruppeId: '50',
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD', id: '51', erDuSykmeldtId: '52' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG', id: '53', erDuSykmeldtId: '54' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA', id: '55', erDuSykmeldtId: '56' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER', id: '57', erDuSykmeldtId: '58' },
                { tag: 'INNTEKTSKILDE_FRILANSER', id: '59', erDuSykmeldtId: '60' },
                { tag: 'INNTEKTSKILDE_OMSORGSLONN', id: '61', erDuSykmeldtId: '62' },
                { tag: 'INNTEKTSKILDE_FOSTERHJEM', id: '63', erDuSykmeldtId: '64' },
                { tag: 'INNTEKTSKILDE_ANNET', id: '65' },
                { tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD', id: '687440', erDuSykmeldtId: '687441' },
                {
                    tag: inntektskildeTagger[9],
                    id: '687444',
                    erDuSykmeldtId: '687445',
                    sporsmalstekst: 'selvstendig næringsdrivende',
                },
            ],
        }),
        andreInntektskilderV2(),
        andreInntektskilderV2({ variant: 'fem-aar' }),
        andreInntektskilderV2({ id: 'aa6a8e85-07c2-30c3-99d0-2aad85124890', variant: 'fire-aar' }),
        arbeidUtenforNorge({ id: '103' }),
        arbeidsgiverUtland({ id: '3', variant: 'sykmeldingsgrad-og-ferie' }),
        arbeidsledigUtland({ fom, tom }),
        egenmeldinger({
            fom: '2020-05-04',
            tom: '2020-05-19',
            sykmeldtDato: '2020-05-20',
            min: '2019-11-20',
            max: '2020-05-19',
        }),
        fravarForSykmeldingen({
            fom,
            tom,
            narMin: '2019-10-01',
            narMax: '2020-03-31',
            tekstFom: '2020-03-16',
            tekstTom: '2020-03-31',
            id: '12345678',
            narId: '1234567899',
        }),
        enkeltstaendeBehandlingsdager({
            fom,
            tom,
            uker: [
                { id: '687376', fom: '2020-04-01', tom: '2020-04-03', sporsmalstekst: '2020-04-01 - 2020-04-03' },
                { id: '687377', fom: '2020-04-06', tom: '2020-04-10' },
                { id: '687378', fom: '2020-04-13', tom: '2020-04-17' },
                { id: '687379', fom: '2020-04-20', tom: '2020-04-24' },
            ],
        }),
        ferieV2({ fom, tom }),
        feriePermisjonUtland({ fom, tom }),
        fraverForBehandling({
            fom,
            tom,
            fravarFom: '2019-10-01',
            fravarTom: '2020-03-31',
            fravarTekstFom: '2020-03-16',
            fravarTekstTom: '2020-03-31',
            tidligereEgenmeldingTag: 'TIDLIGERE_EGENMELDING',
        }),
        friskmeldt({ fom: '2020-05-27', tom: '2020-06-11', id: '47', startId: '48' }),
        jobbetDu100Prosent({ fom, tom, arbeidsgiver }),
        jobbetDuGradert({
            fom: '2020-05-20',
            tom: '2020-06-05',
            arbeidsgiver: '995816598 sitt orgnavn :)',
            grad: 20,
            id: '104',
            ids: {
                timerPerUke: '105',
                arbeidsmengde: '106',
                prosent: '107',
                prosentVerdi: '108',
                timer: '109',
                timerVerdi: '110',
            },
            prosentMin: '21',
            tekstvariant: 'normaleArbeid',
            arbeidsmengdeTekstvariant: 'totalt-hos-arbeidsgiver',
            arbeidsmengdeUndertekst: null,
            alternativTekstvariant: 'liten-forbokstav',
            verdiSvartype: 'tall',
        }),
        land({ id: '2', undertekst: null, svartype: 'LAND' }),
        land({ id: '926', undertekst: null }),
        periodeUtland({ id: '1', fom, tom }),
        permisjonV2({ fom, tom }),
        permittertNaa({ sykmeldtFom: '2021-01-04', min: '2019-12-01', max: tom }),
        permittertPeriode({ fom: '2020-10-22', tom: '2020-11-22' }),
        tilbakeIArbeid({ fom, tom, arbeidsgiver }),
        utdanning({ fom, tom }),
        oppholdUtenforEos({ fom, tom, tekstvariant: 'eos' }),
        utland({
            fom,
            tom,
            id: '423',
            periodeId: '424',
            periodeTag: 'PERIODER',
            periodeTekst: 'Når var du utenfor EØS?',
            inkluderSoktSykepenger: true,
            soktId: '425',
            informasjonId: '426',
            informasjonSporsmalstekst:
                '<p>I utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel <a target="_blank" href="https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland">søke NAV om å få reise ut av EØS</a> og beholde sykepengene i en begrenset periode.</p>',
            informasjonUndertekst: null,
        }),
        utlandV2({ fom, tom, tekstvariant: 'eos' }),
        brukteReisetilskuddet({ tekstvariant: 'brukt-reisetilskuddet' }),
        transportTilDaglig({
            id: 'b59b2bea-1d4c-49e7-9e05-351aaf083232',
            typeTransportSporsmal: typeTransport({
                id: 'e9d8255d-4277-41c2-bc63-904029c71623',
                undersporsmal: [
                    bilTilDaglig({
                        id: '0c0d7a32-db1c-41d9-ba2d-cb0e44db208d',
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        undersporsmal: [
                            kmHjemJobb({ id: 'c56ca825-5993-4a13-bba7-29d592944b20', tekstvariant: 'kort' }),
                        ],
                    }),
                    offentligTransportTilDaglig({
                        id: 'c56ca825-5993-4a13-bba7-29d592945c30',
                        belop: offentligTransportBelop({ id: 'veldigLangSoknadTestReisetilskudd' }),
                    }),
                ],
            }),
        }),
        reiseMedBil({
            fom,
            tom,
            id: '7f8e5fd4-325b-4614-9eb3-39faa2bb511f',
            tekstvariant: 'fra',
            inkluderKmHjemJobb: false,
            bilDatoerSporsmal: bilDatoer({ fom, tom, id: 'deaac8aa-11b9-4e60-86e2-b90af5cf8b04' }),
            bompengerSporsmal: bilBompenger({
                id: 'da7d7561-2ef1-4ba5-b89f-8d849ec9c697',
                belop: bilBompengerBelop({
                    id: '616cc0cb-434e-4114-a68b-b5708e033e9e',
                    tekstvariant: 'i-perioden',
                }),
            }),
        }),
        kvitteringer({ fom, tom, id: 'c5e8e211-d8d1-404d-85a7-d6e073f1fd4b', tekstvariant: 'reiseutgifter' }),
        utbetaling({ id: '2723f1dc-a45e-44b1-bb0c-a7caa34a43f2' }),
        arbeidUnderveis100Prosent({ fom, tom, arbeidsgiver }),
        ...utenlandskSykmeldingSporsmalene(),
        kjenteInntektskilder(['Rema']),
        nyttArbeidsforholdSporsmal({
            arbeidsstedNavn: 'Kaffebrenneriet',
            arbeidsstedOrgnummer: '123324',
            tom,
            fom: '2020-04-20',
        }),
        naringsdrivendeOpprettholdtInntekt(),
        naringsdrivendeOpprettholdtInntektGradert(),
        naringsdrivendeOppholdIUtlandet(),
        naringsdrivendeVirksomhetenAvviklet(),
        naringsdrivendeNyIArbeidslivet(),
        naringsdrivendeVarigEndring(),
        avklaringIfbmReise(),
        jobbsituasjonenDin({
            fom: '2025-04-15',
            tom: '2025-04-28',
            sisteSoknad: false,
        }),
        inntektUnderveis({
            fom: '2025-04-15',
            tom: '2025-04-28',
        }),
        reiseTilUtlandet({
            fom: '2025-04-15',
            tom: '2025-04-28',
        }),
        fravarForSykmeldingenV2({ fom }),
        flereInntektskilderGhost(),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
