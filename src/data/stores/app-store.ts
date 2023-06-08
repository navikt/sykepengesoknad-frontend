import constate from 'constate'
import { useState } from 'react'

export const [AppStoreProvider, useAppStore] = constate(() => {
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>('')

    return {
        feilmeldingTekst,
        setFeilmeldingTekst,
    }
})
