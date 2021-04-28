import AlertStripe from 'nav-frontend-alertstriper'
import React from 'react'
import { Link } from 'react-router-dom'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { Soknad } from '../../../types/types'
import { getUrlTilSoknad } from '../../../utils/url-utils'

interface EldreUsendtSoknadProps {
    eldreSoknad: Soknad;
}

export const EldreUsendtSoknad = ({ eldreSoknad }: EldreUsendtSoknadProps) => {

    return (
        <AlertStripe type={'info'}>
            OBS: Du har en eldre søknad som du må fylle ut først. <Link to={getUrlTilSoknad(eldreSoknad)}>
            Gå til den eldste søknaden
            </Link>
        </AlertStripe>
    )
}

export function harEldreUsendtSoknad(valgtSoknad: Soknad, soknader: Soknad[]): Soknad | undefined {
    if (!valgtSoknad.fom) {
        return undefined
    }
    return soknader
        .filter((s => s.status == RSSoknadstatus.NY || s.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING))
        .filter((s => s.fom != null))
        .filter((s => s.fom! < valgtSoknad.fom!))
        .sort((a, b) => a.fom!.getMilliseconds() - b.fom!.getMilliseconds())
        .find((s) => s.id != valgtSoknad.id)


}


