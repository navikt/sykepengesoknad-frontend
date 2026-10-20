import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { oppsummering } from '../sporsmal/oppsummering'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { arbeidstaker } from './arbeidstaker'

const fom = '2024-12-01'
const tom = '2024-12-31'
const arbeidsgiverNavn = 'Posten Norge AS, Bærum'

const arbeidstakerJulesoknad = deepcopyMedNyId(arbeidstaker, '6e60c42e-ff62-4806-92b0-deade6f9fc69')

arbeidstakerJulesoknad.julesoknad = true
arbeidstakerJulesoknad.fom = fom
arbeidstakerJulesoknad.tom = tom
arbeidstakerJulesoknad.opprettetDato = '2024-11-30'
arbeidstakerJulesoknad.sykmeldingUtskrevet = '2024-11-30'
arbeidstakerJulesoknad.startSykeforlop = fom
arbeidstakerJulesoknad.soknadPerioder.at(0)!.fom = fom
arbeidstakerJulesoknad.soknadPerioder.at(0)!.tom = tom
arbeidstakerJulesoknad.sporsmal = [
    ansvarserklaring({}),
    tilbakeIArbeid({ fom, tom, arbeidsgiver: arbeidsgiverNavn }),
    oppsummering(),
]

export default arbeidstakerJulesoknad
