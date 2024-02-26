import { BodyLong, GuidePanel, Label } from '@navikt/ds-react'
import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

export const Over70Aar = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) {
        return null
    }

    const style = {
        '--ac-guide-panel-border': 'var(--a-orange-400)',
        '--ac-guide-panel-illustration-bg': 'var(--a-orange-200)',
    } as React.CSSProperties
    return (
        <GuidePanel poster style={style}>
            <Label as="h2" spacing>
                Viktig informasjon
            </Label>
            <BodyLong spacing>Når du har passert 70 år, har du ikke lenger rett til sykepenger.</BodyLong>
            <BodyLong spacing>
                Hvis du ikke skal søke om sykepenger, kan du avbryte søknaden. Hvis du likevel ønsker å søke, kan vi
                ikke hindre deg i dette.
            </BodyLong>
        </GuidePanel>
    )
}
