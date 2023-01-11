import constate from 'constate'
import { useState } from 'react'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'

export const [AppStoreProvider, useAppStore] = constate(() => {
    const [mottaker, setMottaker] = useState<RSMottaker>()
    const [top, setTop] = useState<number>(0)
    const [feilState, setFeilState] = useState<boolean>(false)
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>('')

    return {
        mottaker,
        setMottaker,
        top,
        setTop,
        feilState,
        setFeilState,
        feilmeldingTekst,
        setFeilmeldingTekst,
    }
})
