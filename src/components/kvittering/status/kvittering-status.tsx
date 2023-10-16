import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

export enum Mottaker {
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

const KvitteringStatus = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const tilNavDato = () => {
        const datoNav = dayjs(valgtSoknad!.sendtTilNAVDato).format('dddd D. MMM, kl HH:mm')
        return datoNav.charAt(0).toUpperCase() + datoNav.slice(1)
    }

    if (!valgtSoknad) return null

    return (
        <Vis
            hvis={valgtSoknad.sendtTilNAVDato}
            render={() => (
                <Alert variant="success" data-cy="sendt-nav">
                    <Heading size="small" level="2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {Mottaker.NAV}
                    </Heading>
                    <BodyShort>
                        {tekst('kvittering.mottatt')}: {tilNavDato()}
                    </BodyShort>
                </Alert>
            )}
        />
    )
}

export default KvitteringStatus
