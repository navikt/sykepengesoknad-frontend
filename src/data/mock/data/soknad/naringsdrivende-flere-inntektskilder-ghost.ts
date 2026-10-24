import { RSKilde, RSKjentInntektskilde } from '../../../../types/rs-types/rs-kjenteinntektskilder'
import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { formatterPeriode } from '../sporsmal/utils/backend-datoformat'
import { naringsdrivende100syk } from '../sykmeldinger'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { flereInntektskilderGhost } from '../sporsmal/flere-inntektskilder-ghost'
import { fravarForSykmeldingenV2 } from '../sporsmal/fravar-for-sykmeldingen'
import { naringsdrivendeOppholdIUtlandet, naringsdrivendeOpprettholdtInntekt } from '../sporsmal/naringsdrivende'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'

const fom = '2020-04-01'
const tom = '2020-04-24'

const ghostInntekter: RSKjentInntektskilde[] = [
    { navn: 'Ruter', orgnummer: '222', kilde: RSKilde.INNTEKTSKOMPONENTEN },
    { navn: 'Blomsterbutikken AS', orgnummer: '111', kilde: RSKilde.INNTEKTSKOMPONENTEN },
    {
        navn: 'Bensinstasjonen med det veldig lange navnet, Stavanger (ved det røde huset som ligger ved Shell)',
        orgnummer: '333',
        kilde: RSKilde.INNTEKTSKOMPONENTEN,
    },
]

export const naringsdrivendeFlereInntektskilderGhost: RSSoknad = {
    id: 'c1a5f746-d910-4f45-8c23-81e2c4f8a639',
    sykmeldingId: naringsdrivende100syk.id,
    soknadstype: 'SELVSTENDIGE_OG_FRILANSERE',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2020-05-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: null,
    korrigerer: null,
    korrigertAv: null,
    forstegangssoknad: true,
    arbeidssituasjon: 'NAERINGSDRIVENDE',
    merknaderFraSykmelding: [],
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' }],
    sporsmal: [
        ansvarserklaring(),
        fravarForSykmeldingenV2({ fom }),
        tilbakeIArbeid({ fom, tom, tekstvariant: 'selvstendigNaeringsdrivende' }),
        arbeidUnderveis100Prosent({
            fom,
            tom,
            tekstvariant: 'selvstendigNaeringsdrivende',
            timerMaks: '214',
            normalArbeidsukeTekst: 'Jobber du vanligvis 37,5 timer i uka?',
        }),
        naringsdrivendeOpprettholdtInntekt(),
        flereInntektskilderGhost(),
        oppholdUtenforEos({
            fom,
            tom,
            sporsmalstekst: `Har du vært utenfor EU/EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
        }),
        naringsdrivendeOppholdIUtlandet(),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
    ghostInntekter,
}
