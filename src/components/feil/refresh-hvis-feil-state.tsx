import { Button, Heading, VStack } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import NyAlertGammeltDesign, { Funksjon } from '../generelle-komponenter/NyAlertGammeltDesign'

interface FeilStateProps {
    feilmelding?: number
}
export function FeilStateView({ feilmelding }: FeilStateProps) {
    const visReload = feilmelding ? ![404, 403].includes(feilmelding) : true

    return (
        <div aria-live="polite" className="mt-4 my-4">
            <NyAlertGammeltDesign
                funksjon={Funksjon.danger}
                info={
                    <>
                        <VStack align="start">
                            <Heading level="1" size="small">
                                {tekst('feilstate.tittel')}
                            </Heading>
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
                    </>
                }
            />
        </div>
    )
}
