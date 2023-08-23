import { BodyShort, List } from '@navikt/ds-react'
import React from 'react'

export const ForklaringAvVarigEndringSporsmal = () => {
    return (
        <BodyShort>
            Varig endring av arbeidssituasjon eller virksomhet kan være at:
            <List as="ul" size="small" className="ml-4">
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
        </BodyShort>
    )
}
