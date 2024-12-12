import { Box, List } from '@navikt/ds-react'
import React from 'react'

export function VarigEndringEksempler() {
    return (
        <>
            <Box padding="4" borderRadius="medium" background="bg-subtle" className="mb-4">
                <List size="medium" title="Eksempler på varig endring:">
                    <List.Item>Opprettelse eller nedleggelse av næringsvirksomhet</List.Item>
                    <List.Item>
                        Avsluttet eller startet andre arbeidsforhold ved siden av virksomheten og dermed har økt eller
                        redusert kapasiteten i din virksomhet
                    </List.Item>
                    <List.Item>Omlegging av virksomheten</List.Item>
                    <List.Item>Endret markedssituasjon</List.Item>
                </List>
            </Box>
        </>
    )
}
