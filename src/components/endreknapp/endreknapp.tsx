import { Button } from '@navikt/ds-react'
import React, { useState } from 'react'

import { logEvent } from '../amplitude/amplitude'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import { EndreknappTekster } from './endreknapp-tekster'
import EndreModal from './endreModal'

const Endreknapp = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()
    const [aapen, setAapen] = useState<boolean>(false)

    const endreKnappTekst = EndreknappTekster['kvittering.knapp.endre']
    if (!valgtSoknad) return null

    return (
        <>
            <Button
                type="button"
                variant="secondary"
                className="mt-4 mb-6 block"
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: endreKnappTekst,
                    })
                    setAapen(true)
                }}
            >
                {endreKnappTekst}
            </Button>
            <EndreModal aapen={aapen} setAapen={setAapen} />
        </>
    )
}

export default Endreknapp
