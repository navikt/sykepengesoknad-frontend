import { RSKilde, RSKjentInntektskilde } from '../../../../types/rs-types/rs-kjenteinntektskilder'
import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { formatterPeriode } from '../sporsmal/utils/backend-datoformat'
import { frilanser100Syk } from '../sykmeldinger'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { flereInntektskilderGhost } from '../sporsmal/flere-inntektskilder-ghost'
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

export const frilanserFlereInntektskilderGhost: RSSoknad = {
    id: '8d5fa75e-b13e-4ac4-b0e7-cc644647a2c8',
    sykmeldingId: frilanser100Syk.id,
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
    arbeidssituasjon: 'FRILANSER',
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' }],
    sporsmal: [
        ansvarserklaring(),
        tilbakeIArbeid({ fom, tom, tekstvariant: 'frilanser' }),
        arbeidUnderveis100Prosent({
            fom,
            tom,
            tekstvariant: 'frilanser',
            timerMaks: '214',
            normalArbeidsukeTekst: 'Jobber du vanligvis 37,5 timer i uka?',
        }),
        flereInntektskilderGhost(),
        oppholdUtenforEos({
            fom,
            tom,
            sporsmalstekst: `Har du vært utenfor EU/EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
        }),
        arbeidUtenforNorge(),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
    ghostInntekter,
}
