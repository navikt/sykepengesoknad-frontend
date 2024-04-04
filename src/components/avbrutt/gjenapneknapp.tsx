import { Alert, Button } from '@navikt/ds-react'
import React, { useState } from 'react'

import { logEvent } from '../amplitude/amplitude'
import { useGjenapne } from '../../hooks/useGjenapne'
import Vis from '../vis'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import { GjenapneModal } from './gjenapne-modal'

const GjenapneSoknad = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { mutate: gjenapneMutation, isLoading: gjenapner, error: gjenapneError } = useGjenapne()
    const [aapneSurvey, setAapneSurvey] = useState(false)

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
                type="button"
                loading={gjenapner}
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: 'Jeg vil bruke denne søknaden likevel',
                        soknadstype: valgtSoknad.soknadstype,
                        component: 'Avbrutt søknad visning',
                    })
                    setAapneSurvey(true)
                }}
            >
                Jeg vil bruke denne søknaden likevel
            </Button>
            <GjenapneModal
                aapen={aapneSurvey}
                setAapen={setAapneSurvey}
                gjenAApne={() => {
                    if (!gjenapner) {
                        setTimeout(() => {
                            gjenapneMutation(valgtSoknad.id)
                        }, 1000)
                    }
                }}
            ></GjenapneModal>
        </>
    )
}

export default GjenapneSoknad
