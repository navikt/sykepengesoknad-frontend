import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { gammelOppsummering, oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { utlandV2 } from '../sporsmal/utland-v2'
import { arbeidstaker100Syk } from '../sykmeldinger'

const fom = '2020-04-01'
const tom = '2020-04-24'
const arbeidsgiverNavn = 'Posten Norge AS, Bærum'

const standardSporsmal = [
    ansvarserklaring(),
    tilbakeIArbeid({ fom, tom, arbeidsgiver: arbeidsgiverNavn }),
    ferieV2({ fom, tom }),
    permisjonV2({ fom, tom }),
    arbeidUnderveis100Prosent({ fom, tom, arbeidsgiver: arbeidsgiverNavn }),
    andreInntektskilderV2(),
]

const soknadData = {
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE' as const,
    status: 'NY' as const,
    fom,
    tom,
    opprettetDato: '2020-05-13',
    inntektskilderDataFraInntektskomponenten: [],
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: { navn: arbeidsgiverNavn, orgnummer: '974654458' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER' as const,
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' as const }],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

export const arbeidstakerMedGammelEOSSporsmal: RSSoknad = {
    id: 'faba11f5-c4f2-4647-8c8a-58b28ce2f3ef',
    ...soknadData,
    sporsmal: [...standardSporsmal, utlandV2({ fom, tom }), oppsummering()],
}

export const arbeidstaker: RSSoknad = {
    id: 'd9ac193d-9b67-4a51-80c2-fe4289214878',
    ...soknadData,
    opprettetDato: '2020-06-13',
    sporsmal: [...standardSporsmal, oppholdUtenforEos({ fom, tom }), oppsummering()],
}

export const arbeidtakerMedGammelOppsummering = (): RSSoknad => {
    const nySoknad = deepcopyMedNyId(arbeidstaker, 'fb7d20a2-2e9d-4e37-936c-e3865920745e')
    nySoknad.sporsmal = [...nySoknad.sporsmal.slice(0, -1), gammelOppsummering()]
    return nySoknad
}
