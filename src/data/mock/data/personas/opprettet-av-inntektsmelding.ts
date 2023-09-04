import { jsonDeepCopy } from '../../../../utils/json-deep-copy'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { kortArbeidstakerSoknad } from '../soknad/arbeidstaker-kort'

export const arbeidstakerSoknadOpprettetAvInntektsmelding = jsonDeepCopy(kortArbeidstakerSoknad)
arbeidstakerSoknadOpprettetAvInntektsmelding.id = '2e432fef-9a47-4e7d-bf9d-602f22af7e84'
arbeidstakerSoknadOpprettetAvInntektsmelding.fom = '2022-04-01'
arbeidstakerSoknadOpprettetAvInntektsmelding.tom = '2022-04-10'
arbeidstakerSoknadOpprettetAvInntektsmelding.opprettetDato = '2022-04-01'
arbeidstakerSoknadOpprettetAvInntektsmelding.startSykeforlop = '2022-03-15'
arbeidstakerSoknadOpprettetAvInntektsmelding.sykmeldingUtskrevet = '2022-03-31'
arbeidstakerSoknadOpprettetAvInntektsmelding.opprettetAvInntektsmelding = true
arbeidstakerSoknadOpprettetAvInntektsmelding.soknadPerioder = [
    { fom: '2022-04-01', tom: '2022-04-10', grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' },
]

export const opprettetAvInntektsmelding = {
    soknader: [arbeidstakerSoknadOpprettetAvInntektsmelding],
    sykmeldinger: [arbeidstaker100Syk],
    beskrivelse: 'Opprettet av inntektsmelding fra arbeidsgiver',
}
