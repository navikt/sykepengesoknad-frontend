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
        ansvarserklaring({ id: '687428' }),
        fravarForSykmeldingenV2({ fom, id: '687452' }),
        tilbakeIArbeid({ fom, tom, id: '687429', tilbakeNarId: '687430', tekstvariant: 'selvstendigNaeringsdrivende' }),
        arbeidUnderveis100Prosent({
            fom,
            tom,
            id: 'bb8d0465-331d-39bd-b605-d75c42cddee6',
            tekstvariant: 'selvstendigNaeringsdrivende',
            timerMaks: '214',
            ids: {
                arbeidsmengde: '38a44e52-3acd-35dc-9ca3-756e61d278aa',
                prosent: 'cab6856f-a255-38ba-bf40-fc947fc615de',
                prosentVerdi: 'b68db08b-9ad1-38e5-bcdd-2c98963c2b8d',
                timer: '00b89c61-dcda-3708-b02d-6cb8516da64f',
                timerVerdi: '1211c1f5-44e8-328b-8ce9-cc06ee63f1e0',
                normalArbeidsuke: '9163fd91-7e4f-3474-ae32-405f18004af0',
                timerPerUke: '480f1f44-7e14-3467-be6b-a98253085245',
            },
            normalArbeidsukeTekst: 'Jobber du vanligvis 37,5 timer i uka?',
        }),
        naringsdrivendeOpprettholdtInntekt(),
        andreInntektskilder({
            fom,
            tom,
            id: '687438',
            gruppeId: '687439',
            sporsmalstekst: 'Har du annen inntekt? Du trenger ikke oppgi penger fra NAV.',
            gruppeTekst: 'Hvilke inntektskilder har du?',
            kilder: [
                { tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD', id: '687440', erDuSykmeldtId: '687441' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER', id: '687442', erDuSykmeldtId: '687443' },
                { tag: 'INNTEKTSKILDE_FRILANSER_SELVSTENDIG', id: '687444', erDuSykmeldtId: '687445' },
                { tag: 'INNTEKTSKILDE_ANNET', id: '687446' },
            ],
        }),
        oppholdUtenforEos({
            fom,
            tom,
            id: '687447',
            oppholdNarId: '687448',
            sporsmalstekst: `Har du vært utenfor EU/EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
        }),
        naringsdrivendeOppholdIUtlandet(),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
