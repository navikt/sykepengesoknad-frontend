import React from 'react'
import { BodyShort, Label } from '@navikt/ds-react'

import { Soknad } from '../../types/types'
import { tekst } from '../../utils/tekster'

interface SykmeldingOverlappProps {
    valgtSoknad: Soknad
}

const SykmeldingOverlapp = ({ valgtSoknad }: SykmeldingOverlappProps) => {
    if (!valgtSoknad.klippet) {
        return null
    }

    return (
        <>
            <Label size="small" as="h3" className="mt-4">
                {tekst('sykmelding.overlapp.tittel')}
            </Label>
            <BodyShort>{tekst('sykmelding.overlapp.info')}</BodyShort>
        </>
    )
}

export default SykmeldingOverlapp
