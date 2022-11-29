import React from 'react'
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react'

const EgenmeldingsdagerArbeidsgiver = () => {
    return (
        <GuidePanel style={{ margin: '1rem 0' }}>
            <Heading level="2" size="small" spacing>
                {'Du må søke om sykepenger'}
            </Heading>
            <BodyShort>
                {
                    'Arbeidsgiveren utbetaler vanligvis sykepenger i arbeidsgiverperioden (16 første dagene). Siden sykefraværet ditt er på mer enn 16 dager må du søke om sykepenger.'
                }
            </BodyShort>
        </GuidePanel>
    )
}

export default EgenmeldingsdagerArbeidsgiver
