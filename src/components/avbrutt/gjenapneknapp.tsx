import { Button } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

import fetchMedRequestId, { AuthenticationError } from '../../utils/fetch'
import useSoknad from '../../hooks/useSoknad'
import { logEvent } from '../amplitude/amplitude'
import { RouteParams } from '../../app'

const GjenapneSoknad = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const queryClient = useQueryClient()

    const [gjenapner, setGjenapner] = useState<boolean>(false)

    if (!valgtSoknad) return null

    const gjenapneSoknad = async () => {
        if (gjenapner) {
            return
        } else {
            setGjenapner(true)
        }

        logEvent('knapp klikket', {
            tekst: 'Jeg vil bruke denne søknaden likevel',
            soknadstype: valgtSoknad.soknadstype,
            component: 'Avbrutt søknad visning',
        })

        try {
            await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad.id}/gjenapne`,
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
                logger.warn(e)
            }
            return
        } finally {
            setGjenapner(false)
        }
    }

    return (
        <Button
            data-cy="bruk-soknad-likevel"
            variant="tertiary"
            className="px-0"
            loading={gjenapner}
            onClick={gjenapneSoknad}
        >
            Jeg vil bruke denne søknaden likevel
        </Button>
    )
}

export default GjenapneSoknad
