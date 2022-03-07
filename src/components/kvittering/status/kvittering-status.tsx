import { Alert } from '@navikt/ds-react'
import dayjs from 'dayjs'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'

export enum Mottaker {
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

const KvitteringStatus = () => {
    const { valgtSoknad } = useAppStore()
    const [ tilNavDato, setTilNavDato ] = useState<string>()

    useEffect(() => {
        opprettDatoer()
        // eslint-disable-next-line
    }, [])

    const opprettDatoer = () => {
        const sendtTilNav = valgtSoknad?.sendtTilNAVDato
        if (sendtTilNav) {
            const datoNav = dayjs(sendtTilNav).format('dddd D. MMM, kl HH:mm')
            setTilNavDato(datoNav.charAt(0).toUpperCase() + datoNav.slice(1))
        }
    }

    return (
        <Vis hvis={valgtSoknad?.sendtTilNAVDato}
            render={() =>
                <Alert variant="success">
                    <Undertittel tag="h2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {Mottaker.NAV}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('kvittering.mottatt')}: {tilNavDato}
                    </Normaltekst>
                </Alert>
            }
        />
    )
}

export default KvitteringStatus
