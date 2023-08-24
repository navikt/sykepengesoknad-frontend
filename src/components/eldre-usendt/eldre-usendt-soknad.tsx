import React from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Soknad } from '../../types/types'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'

import { GuidepanelMedKnapp } from './guidepanel-med-knapp'

interface EldreUsendtSoknadProps {
    eldreSoknad: RSSoknadmetadata
    antall: number
}

export const EldreUsendtSoknad = ({ eldreSoknad, antall }: EldreUsendtSoknadProps) => {
    return (
        <GuidepanelMedKnapp
            heading={tekst('eldre.usendt.header')}
            innhold={getLedetekst(tekst('eldre.usendt.soknad.alert'), {
                '%ANTALL%': tallTilSpråk(antall),
                '%FLERTALL%': antall > 1 ? 'er' : '',
            })}
            url={urlTilSoknad(eldreSoknad)}
            knappeTekst={tekst('eldre.usendt.soknad.gaa-til')}
            komponent="eldre usendt søknad"
        />
    )
}

interface EldreUsendteSoknader {
    eldsteSoknad?: RSSoknadmetadata
    antall: number
}

export function harEldreUsendtSoknad(
    valgtSoknad: Soknad | undefined,
    soknader: RSSoknadmetadata[] | undefined,
): EldreUsendteSoknader {
    if (!valgtSoknad || !soknader) {
        return { antall: 0 }
    }
    if (!valgtSoknad.fom) {
        return { antall: 0 }
    }
    const eldreSoknader = soknader
        .filter((s) => s.status == RSSoknadstatus.NY || s.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING)
        .filter((s) => s.fom != null)
        .filter((s) => s.fom! < valgtSoknad.fom!)
        .sort((a, b) => a.fom!.getTime() - b.fom!.getTime())
        .filter((s) => s.id != valgtSoknad.id)

    return {
        antall: eldreSoknader.length,
        eldsteSoknad: eldreSoknader.find(() => true),
    }
}
