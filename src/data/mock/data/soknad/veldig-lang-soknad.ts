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
import { avklaringIfbmReise } from '../sporsmal/avklaring-ifbm-reise'
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
import { fravarForBehandling } from '../sporsmal/fravar-for-behandling'
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
import { inntektUnderveis, jobbsituasjonenDin, reiseTilUtlandet } from '../sporsmal/friskmeldt-til-arbeidsformidling'
import { medUnikeIder } from '../sporsmal/utils/id-med-indeks'

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
    sporsmal: medUnikeIder([
        ansvarserklaring(),
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
            sporsmalstekst: `Har du andre inntektskilder enn ${arbeidsgiver}?`,
            gruppeTekst: 'Hvilke andre inntektskilder har du?',
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER' },
                { tag: 'INNTEKTSKILDE_FRILANSER' },
                { tag: 'INNTEKTSKILDE_ANNET' },
            ],
        }),
        andreInntektskilder({
            fom: '2020-05-27',
            tom: '2020-06-11',
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER' },
                { tag: 'INNTEKTSKILDE_FRILANSER' },
                { tag: 'INNTEKTSKILDE_OMSORGSLONN' },
                { tag: 'INNTEKTSKILDE_FOSTERHJEM' },
                { tag: 'INNTEKTSKILDE_ANNET' },
                { tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD' },
                {
                    tag: inntektskildeTagger[9],
                    sporsmalstekst: 'selvstendig næringsdrivende',
                },
            ],
        }),
        andreInntektskilderV2(),
        andreInntektskilderV2({ variant: 'fem-aar' }),
        andreInntektskilderV2({ variant: 'fire-aar' }),
        arbeidUtenforNorge(),
        arbeidsgiverUtland({ variant: 'sykmeldingsgrad-og-ferie' }),
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
        }),
        enkeltstaendeBehandlingsdager({
            fom,
            tom,
            uker: [
                { fom: '2020-04-01', tom: '2020-04-03', sporsmalstekst: '2020-04-01 - 2020-04-03' },
                { fom: '2020-04-06', tom: '2020-04-10' },
                { fom: '2020-04-13', tom: '2020-04-17' },
                { fom: '2020-04-20', tom: '2020-04-24' },
            ],
        }),
        ferieV2({ fom, tom }),
        feriePermisjonUtland({ fom, tom }),
        fravarForBehandling({
            fom,
            tom,
            fravarFom: '2019-10-01',
            fravarTom: '2020-03-31',
            fravarTekstFom: '2020-03-16',
            fravarTekstTom: '2020-03-31',
            tidligereEgenmeldingTag: 'TIDLIGERE_EGENMELDING',
        }),
        friskmeldt({ fom: '2020-05-27', tom: '2020-06-11' }),
        jobbetDu100Prosent({ fom, tom, arbeidsgiver }),
        jobbetDuGradert({
            fom: '2020-05-20',
            tom: '2020-06-05',
            arbeidsgiver: 'Nordlys Regnskap AS',
            grad: 20,
            prosentMin: '21',
            verdiSvartype: 'tall',
        }),
        land({ undertekst: null, svartype: 'LAND' }),
        land({ undertekst: null }),
        periodeUtland({ fom, tom }),
        permisjonV2({ fom, tom }),
        permittertNaa({ sykmeldtFom: '2021-01-04', min: '2019-12-01', max: tom }),
        permittertPeriode({ fom: '2020-10-22', tom: '2020-11-22' }),
        tilbakeIArbeid({ fom, tom, arbeidsgiver }),
        utdanning({ fom, tom }),
        oppholdUtenforEos({ fom, tom, tekstvariant: 'eos' }),
        utland({
            fom,
            tom,
            periodeTag: 'PERIODER',
            periodeTekst: 'Når var du utenfor EØS?',
            inkluderSoktSykepenger: true,
            informasjonSporsmalstekst:
                '<p>I utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel <a target="_blank" href="https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland">søke NAV om å få reise ut av EØS</a> og beholde sykepengene i en begrenset periode.</p>',
            informasjonUndertekst: null,
        }),
        utlandV2({ fom, tom, tekstvariant: 'eos' }),
        brukteReisetilskuddet({ tekstvariant: 'brukt-reisetilskuddet' }),
        transportTilDaglig({
            typeTransportSporsmal: typeTransport({
                undersporsmal: [
                    bilTilDaglig({
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        undersporsmal: [kmHjemJobb({ tekstvariant: 'kort' })],
                    }),
                    offentligTransportTilDaglig({
                        belop: offentligTransportBelop(),
                    }),
                ],
            }),
        }),
        reiseMedBil({
            fom,
            tom,
            tekstvariant: 'fra',
            inkluderKmHjemJobb: false,
            bilDatoerSporsmal: bilDatoer({ fom, tom }),
            bompengerSporsmal: bilBompenger({
                belop: bilBompengerBelop({
                    tekstvariant: 'i-perioden',
                }),
            }),
        }),
        kvitteringer({ fom, tom, tekstvariant: 'reiseutgifter' }),
        utbetaling(),
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
    ]),
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
