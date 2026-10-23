import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import NyAlertGammeltDesign, { Funksjon } from '../generelle-komponenter/NyAlertGammeltDesign'

import { Sporsmal } from '../../types/types'

export function YrkesskadeInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag == 'YRKESSKADE_V2' && jaNeiSvar == 'JA') {
        return (
            <NyAlertGammeltDesign
                funksjon={Funksjon.info}
                className="mt-8"
                info={
                    <BodyShort spacing>
                        En saksbehandler vil gå gjennom saken din og vurdere om sykefraværet ditt er knyttet til en
                        godkjent yrkesskade. Dette vil forlenge saksbehandlingstiden.
                    </BodyShort>
                }
            />
        )
    }

    return null
}
