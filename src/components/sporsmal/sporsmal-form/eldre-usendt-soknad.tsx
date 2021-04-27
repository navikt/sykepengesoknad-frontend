import './eldre-usendt-soknad.less'

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
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
        <div className="eldre_usendt">
            <AlertStripeAdvarsel>
                Du har en eldre usendt søknad som må fylles ut før du fyller ut denne
            </AlertStripeAdvarsel>

            <div className="knapperad">
                <Link to={getUrlTilSoknad(eldreSoknad)}>

                    <Knapp type="hoved">Gå til eldre søknad</Knapp>
                </Link>

            </div>
        </div>
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


