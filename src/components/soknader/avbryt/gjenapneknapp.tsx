import { Button } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { RouteParams } from '../../../app'
import { redirectTilLoginHvis401 } from '../../../data/rest/utils'
import { useAppStore } from '../../../data/stores/app-store'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import fetchMedRequestId from '../../../utils/fetch'
import { logger } from '../../../utils/logger'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import styles from './gjenapneknapp.module.css'

const GjenapneSoknad = () => {
    const { valgtSoknad, setValgtSoknad, setValgtSykmelding, sykmeldinger, soknader, setSoknader } = useAppStore()
    const history = useHistory()
    const { id } = useParams<RouteParams>()
    const [gjenapner, setGjenapner] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    useEffect(() => {
        if (!valgtSoknad) {
            const filtrertSoknad = soknader.find((soknad) => soknad.id === id)
            setValgtSoknad(filtrertSoknad)
            const sykmelding = sykmeldinger.find((sm) => sm.id === filtrertSoknad?.sykmeldingId)
            setValgtSykmelding(sykmelding)
        }
        // eslint-disable-next-line
    }, [])

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

        let fetchResult
        const url = `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/gjenapne`
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            fetchResult = await fetchMedRequestId(url, options)
        } catch (e) {
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
            return
        }

        valgtSoknad!.status = RSSoknadstatus.NY
        valgtSoknad!.avbruttDato = undefined
        setValgtSoknad(valgtSoknad)
        soknader[soknader.findIndex((sok) => sok.id === valgtSoknad!.id)] = valgtSoknad!
        setSoknader(soknader)
        history.push(`/soknader/${valgtSoknad!.id}/1`)

        setGjenapner(false)
    }

    return (
        <div className={styles.knapperad}>
            <Button variant="tertiary" className={styles.knappen} loading={gjenapner} onClick={gjenapneSoknad}>
                Jeg vil bruke denne søknaden likevel
            </Button>
        </div>
    )
}

export default GjenapneSoknad
