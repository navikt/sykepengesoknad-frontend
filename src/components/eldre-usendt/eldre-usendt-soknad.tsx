import React from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Soknad } from '../../types/types'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'
import { AlertMedKnapp } from '../alert-med-knapp/alert-med-knapp'
import { urlTilSoknad } from '../soknad/soknad-link'

interface EldreUsendtSoknadProps {
    eldreSoknad: Soknad
    antall: number
}

export const EldreUsendtSoknad = ({
    eldreSoknad,
    antall,
}: EldreUsendtSoknadProps) => {
    return (
        <AlertMedKnapp
            heading={tekst('eldre.usendt.header')}
            innhold={getLedetekst(tekst('eldre.usendt.soknad.alert'), {
                '%ANTALL%': tallTilSpråk(antall),
                '%FLERTALL%': antall > 1 ? 'er' : '',
            })}
            url={urlTilSoknad(eldreSoknad)}
            knappeTekst={tekst('eldre.usendt.soknad.gaa-til')}
            komponent="usendt sykmelding"
        />
    )
}

interface EldreUsendteSoknader {
    eldsteSoknad?: Soknad
    antall: number
}

export function harEldreUsendtSoknad(
    valgtSoknad: Soknad,
    soknader: Soknad[]
): EldreUsendteSoknader {
    if (!valgtSoknad.fom) {
        return { antall: 0 }
    }
    const eldreSoknader = soknader
        .filter(
            (s) =>
                s.status == RSSoknadstatus.NY ||
                s.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING
        )
        .filter((s) => s.fom != null)
        .filter((s) => s.fom! < valgtSoknad.fom!)
        .sort((a, b) => a.fom!.getMilliseconds() - b.fom!.getMilliseconds())
        .filter((s) => s.id != valgtSoknad.id)

    return {
        antall: eldreSoknader.length,
        eldsteSoknad: eldreSoknader.find(() => true),
    }
}
