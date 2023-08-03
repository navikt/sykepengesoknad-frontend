import { BodyShort } from '@navikt/ds-react'
import React from 'react'

export const EndringSNHjelpBody = () => {
    return (
        <>
            <BodyShort>Endring av arbeidssituasjon eller virksomhet kan handle om at:</BodyShort>
            <BodyShort as="ul" className="mt-4">
                <BodyShort as="li">Tidligere virksomhet er lagt ned</BodyShort>
                <BodyShort as="li">Det har vært en omlegging av virksomheten</BodyShort>
                <BodyShort as="li">Den næringsdrivende har økt eller redusert arbeidsinnsatsen</BodyShort>
            </BodyShort>
        </>
    )
}
