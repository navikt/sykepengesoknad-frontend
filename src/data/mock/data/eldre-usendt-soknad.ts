import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'
import { Persona } from '../personas'
import { arbeidstaker } from './soknader-opplaering'
import { sykmeldinger } from './sykmeldinger'

export const nySoknadSomIkkeKanFyllesUt: RSSoknad = jsonDeepCopy(arbeidstaker)
nySoknadSomIkkeKanFyllesUt.id = 'en-ny-som-ikke-kan-fylles-ut'
nySoknadSomIkkeKanFyllesUt.fom = '2020-04-25'
nySoknadSomIkkeKanFyllesUt.tom = '2020-04-30'

export const eldreUsendtSoknad: Persona = {
    soknader: [arbeidstaker, nySoknadSomIkkeKanFyllesUt],
    sykmeldinger: sykmeldinger,
}
export const endaEnNySoknadSomIkkeKanFyllesUt: RSSoknad =
    jsonDeepCopy(arbeidstaker)
endaEnNySoknadSomIkkeKanFyllesUt.id = 'enda-enny-som-ikke-kan-fylles-ut'
endaEnNySoknadSomIkkeKanFyllesUt.fom = '2020-04-23'
endaEnNySoknadSomIkkeKanFyllesUt.tom = '2020-04-30'

export const flereEldreUsendteSoknader: Persona = {
    soknader: [
        arbeidstaker,
        nySoknadSomIkkeKanFyllesUt,
        endaEnNySoknadSomIkkeKanFyllesUt,
    ],
    sykmeldinger: sykmeldinger,
}
