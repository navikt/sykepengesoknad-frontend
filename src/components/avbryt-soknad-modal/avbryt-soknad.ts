import * as H from 'history'
import React from 'react'

import { redirectTilLoginHvis401 } from '../../data/rest/utils'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import fetchMedRequestId from '../../utils/fetch'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'

interface AvbrytSoknadReq {
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
}: AvbrytSoknadReq) {
    let fetchResult
    const url = `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/avbryt`
    const options: RequestInit = {
        method: 'POST',
        credentials: 'include',
    }
    try {
        fetchResult = await fetchMedRequestId(url, options)
    } catch (e) {
        setFeilmeldingTekst(tekst('avbryt.feilet'))
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
        // TODO: Vis feilmeldingen til bruker.
        setFeilmeldingTekst(tekst('avbryt.feilet'))
        return
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

    setFeilmeldingTekst('')
}
