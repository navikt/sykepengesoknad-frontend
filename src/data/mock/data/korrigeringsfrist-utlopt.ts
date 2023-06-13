import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { arbeidstaker100Syk } from './sykmeldinger'
import { sendtArbeidsledig } from './soknader-integration'

export const korrigeringsfristUtloptSoknad: RSSoknad = deepcopyMedNyId(sendtArbeidsledig)
korrigeringsfristUtloptSoknad.korrigeringsfristUtlopt = true

export const korrigeringsfristUtloptPerson = {
    soknader: [korrigeringsfristUtloptSoknad],
    sykmeldinger: [arbeidstaker100Syk],
}
