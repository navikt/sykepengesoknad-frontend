import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'
import { Persona } from '../personas'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { kortArbeidstakerSoknad } from './kort-soknad'
import { sykmeldinger } from './sykmeldinger'

export const nySoknadSomIkkeKanFyllesUt: RSSoknad = jsonDeepCopy(kortArbeidstakerSoknad)
nySoknadSomIkkeKanFyllesUt.id = 'e6e53c43-3b64-48be-b9d1-39d95198e521'
nySoknadSomIkkeKanFyllesUt.fom = '2022-04-25'
nySoknadSomIkkeKanFyllesUt.tom = '2022-04-30'

export const endaEnNySoknadSomIkkeKanFyllesUt: RSSoknad = jsonDeepCopy(kortArbeidstakerSoknad)
endaEnNySoknadSomIkkeKanFyllesUt.id = 'e6e53c43-3b64-48be-b9d1-39d95198e522'
endaEnNySoknadSomIkkeKanFyllesUt.fom = '2022-04-23'
endaEnNySoknadSomIkkeKanFyllesUt.tom = '2022-04-30'

export const flereEldreUsendteSoknader: Persona = {
    soknader: [
        deepcopyMedNyId(kortArbeidstakerSoknad, 'e6e53c43-3b64-48be-b9d1-39d95198e529'),
        nySoknadSomIkkeKanFyllesUt,
        endaEnNySoknadSomIkkeKanFyllesUt,
    ],
    sykmeldinger: sykmeldinger,
}

export const eldreUsendtSoknad: Persona = {
    soknader: [
        deepcopyMedNyId(kortArbeidstakerSoknad, 'e6e53c43-3b64-48be-b9d1-39d95198e523'),
        deepcopyMedNyId(nySoknadSomIkkeKanFyllesUt, 'e6e53c43-3b64-48be-b9d1-39d95198e528'),
    ],
    sykmeldinger: sykmeldinger,
}
