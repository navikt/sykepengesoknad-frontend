import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

export function deepcopyMedNyId(soknad: RSSoknad, id: string): RSSoknad {
    const nySoknad = jsonDeepCopy(soknad)
    nySoknad.id = id
    return nySoknad
}
