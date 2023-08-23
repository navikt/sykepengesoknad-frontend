import { BodyShort } from '@navikt/ds-react'
import React from 'react'

export const KvitteringerHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Du må laste opp kvitteringer, faktura eller annen dokumentasjon hvis du har hatt ekstra utgifter til:
            </BodyShort>
            <ul>
                <BodyShort as="li">taxi</BodyShort>
                <BodyShort as="li">offentlig transport</BodyShort>
                <BodyShort spacing as="li">
                    parkering
                </BodyShort>
            </ul>
            <BodyShort>
                Kvitteringene må kunne leses av en saksbehandler. Det tryggeste er å laste opp én kvittering om gangen.
            </BodyShort>
        </>
    )
}
