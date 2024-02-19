import { Alert, Button, Heading } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'

interface FeilStateProps {
    feilmelding?: number
}
export function FeilStateView({ feilmelding }: FeilStateProps) {
    const visReload = feilmelding !== 404
    return (
        <div aria-live="polite">
            <Alert variant="error" className="mt-4">
                <Heading level="1" size="small">
                    {tekst('feilstate.tittel')}
                </Heading>
                <Button
                    className="mt-4 bg-white"
                    variant="secondary"
                    type="button"
                    size="small"
                    onClick={() => {
                        if (visReload) {
                            window.location.reload()
                        } else {
                            window.location.href = '/syk/sykepengesoknad'
                        }
                    }}
                >
                    {visReload ? tekst('feilstate.refresh') : tekst('feilstate.tilbake')}
                </Button>
            </Alert>
        </div>
    )
}
