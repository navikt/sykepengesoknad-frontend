// NewComponent.tsx
import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { EndringSNHjelpTekster } from './endring-sn-hjelp-tekst'

export const EndringSNHjelpBody = () => {
    return (
        <>
            <BodyShort>{EndringSNHjelpTekster.introduksjon}</BodyShort>
            <BodyShort as="ul">
                <BodyShort as="li">{EndringSNHjelpTekster.detalj1}</BodyShort>
                <BodyShort as="li">{EndringSNHjelpTekster.detalj2}</BodyShort>
                <BodyShort as="li">{EndringSNHjelpTekster.detalj3}</BodyShort>
            </BodyShort>
        </>
    )
}
