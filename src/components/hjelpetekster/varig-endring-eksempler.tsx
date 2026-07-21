import { Box, Heading, List } from '@navikt/ds-react'
import React from 'react'

export function VarigEndringEksempler() {
    return (
        <>
            <Box padding="space-16" borderRadius="4" background="neutral-soft" className="mb-4">
                <Heading as="h3" size="small">
                    Eksempler på varig endring:
                </Heading>
                <Box marginBlock="space-16" asChild>
                    <List size="medium">
                        <List.Item>Opprettelse eller nedleggelse av næringsvirksomhet</List.Item>
                        <List.Item>
                            Avsluttet eller startet andre arbeidsforhold ved siden av virksomheten og dermed har økt
                            eller redusert kapasiteten i din virksomhet
                        </List.Item>
                        <List.Item>Omlegging av virksomheten</List.Item>
                        <List.Item>Endret markedssituasjon</List.Item>
                    </List>
                </Box>
            </Box>
        </>
    )
}
