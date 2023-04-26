import { BodyLong, BodyShort } from '@navikt/ds-react'
import React from 'react'

export const KvitteringerBody = () => {
    return (
        <>
            <BodyLong>Du må laste opp kvitteringer hvis du har hatt ekstra utgifter til:</BodyLong>
            <ul>
                <BodyShort as="li">taxi</BodyShort>
                <BodyShort as="li">offentlig transport</BodyShort>
                <BodyShort as="li">parkering</BodyShort>
            </ul>
            <BodyLong className={'mt-4'}>
                Kvitteringene må kunne leses av en saksbehandler. Det tryggeste er å laste opp én kvittering om gangen.
            </BodyLong>
        </>
    )
}
