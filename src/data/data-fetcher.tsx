import { Loader } from '@navikt/ds-react'
import React, { useCallback, useEffect, useState } from 'react'

import IngenData from '../components/feil/ingen-data'
import { Soknad } from '../types/types'
import fetchMedRequestId from '../utils/fetch'
import { logger } from '../utils/logger'
import { redirectTilLoginHvis401 } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setSykmeldinger, soknader, sykmeldinger } = useAppStore()
    const [laster, setLaster] = useState<boolean>(false)
    const [soknaderFeilet, setSoknaderFeilet] = useState<boolean>(false)
    const [sykmeldingerFeilet, setSykmeldingerFeilet] = useState<boolean>(false)

    const hentSoknader = useCallback(async () => {
        let fetchResult

        try {
            fetchResult = await fetchMedRequestId('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader', {
                credentials: 'include',
            })
        } catch (e) {
            setSoknaderFeilet(true)
            return
        }

        const response = fetchResult.response
        if (redirectTilLoginHvis401(response)) {
            return
        }

        if (!response.ok) {
            logger.error(
                `Feil ved henting av sykepengesoknader med feilkode ${response.status} og x_request_id ${fetchResult.requestId}.`,
                response
            )
            setSoknaderFeilet(true)
            return
        }

        try {
            const data = await fetchResult.response.json()
            setSoknader(
                data!.map((s: any) => {
                    return new Soknad(s)
                })
            )
        } catch (e) {
            logger.error(`Feilet ved parsing av JSON for x_request_id ${fetchResult.requestId}.`, e)
            setSoknaderFeilet(true)
            return
        }
    }, [setSoknader])

    const hentSykmeldinger = useCallback(async () => {
        let fetchResult
        try {
            fetchResult = await fetchMedRequestId('/syk/sykepengesoknad/api/sykmeldinger-backend/api/v2/sykmeldinger', {
                credentials: 'include',
            })
        } catch (e) {
            setSykmeldingerFeilet(true)
            return
        }

        const response = fetchResult.response
        if (redirectTilLoginHvis401(response)) {
            return
        }

        if (!response.ok) {
            logger.error(
                `Feil ved henting av sykmeldinger med feilkode ${response.status} og x_request_id ${fetchResult.requestId}.`,
                response
            )
            setSykmeldingerFeilet(true)
            return
        }

        try {
            const data = await fetchResult.response.json()
            setSykmeldinger(data)
        } catch (e) {
            logger.error(`Feilet ved parsing av JSON for x_request_id ${fetchResult.requestId}.`, e)
            setSykmeldingerFeilet(true)
            return
        }
    }, [setSykmeldinger])

    useEffect(() => {
        setLaster(true)
        hentSoknader().catch((e: Error) => logger.error(e.message))
        hentSykmeldinger().catch((e: Error) => logger.error(e.message))
        setLaster(false)
    }, [hentSoknader, hentSykmeldinger])

    if (laster) {
        return (
            <div className="data-loader">
                <Loader variant="neutral" size="2xlarge" />
            </div>
        )
    }

    if (soknaderFeilet || sykmeldingerFeilet) {
        return <IngenData />
    }

    return props.children
}
