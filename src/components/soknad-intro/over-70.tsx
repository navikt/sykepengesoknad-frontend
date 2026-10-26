import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'
import NyAlertGammeltDesign, { Funksjon } from '../generelle-komponenter/NyAlertGammeltDesign'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

export const Over70Aar = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) {
        return null
    }

    return (
        <NyAlertGammeltDesign
            funksjon={Funksjon.warning}
            className="mt-8"
            info={
                <>
                    <Heading size="medium" spacing>
                        Viktig informasjon
                    </Heading>
                    <BodyLong spacing>Når du har passert 70 år, har du ikke lenger rett til sykepenger.</BodyLong>
                    <BodyLong>
                        Hvis du ikke skal søke om sykepenger, kan du avbryte søknaden. Hvis du likevel ønsker å søke,
                        kan vi ikke hindre deg i dette.
                    </BodyLong>
                </>
            }
        />
    )
}
