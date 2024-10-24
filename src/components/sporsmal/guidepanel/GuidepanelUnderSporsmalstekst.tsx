import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { tekstMedHtml } from '../../../utils/html-react-parser-utils'

const GuidepanelUnderSporsmalstekst = ({ sporsmal }: SpmProps) => {
    const bjornTekst = `soknad.bjorn.${sporsmal.tag.toLowerCase()}`

    const bjornVeileder = (tag: string) => tag === 'ENKELTSTAENDE_BEHANDLINGSDAGER'

    return (
        <>
            {bjornVeileder(sporsmal.tag) && (
                <ProgressivtGuidePanel className="my-8">
                    <BodyShort>{tekstMedHtml(tekst(bjornTekst as any))}</BodyShort>
                </ProgressivtGuidePanel>
            )}
        </>
    )
}

export default GuidepanelUnderSporsmalstekst
