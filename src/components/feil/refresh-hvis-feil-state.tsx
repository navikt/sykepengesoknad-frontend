import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'

export function FeilStateView() {
    return (
        <div className="bg-white">
            <div aria-live="polite">
                <Alert variant="error">
                    <Heading level="1" size="small">
                        {tekst('feilstate.tittel')}
                    </Heading>
                    <BodyShort>{tekst('feilstate.alert')}</BodyShort>
                </Alert>
            </div>
            <div className="flex justify-center">
                <Button
                    className="mt-4"
                    variant="secondary"
                    onClick={() => (window.location.href = '/syk/sykepengesoknad')}
                >
                    {tekst('feilstate.refresh')}
                </Button>
            </div>
        </div>
    )
}
