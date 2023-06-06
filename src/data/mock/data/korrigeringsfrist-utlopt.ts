import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

import { arbeidstaker100Syk } from './sykmeldinger'
import { sendtArbeidsledig } from './soknader-integration'

export const korrigeringsfristUtloptSoknad: RSSoknad = jsonDeepCopy(sendtArbeidsledig)
korrigeringsfristUtloptSoknad.korrigeringsfristUtlopt = true

export const korrigeringsfristUtloptPerson = {
    soknader: [korrigeringsfristUtloptSoknad],
    sykmeldinger: [arbeidstaker100Syk],
}
