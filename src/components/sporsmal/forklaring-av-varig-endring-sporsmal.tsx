import { BodyShort, List } from '@navikt/ds-react'
import React from 'react'

export const ForklaringAvVarigEndringSporsmal = () => {
    return (
        <List
            as="ul"
            size="small"
            className="[&>ul>li]:ml-4"
            description="Varig endring av arbeidssituasjon eller virksomhet kan være at:"
        >
            <List.Item>
                <BodyShort>tidligere virksomhet er lagt ned</BodyShort>
            </List.Item>
            <List.Item>
                <BodyShort>det har vært en omlegging av virksomheten</BodyShort>
            </List.Item>
            <List.Item>
                <BodyShort>den næringsdrivende har økt eller redusert arbeidsinnsatsen</BodyShort>
            </List.Item>
        </List>
    )
}
