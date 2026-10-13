import { Button, InfoCard } from '@navikt/ds-react'
import { XMarkOctagonIcon } from '@navikt/aksel-icons'
import React from 'react'

import { logEvent } from '../umami/umami'
import { useGjenapne } from '../../hooks/useGjenapne'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

const GjenapneSoknad = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { mutate: gjenapneMutation, isPending: gjenapner, error: gjenapneError } = useGjenapne()

    if (!valgtSoknad) return null

    return (
        <>
            {gjenapneError && (
                <InfoCard data-color="danger">
                    <InfoCard.Message icon=<XMarkOctagonIcon/>>
                        Beklager, klarte ikke gjenåpne søknaden din
                    </InfoCard.Message>
                </InfoCard>
            )}
            <Button
                variant="tertiary"
                className="-ml-5"
                type="button"
                loading={gjenapner}
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: 'Jeg vil bruke denne søknaden likevel',
                        soknadstype: valgtSoknad.soknadstype,
                        component: 'Avbrutt søknad visning',
                    })
                    gjenapneMutation(valgtSoknad.id)
                }}
            >
                Jeg vil bruke denne søknaden likevel
            </Button>
        </>
    )
}

export default GjenapneSoknad
