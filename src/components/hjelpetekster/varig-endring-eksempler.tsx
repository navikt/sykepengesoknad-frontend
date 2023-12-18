import { Label, List } from '@navikt/ds-react'
import React from 'react'

export function VarigEndringEksempler() {
    return (
        <>
            <Label className="mt-8" as="p">
                Eksempler på varig endring:
            </Label>

            <List size="medium">
                <List.Item>Opprettelse eller nedleggelse av næringsvirksomhet</List.Item>
                <List.Item>Økt eller redusert innsats</List.Item>
                <List.Item>Omlegging av virksomheten</List.Item>
                <List.Item>Endret markedssituasjon</List.Item>
            </List>
        </>
    )
}
