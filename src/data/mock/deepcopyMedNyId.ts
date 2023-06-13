import { v4 } from 'uuid'

import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

export function deepcopyMedNyId(soknad: RSSoknad, id = v4()): RSSoknad {
    const nySoknad = jsonDeepCopy(soknad)
    nySoknad.id = id
    return nySoknad
}
