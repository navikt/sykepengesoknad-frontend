import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
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
                    <Heading size="small" level="2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {Mottaker.NAV}
                    </Heading>
                    <BodyShort>
                        {tekst('kvittering.mottatt')}: {tilNavDato}
                    </BodyShort>
                </Alert>
            }
        />
    )
}

export default KvitteringStatus
