import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { formatterPeriode } from '../sporsmal/backend-datoformat'
import { naringsdrivende100syk } from '../sykmeldinger'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { fravarForSykmeldingenV2 } from '../sporsmal/fravar-for-sykmeldingen'
import { naringsdrivendeOppholdIUtlandet, naringsdrivendeOpprettholdtInntekt } from '../sporsmal/naringsdrivende'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'

const fom = '2020-04-01'
const tom = '2020-04-24'

export const naringsdrivendeSoknad: RSSoknad = {
    id: 'a8e40578-682b-4a04-bfda-b7768af2ae55',
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
        andreInntektskilder({
            fom,
            tom,
            sporsmalstekst: 'Har du annen inntekt? Du trenger ikke oppgi penger fra NAV.',
            gruppeTekst: 'Hvilke inntektskilder har du?',
            kilder: [
                { tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER' },
                { tag: 'INNTEKTSKILDE_FRILANSER_SELVSTENDIG' },
                { tag: 'INNTEKTSKILDE_ANNET' },
            ],
        }),
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
}
