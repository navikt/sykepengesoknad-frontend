import { Knapp } from 'nav-frontend-knapper'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

import useFetch from '../../data/rest/use-fetch'
import { FetchState, hasData } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Soknad } from '../../types/types'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { getUrlTilSoknad } from '../../utils/url-utils'


const Endreknapp = () => {
    const { valgtSoknad, soknader, setSoknader, setFeilmeldingTekst } = useAppStore()
    const korrigerSoknad = useFetch<RSSoknad>()
    const history = useHistory()
    const [ korrigerer, setKorrigerer ] = useState<boolean>(false)

    const korriger = () => {
        if (korrigerer) return
        setKorrigerer(true)
        korrigerSoknad.fetch(env.flexGatewayRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/korriger`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {
            if (hasData(fetchState)) {
                const soknad = new Soknad(fetchState.data)
                if (!soknader.find(sok => sok.id === soknad.id)) {
                    soknader.push(soknad)
                    setSoknader(soknader)
                }

                history.push(getUrlTilSoknad(soknad))
                setFeilmeldingTekst('')
            } else {
                logger.error('Feil ved opprettelse av UTKAST_TIL_KORRIGERING', fetchState)
                setFeilmeldingTekst(tekst('kvittering.korrigering.feilet'))
            }
            setKorrigerer(false)
        })
    }

    return <Knapp mini type="standard" spinner={korrigerer} onClick={korriger}>{tekst('kvittering.knapp.endre')}</Knapp>
}

export default Endreknapp
