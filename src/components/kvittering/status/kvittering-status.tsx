import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import { useRouter } from 'next/router'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import useSoknad from '../../../hooks/useSoknad'

export enum Mottaker {
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

const KvitteringStatus = () => {
    const router = useRouter()
    const { id } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)

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
