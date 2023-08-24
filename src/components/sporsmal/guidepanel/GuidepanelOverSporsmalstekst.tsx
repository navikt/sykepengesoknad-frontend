import React from 'react'
import { BodyShort } from '@navikt/ds-react'

import { TagTyper } from '../../../types/enums'
import { fjernIndexFraTag } from '../sporsmal-utils'
import { tekst } from '../../../utils/tekster'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const GuidepanelOverSporsmalstekst = () => {
    const { sporsmal } = useSoknadMedDetaljer()
    if (!sporsmal) return null
    const bjornTekst = `soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`

    const bjornVeileder = (tag: TagTyper) => tag === TagTyper.FRAVER_FOR_BEHANDLING || tag === TagTyper.PERIODEUTLAND
    if (!bjornVeileder(sporsmal.tag)) return null

    return (
        <ProgressivtGuidePanel className="my-8">
            <BodyShort>{parserWithReplace(tekst(bjornTekst as any))}</BodyShort>
        </ProgressivtGuidePanel>
    )
}

export default GuidepanelOverSporsmalstekst
