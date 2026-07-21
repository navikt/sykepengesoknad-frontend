import { format } from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import { BodyShort, Box, Label, VStack } from '@navikt/ds-react'
import React from 'react'

import { Soknad } from '../../types/types'

export const KjentOppholdstillatelse = ({ soknad }: { soknad: Soknad }) => {
    if (soknad.kjentOppholdstillatelse?.fom === null && soknad.kjentOppholdstillatelse?.tom === null) {
        return null
    }

    const fomDato = format(soknad.kjentOppholdstillatelse!.fom!, 'd. MMMM yyyy', { locale: nb })
    const tomDato = soknad.kjentOppholdstillatelse?.tom
        ? format(soknad.kjentOppholdstillatelse.tom, 'd. MMMM yyyy', { locale: nb })
        : null

    const tittel = tomDato === null ? `Permanent oppholdstillatelse` : `Midlertidig oppholdstillatelse`
    const periode = tomDato === null ? `Fra ${fomDato}.` : `Fra ${fomDato} til ${tomDato}.`

    return (
        <>
            <VStack gap="space-16" marginBlock="space-16">
                <Label as="p">Vi har mottatt denne oppholdstillatelsen fra Utlendingsdirektoratet:</Label>
                <Box background="info-soft" borderRadius="4" padding="space-12">
                    <VStack gap="space-8">
                        <Label as="p">{tittel}</Label>
                        <BodyShort>{periode}</BodyShort>
                    </VStack>
                </Box>
            </VStack>
        </>
    )
}
