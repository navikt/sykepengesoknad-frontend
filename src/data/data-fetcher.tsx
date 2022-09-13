import { Loader } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useCallback, useEffect, useState } from 'react'

import IngenData from '../components/feil/ingen-data'
import { Soknad } from '../types/types'
import { AuthenticationError, fetchJsonMedRequestId } from '../utils/fetch'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setSykmeldinger } = useAppStore()
    const [laster, setLaster] = useState<boolean>(false)
    const [soknaderFeilet, setSoknaderFeilet] = useState<boolean>(false)
    const [sykmeldingerFeilet, setSykmeldingerFeilet] = useState<boolean>(false)

    const hentSoknader = useCallback(async () => {
        let data
        try {
            data = await fetchJsonMedRequestId('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader', {
                method: 'GET',
                credentials: 'include',
            })
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                setSoknaderFeilet(true)
                logger.error(e)
            }
            return
        }

        setSoknader(
            data!.map((s: any) => {
                return new Soknad(s)
            })
        )
    }, [setSoknader])

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
                logger.error(e)
            }
            return
        }

        setSykmeldinger(data)
    }, [setSykmeldinger])

    useEffect(() => {
        setLaster(true)
        hentSoknader().catch((e: Error) => logger.error(e))
        hentSykmeldinger().catch((e: Error) => logger.error(e))
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
