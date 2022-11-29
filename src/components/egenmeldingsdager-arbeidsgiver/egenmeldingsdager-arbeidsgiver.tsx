import React from 'react'
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react'

import { tekst } from '../../utils/tekster'

const EgenmeldingsdagerArbeidsgiver = () => {
    return (
        <GuidePanel style={{ margin: '1rem 0' }}>
            <Heading level="2" size="small" spacing>
                {tekst('egenmeldingsdager.guidepanel.tittel')}
            </Heading>
            <BodyShort>{tekst('egenmeldingsdager.guidepanel.innhold')}</BodyShort>
        </GuidePanel>
    )
}

export default EgenmeldingsdagerArbeidsgiver
