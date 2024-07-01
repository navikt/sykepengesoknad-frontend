import React from 'react'
import { BodyShort } from '@navikt/ds-react'

import { tekst } from '../../../utils/tekster'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const GuidepanelOverSporsmalstekst = () => {
    const { sporsmal } = useSoknadMedDetaljer()
    if (!sporsmal) return null
    const bjornTekst = `soknad.bjorn.${sporsmal.tag.toLowerCase()}`

    const bjornVeileder = (tag: string) => tag === 'FRAVER_FOR_BEHANDLING' || tag === 'PERIODEUTLAND'
    if (!bjornVeileder(sporsmal.tag)) return null

    return (
        <ProgressivtGuidePanel className="my-8">
            <BodyShort>{tekstMedHtml(tekst(bjornTekst as any))}</BodyShort>
        </ProgressivtGuidePanel>
    )
}

export default GuidepanelOverSporsmalstekst
