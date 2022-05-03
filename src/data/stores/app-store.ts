import constate from 'constate'
import { useState } from 'react'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { Sykmelding } from '../../types/sykmelding'
import { Kvittering, Soknad } from '../../types/types'

export const [AppStoreProvider, useAppStore] = constate(() => {
    const [soknader, setSoknader] = useState<Soknad[]>([])
    const [sykmeldinger, setSykmeldinger] = useState<Sykmelding[]>([])
    const [valgtSoknad, setValgtSoknad] = useState<Soknad>()
    const [valgtSykmelding, setValgtSykmelding] = useState<Sykmelding>()
    const [valgtKvittering, setValgtKvittering] = useState<Kvittering>()
    const [mottaker, setMottaker] = useState<RSMottaker>()
    const [top, setTop] = useState<number>(0)
    const [feilState, setFeilState] = useState<boolean>(false)
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [valgtFil, setValgtFil] = useState<File>()

    return {
        soknader,
        setSoknader,
        valgtSoknad,
        setValgtSoknad,
        sykmeldinger,
        setSykmeldinger,
        valgtSykmelding,
        setValgtSykmelding,
        valgtKvittering,
        setValgtKvittering,
        mottaker,
        setMottaker,
        top,
        setTop,
        feilState,
        setFeilState,
        feilmeldingTekst,
        setFeilmeldingTekst,
        openModal,
        setOpenModal,
        valgtFil,
        setValgtFil,
    }
})
