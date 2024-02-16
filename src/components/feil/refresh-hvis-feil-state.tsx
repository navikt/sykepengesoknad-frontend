import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'

export function FeilStateView() {
    return (
        <div aria-live="polite">
            <Alert variant="error" className="mt-4">
                <Heading level="1" size="small">
                    {tekst('feilstate.tittel')}
                </Heading>
                <BodyShort>{tekst('feilstate.alert')}</BodyShort>
                <Button
                    className="mt-4 bg-white"
                    variant="secondary"
                    type="button"
                    size="small"
                    onClick={() => window.location.reload()}
                >
                    {tekst('feilstate.refresh')}
                </Button>
                <br />
                <Button
                    className="mt-4 bg-white"
                    variant="secondary"
                    type="button"
                    size="small"
                    onClick={() => (window.location.href = '/syk/sykepengesoknad')}
                >
                    {tekst('feilstate.tilbake')}
                </Button>
            </Alert>
        </div>
    )
}
