import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { formatterPeriode } from '../sporsmal/utils/backend-datoformat'
import { frilanser100Syk } from '../sykmeldinger'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { utland } from '../sporsmal/utland'

const fom = '2020-04-01'
const tom = '2020-04-24'
const sporsmal = (brukNyttUtlandssporsmal: boolean) => [
    ansvarserklaring(),
    tilbakeIArbeid({ fom, tom, tekstvariant: 'frilanser' }),
    arbeidUnderveis100Prosent({
        fom,
        tom,
        tekstvariant: 'frilanser',
        timerMaks: '214',
        normalArbeidsukeTekst: 'Jobber du vanligvis 37,5 timer i uka?',
    }),
    andreInntektskilder({
        fom,
        tom,
        sporsmalstekst: 'Har du annen inntekt? Du trenger ikke oppgi penger fra NAV.',
        gruppeTekst: 'Hvilke inntektskilder har du?',
        kilder: [
            { tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD' },
            { tag: 'INNTEKTSKILDE_JORDBRUKER' },
            {
                tag: 'INNTEKTSKILDE_FRILANSER_SELVSTENDIG',
                sporsmalstekst: 'selvstendig næringsdrivende',
            },
            { tag: 'INNTEKTSKILDE_ANNET' },
        ],
    }),
    ...(brukNyttUtlandssporsmal
        ? [utland({ fom, tom, tekstvariant: 'utenforEuEos' })]
        : [
              oppholdUtenforEos({
                  fom,
                  tom,
                  sporsmalstekst: `Har du vært utenfor EU/EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
              }),
          ]),
    arbeidUtenforNorge(),
    oppsummering(),
]
const lagFrilanser = (id: string, brukNyttUtlandssporsmal = false): RSSoknad => ({
    id,
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
    sporsmal: sporsmal(brukNyttUtlandssporsmal),
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
})

export const frilanserMedNyOppholdUtenfoeEOSSporsmal = lagFrilanser('a8e40578-682b-4a04-bfda-b7768af2ae13', true)
export const frilanser = lagFrilanser('a8e40508-682b-4a04-bfda-b7768af2ae13')
