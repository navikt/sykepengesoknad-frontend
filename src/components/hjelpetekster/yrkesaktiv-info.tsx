import React from 'react'
import NyAlertGammeltDesign, { Funksjon } from '../generelle-komponenter/NyAlertGammeltDesign'

import { Sporsmal } from '../../types/types'

export function NaringsdrivendeYrkesaktivInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag === 'NARINGSDRIVENDE_NY_I_ARBEIDSLIVET' && jaNeiSvar === 'JA') {
        return (
            <NyAlertGammeltDesign
                funksjon={Funksjon.info}
                info={
                    'Vi trenger mer dokumentasjon på dette fra deg. Etter du har sendt inn denne søknaden vil du få beskjed om hva vi trenger og hvordan du sender det til oss.'
                }
            />
        )
    }

    return null
}
