import { Button } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

import { RouteParams } from '../../../app'
import fetchMedRequestId, { AuthenticationError } from '../../../utils/fetch'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import useSoknad from '../../../hooks/useSoknad'

import styles from './gjenapneknapp.module.css'

const GjenapneSoknad = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const queryClient = useQueryClient()

    const [gjenapner, setGjenapner] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    const gjenapneSoknad = async () => {
        if (gjenapner) {
            return
        } else {
            setGjenapner(true)
        }

        logEvent('knapp klikket', {
            tekst: 'Jeg vil bruke denne søknaden likevel',
            soknadstype: valgtSoknad?.soknadstype,
            component: 'Avbrutt søknad visning',
        })

        try {
            await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/gjenapne`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
            await queryClient.invalidateQueries(['soknad', valgtSoknad!.id])
            queryClient.invalidateQueries(['soknader'])
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                logger.error(e)
            }
            return
        } finally {
            setGjenapner(false)
        }
    }

    return (
        <div className={styles.knapperad}>
            <Button variant="tertiary" loading={gjenapner} onClick={gjenapneSoknad}>
                Jeg vil bruke denne søknaden likevel
            </Button>
        </div>
    )
}

export default GjenapneSoknad
