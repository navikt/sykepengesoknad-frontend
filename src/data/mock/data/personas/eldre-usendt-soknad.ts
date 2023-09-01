import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { sykmeldinger } from '../sykmeldinger'
import { kortArbeidstakerSoknad } from '../soknad/arbeidstaker-kort'

import { Persona } from './personas'

const nySoknadSomIkkeKanFyllesUt: RSSoknad = deepcopyMedNyId(
    kortArbeidstakerSoknad,
    'e6e53c43-3b64-48be-b9d1-39d95198e521',
)
nySoknadSomIkkeKanFyllesUt.fom = '2022-04-25'
nySoknadSomIkkeKanFyllesUt.tom = '2022-04-30'

const endaEnNySoknadSomIkkeKanFyllesUt: RSSoknad = deepcopyMedNyId(
    kortArbeidstakerSoknad,
    'e6e53c43-3b64-48be-b9d1-39d95198e522',
)
endaEnNySoknadSomIkkeKanFyllesUt.fom = '2022-04-23'
endaEnNySoknadSomIkkeKanFyllesUt.tom = '2022-04-30'

export const flereEldreUsendteSoknader: Persona = {
    soknader: [
        deepcopyMedNyId(kortArbeidstakerSoknad, 'e6e53c43-3b64-48be-b9d1-39d95198e529'),
        nySoknadSomIkkeKanFyllesUt,
        endaEnNySoknadSomIkkeKanFyllesUt,
    ],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'To eldre søknader som ikke kan sendes inn',
}

export const eldreUsendtSoknad: Persona = {
    soknader: [
        deepcopyMedNyId(kortArbeidstakerSoknad, 'e6e53c43-3b64-48be-b9d1-39d95198e523'),
        deepcopyMedNyId(nySoknadSomIkkeKanFyllesUt, 'e6e53c43-3b64-48be-b9d1-39d95198e528'),
    ],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'En eldre søknad som ikke kan sendes inn',
}
