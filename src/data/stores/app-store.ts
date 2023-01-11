import constate from 'constate'
import { useState } from 'react'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'

export const [AppStoreProvider, useAppStore] = constate(() => {
    const [mottaker, setMottaker] = useState<RSMottaker>()
    const [feilState, setFeilState] = useState<boolean>(false)
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>('')

    return {
        mottaker,
        setMottaker,
        feilState,
        setFeilState,
        feilmeldingTekst,
        setFeilmeldingTekst,
    }
})
