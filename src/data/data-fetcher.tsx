import { Loader } from '@navikt/ds-react'
import React, { useCallback, useEffect, useState } from 'react'

import IngenData from '../components/feil/ingen-data'
import { Soknad } from '../types/types'
import { FetchError, fetchJsonMedRequestId } from '../utils/fetch'
import { logger } from '../utils/logger'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setSykmeldinger } = useAppStore()
    const [laster, setLaster] = useState<boolean>(false)
    const [soknaderFeilet, setSoknaderFeilet] = useState<boolean>(false)
    const [sykmeldingerFeilet, setSykmeldingerFeilet] = useState<boolean>(false)

    const hentSoknader = useCallback(async () => {
        let data
        try {
            data = await fetchJsonMedRequestId(
                '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader',
                {
                    method: 'GET',
                    credentials: 'include',
                },
                () => {
                    setSoknaderFeilet(true)
                }
            )
        } catch (e: any) {
            if (e instanceof FetchError) {
                logger.error(e.message)
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
            data = await fetchJsonMedRequestId(
                '/syk/sykepengesoknad/api/sykmeldinger-backend/api/v2/sykmeldinger',
                {
                    method: 'GET',
                    credentials: 'include',
                },
                () => {
                    setSykmeldingerFeilet(true)
                }
            )
        } catch (e: any) {
            if (e instanceof FetchError) {
                logger.error(e.message)
            }
            return
        }

        setSykmeldinger(data)
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
