import { Alert, Button } from '@navikt/ds-react'
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
            {gjenapneError && <Alert variant="error">Beklager, klarte ikke gjenåpne søknaden din</Alert>}

            <Button
                data-cy="bruk-soknad-likevel"
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
