import { Loader } from '@navikt/ds-react'
import React, { useCallback, useEffect, useState } from 'react'

import IngenData from '../components/feil/ingen-data'
import { Soknad } from '../types/types'
import fetchMedRequestId from '../utils/fetch'
import { logger } from '../utils/logger'
import { redirectTilLoginHvis401 } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setSykmeldinger } = useAppStore()
    const [laster, setLaster] = useState<boolean>(false)
    const [soknaderFeilet, setSoknaderFeilet] = useState<boolean>(false)
    const [sykmeldingerFeilet, setSykmeldingerFeilet] = useState<boolean>(false)

    const hentSoknader = useCallback(async () => {
        let fetchResult
        const url = '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader'
        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
        }
        try {
            fetchResult = await fetchMedRequestId(url, options)
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
                `Feil ved kall til: ${options.method} ${url} med HTTP-kode: ${response.status} og x_request_id: ${fetchResult.requestId}.`
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
            logger.error(
                `${e} - Kall til: ${options.method} ${url} feilet HTTP-kode: ${response.status} ved parsing av JSON for x_request_id: ${fetchResult.requestId} med data: ${response.body}`
            )
            setSoknaderFeilet(true)
            return
        }
    }, [setSoknader])

    const hentSykmeldinger = useCallback(async () => {
        let fetchResult
        const url = '/syk/sykepengesoknad/api/sykmeldinger-backend/api/v2/sykmeldinger'
        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
        }
        try {
            fetchResult = await fetchMedRequestId(url, options)
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
                `Feil ved kall til: ${options.method} ${url} med HTTP-kode: ${response.status} og x_request_id: ${fetchResult.requestId}.`
            )
            setSykmeldingerFeilet(true)
            return
        }

        try {
            const data = await fetchResult.response.json()
            setSykmeldinger(data)
        } catch (e) {
            logger.error(
                `${e} - Kall til: ${options.method} ${url} feilet HTTP-kode: ${response.status} ved parsing av JSON for x_request_id: ${fetchResult.requestId} med data: ${response.body}`
            )
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
