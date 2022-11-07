import constate from 'constate'
import { useState } from 'react'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { Sykmelding } from '../../types/sykmelding'

export const [AppStoreProvider, useAppStore] = constate(() => {
    const [sykmeldinger, setSykmeldinger] = useState<Sykmelding[]>([])
    const [valgtSykmelding, setValgtSykmelding] = useState<Sykmelding>()
    const [mottaker, setMottaker] = useState<RSMottaker>()
    const [top, setTop] = useState<number>(0)
    const [feilState, setFeilState] = useState<boolean>(false)
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>('')

    return {
        sykmeldinger,
        setSykmeldinger,
        valgtSykmelding,
        setValgtSykmelding,
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
