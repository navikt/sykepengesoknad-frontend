import { logger } from '@navikt/next-logger'
import * as H from 'history'
import React from 'react'
import { QueryClient } from '@tanstack/react-query'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import fetchMedRequestId, { AuthenticationError } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'

interface AvbrytSoknadRequest {
    valgtSoknad: Soknad
    soknader: RSSoknadmetadata[]
    queryClient: QueryClient
    history: H.History
    setFeilmeldingTekst: React.Dispatch<React.SetStateAction<string>>
}

export async function avbrytSoknad({
    valgtSoknad,
    soknader,
    queryClient,
    history,
    setFeilmeldingTekst,
}: AvbrytSoknadRequest) {
    try {
        await fetchMedRequestId(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad.id}/avbryt`,
            {
                method: 'POST',
                credentials: 'include',
            },
        )
    } catch (e: any) {
        if (!(e instanceof AuthenticationError)) {
            setFeilmeldingTekst(tekst('avbryt.feilet'))
            logger.warn(e)
        }
        return
    } finally {
        setFeilmeldingTekst('')
    }

    if (
        valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ||
        valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
    ) {
        const nyeSoknader = soknader.filter((s) => s.id !== valgtSoknad.id)
        queryClient.removeQueries(['soknad', valgtSoknad.id])
        queryClient.setQueriesData(['soknader'], nyeSoknader)

        history.push('/')
    } else {
        const nySoknad = {
            ...valgtSoknad,
            status: RSSoknadstatus.AVBRUTT,
            avbruttDato: new Date(),
        }
        const nyeSoknader = soknader.map((s) => (s.id === valgtSoknad!.id ? new RSSoknadmetadata(nySoknad) : s))
        queryClient.setQueriesData(['soknad', valgtSoknad.id], nySoknad)
        queryClient.setQueriesData(['soknader'], nyeSoknader)

        history.push(urlTilSoknad(nySoknad))
    }
}
