import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'
import { Persona } from '../personas'
import { arbeidstaker } from './soknader-opplaering'
import { sykmeldinger } from './sykmeldinger'

export const nySoknadSomIkkeKanFyllesUt: RSSoknad = jsonDeepCopy(arbeidstaker)
nySoknadSomIkkeKanFyllesUt.id = 'ny-som-ikke-kan-fylles-ut'
nySoknadSomIkkeKanFyllesUt.fom = '2020-04-25'
nySoknadSomIkkeKanFyllesUt.tom = '2020-04-30'

export const eldreUsendtSoknad: Persona = {
    soknader: [arbeidstaker, nySoknadSomIkkeKanFyllesUt],
    sykmeldinger: sykmeldinger,
}
