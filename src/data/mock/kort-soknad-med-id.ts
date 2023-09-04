import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering } from './data/soknad/soknader-integration'

export const kortSoknadMedID = (id: string) => {
    const soknad = jsonDeepCopy(arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering)
    soknad.id = id
    return soknad
}
