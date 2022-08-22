import { FieldValues } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { Soknad, Sporsmal } from '../../../types/types'
import { hentSporsmal } from '../../../utils/soknad-utils'

export default (soknad: Soknad, sporsmal: Sporsmal, formValues: FieldValues) => {
    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sporsmal.tag === TagTyper.ARBEIDSGIVER) {
        const arbiedsgiverId = hentSporsmal(soknad, TagTyper.ARBEIDSGIVER)!.id
        const ferieId = hentSporsmal(soknad, TagTyper.FERIE)!.id

        const harFerie = formValues[ferieId] === 'JA'
        const harArbeidsgiver = formValues[arbiedsgiverId] === 'JA'

        if (harArbeidsgiver && harFerie) {
            return false
        }
    }

    return true
}
