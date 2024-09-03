import dayjs from 'dayjs'
import { BodyShort, Box, Label, VStack } from '@navikt/ds-react'
import React from 'react'

import { Soknad } from '../../types/types'

export const KjentOppholdstillatelse = ({ soknad }: { soknad: Soknad }) => {
    if (soknad.kjentOppholdstillatelse?.fom === null && soknad.kjentOppholdstillatelse?.tom === null) {
        return null
    }

    const fomDato = dayjs(soknad.kjentOppholdstillatelse?.fom).format('D. MMMM YYYY')
    const tomDato = soknad.kjentOppholdstillatelse?.tom
        ? dayjs(soknad.kjentOppholdstillatelse?.tom).format('D. MMMM YYYY')
        : null

    const tittel = tomDato === null ? `Permanent oppholdstillatelse` : `Midlertidig oppholdstillatelse`
    const periode = tomDato === null ? `Fra ${fomDato}.` : `Fra ${fomDato} til ${tomDato}.`

    return (
        <>
            <VStack gap="4" marginBlock="4">
                <Label as="p">Vi har mottatt denne oppholdstillatelsen fra Utlendingsdirektoratet:</Label>
                <Box background="surface-info-subtle" borderRadius="medium" padding="3">
                    <VStack gap="2">
                        <Label as="p">{tittel}</Label>
                        <BodyShort>{periode}</BodyShort>
                    </VStack>
                </Box>
            </VStack>
        </>
    )
}
