import { logger } from '@navikt/next-logger'
import * as H from 'history'
import React from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import fetchMedRequestId, { FetchError } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'

interface AvbrytSoknadRequest {
    valgtSoknad: Soknad
    setSoknader: React.Dispatch<React.SetStateAction<Soknad[]>>
    soknader: Soknad[]
    setValgtSoknad: React.Dispatch<React.SetStateAction<Soknad | undefined>>
    history: H.History
    setFeilmeldingTekst: React.Dispatch<React.SetStateAction<string>>
}

export async function avbrytSoknad({
    valgtSoknad,
    setSoknader,
    soknader,
    setValgtSoknad,
    history,
    setFeilmeldingTekst,
}: AvbrytSoknadRequest) {
    try {
        await fetchMedRequestId(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/avbryt`,
            {
                method: 'POST',
                credentials: 'include',
            }
        )
    } catch (e: any) {
        if (e instanceof FetchError) {
            setFeilmeldingTekst(tekst('avbryt.feilet'))
            logger.error(e)
        }
        return
    } finally {
        setFeilmeldingTekst('')
    }

    if (
        valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ||
        valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
    ) {
        setSoknader(soknader.filter((s) => s.id !== valgtSoknad.id))
        setValgtSoknad(undefined)
        history.push('/')
    } else {
        const nySoknad = {
            ...valgtSoknad,
            status: RSSoknadstatus.AVBRUTT,
            avbruttDato: new Date(),
        }
        setSoknader(soknader.map((s) => (s.id === valgtSoknad!.id ? nySoknad : s)) as any)
        setValgtSoknad(nySoknad)
        history.push(urlTilSoknad(nySoknad))
    }
}
