import { Alert, Button } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import useSoknad from '../../hooks/useSoknad'
import { logEvent } from '../amplitude/amplitude'
import { useGjenapne } from '../../hooks/useGjenapne'
import Vis from '../vis'

const GjenapneSoknad = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { mutate: gjenapneMutation, isLoading: gjenapner, error: gjenapneError } = useGjenapne()

    if (!valgtSoknad) return null

    return (
        <>
            <Vis
                hvis={gjenapneError}
                render={() => <Alert variant="error">Beklager, klarte ikke gjenåpne søknaden din</Alert>}
            />
            <Button
                data-cy="bruk-soknad-likevel"
                variant="tertiary"
                className="-ml-5"
                loading={gjenapner}
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: 'Jeg vil bruke denne søknaden likevel',
                        soknadstype: valgtSoknad.soknadstype,
                        component: 'Avbrutt søknad visning',
                    })
                    gjenapneMutation(id)
                }}
            >
                Jeg vil bruke denne søknaden likevel
            </Button>
        </>
    )
}

export default GjenapneSoknad
