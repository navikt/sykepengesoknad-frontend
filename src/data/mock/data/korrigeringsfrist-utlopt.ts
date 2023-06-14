import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { arbeidstaker100Syk } from './sykmeldinger'
import { sendtArbeidsledig } from './soknader-integration'

export const korrigeringsfristUtloptSoknad: RSSoknad = deepcopyMedNyId(
    sendtArbeidsledig,
    '46cd957d-0d62-4091-81ec-7bac2bf6a628',
)
korrigeringsfristUtloptSoknad.korrigeringsfristUtlopt = true

export const korrigeringsfristUtloptPerson = {
    soknader: [korrigeringsfristUtloptSoknad],
    sykmeldinger: [arbeidstaker100Syk],
}
