import { Button } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { RouteParams } from '../../../app'
import { redirectTilLoginHvis401 } from '../../../data/rest/utils'
import { useAppStore } from '../../../data/stores/app-store'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { logger } from '../../../utils/logger'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import styles from './gjenapneknapp.module.css'

const GjenapneSoknad = () => {
    const {
        valgtSoknad,
        setValgtSoknad,
        setValgtSykmelding,
        sykmeldinger,
        soknader,
        setSoknader,
    } = useAppStore()
    const history = useHistory()
    const { id } = useParams<RouteParams>()
    const [gjenapner, setGjenapner] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    useEffect(() => {
        if (!valgtSoknad) {
            const filtrertSoknad = soknader.find((soknad) => soknad.id === id)
            setValgtSoknad(filtrertSoknad)
            const sykmelding = sykmeldinger.find(
                (sm) => sm.id === filtrertSoknad?.sykmeldingId
            )
            setValgtSykmelding(sykmelding)
        }
        // eslint-disable-next-line
    }, [])

    const gjenapneSoknad = async () => {
        if (gjenapner) return
        setGjenapner(true)
        try {
            const res = await fetch(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                    valgtSoknad!.id
                }/gjenapne`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            logEvent('knapp klikket', {
                tekst: 'Jeg vil bruke denne søknaden likevel',
                soknadstype: valgtSoknad?.soknadstype,
                component: 'Avbrutt søknad visning',
            })

            try {
                const httpCode = res.status
                if (redirectTilLoginHvis401(res)) {
                    return
                } else if ([200, 201, 203, 206].includes(httpCode)) {
                    valgtSoknad!.status = RSSoknadstatus.NY
                    valgtSoknad!.avbruttDato = undefined
                    setValgtSoknad(valgtSoknad)
                    soknader[
                        soknader.findIndex((sok) => sok.id === valgtSoknad!.id)
                    ] = valgtSoknad!
                    setSoknader(soknader)
                    history.push(`/soknader/${valgtSoknad!.id}/1`)
                } else {
                    logger.error('Feil ved gjenåpning av søknad', res)
                }
            } catch (e) {
                logger.error('Feil ved gjenåpning av søknad', e)
            }
        } finally {
            setGjenapner(false)
        }
    }

    return (
        <div className={styles.knapperad}>
            <Button
                variant="tertiary"
                className={styles.knappen}
                loading={gjenapner}
                onClick={gjenapneSoknad}
            >
                Jeg vil bruke denne søknaden likevel
            </Button>
        </div>
    )
}

export default GjenapneSoknad
