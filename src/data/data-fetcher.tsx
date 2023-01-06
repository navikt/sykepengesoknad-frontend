import { Loader } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useCallback, useEffect, useState } from 'react'

import IngenData from '../components/feil/ingen-data'
import { AuthenticationError, fetchJsonMedRequestId } from '../utils/fetch'

import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSykmeldinger } = useAppStore()
    const [laster, setLaster] = useState<boolean>(false)
    const [sykmeldingerFeilet, setSykmeldingerFeilet] = useState<boolean>(false)

    const hentSykmeldinger = useCallback(async () => {
        let data
        try {
            data = await fetchJsonMedRequestId('/syk/sykepengesoknad/api/sykmeldinger-backend/api/v2/sykmeldinger', {
                method: 'GET',
                credentials: 'include',
            })
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                setSykmeldingerFeilet(true)
                logger.warn(e)
            }
            return
        }

        setSykmeldinger(data)
    }, [setSykmeldinger])

    useEffect(() => {
        setLaster(true)
        hentSykmeldinger().catch((e: Error) => logger.warn(e))
        setLaster(false)
    }, [hentSykmeldinger])

    if (laster) {
        return (
            <div className="data-loader">
                {/* TODO: fjern onResize og onResizeCapture ved oppdatering til React 18. */}
                <Loader variant="neutral" size="2xlarge" onResize={undefined} onResizeCapture={undefined} />
            </div>
        )
    }

    if (sykmeldingerFeilet) {
        return <IngenData />
    }

    return props.children
}
