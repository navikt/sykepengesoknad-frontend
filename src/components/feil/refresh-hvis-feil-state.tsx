import { Button, InfoCard, VStack } from '@navikt/ds-react'
import React from 'react'
import { XMarkOctagonIcon } from '@navikt/aksel-icons'

import { tekst } from '../../utils/tekster'
import { InfoCardHeader, InfoCardTitle } from '@navikt/ds-react/InfoCard'

interface FeilStateProps {
    feilmelding?: number
}
export function FeilStateView({ feilmelding }: FeilStateProps) {
    const visReload = feilmelding ? ![404, 403].includes(feilmelding) : true

    return (
        <div aria-live="polite" className="mt-4 my-4">
            <InfoCard data-color="danger">
                <InfoCardHeader icon={<XMarkOctagonIcon title="a11y-title" fontSize="1.5rem" />}>
                    <InfoCardTitle className="mb-3">
                        <VStack align="start">
                            {tekst('feilstate.tittel')}
                            <Button
                                className="mt-4 bg-ax-bg-default"
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
                        </VStack>
                    </InfoCardTitle>
                </InfoCardHeader>
            </InfoCard>
        </div>
    )
}
