import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'
import { Persona } from '../personas'

import { kortArbeidstakerSoknad } from './kort-soknad'
import { sykmeldinger } from './sykmeldinger'

export const nySoknadSomIkkeKanFyllesUt: RSSoknad = jsonDeepCopy(kortArbeidstakerSoknad)
nySoknadSomIkkeKanFyllesUt.id = 'en-ny-som-ikke-kan-fylles-ut'
nySoknadSomIkkeKanFyllesUt.fom = '2022-04-25'
nySoknadSomIkkeKanFyllesUt.tom = '2022-04-30'

export const endaEnNySoknadSomIkkeKanFyllesUt: RSSoknad = jsonDeepCopy(kortArbeidstakerSoknad)
endaEnNySoknadSomIkkeKanFyllesUt.id = 'enda-enny-som-ikke-kan-fylles-ut'
endaEnNySoknadSomIkkeKanFyllesUt.fom = '2022-04-23'
endaEnNySoknadSomIkkeKanFyllesUt.tom = '2022-04-30'

export const flereEldreUsendteSoknader: Persona = {
    soknader: [kortArbeidstakerSoknad, nySoknadSomIkkeKanFyllesUt, endaEnNySoknadSomIkkeKanFyllesUt],
    sykmeldinger: sykmeldinger,
}

export const eldreUsendtSoknad: Persona = {
    soknader: [kortArbeidstakerSoknad, nySoknadSomIkkeKanFyllesUt],
    sykmeldinger: sykmeldinger,
}
