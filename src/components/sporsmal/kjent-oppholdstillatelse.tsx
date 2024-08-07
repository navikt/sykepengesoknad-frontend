import dayjs from 'dayjs'
import { BodyShort, Label } from '@navikt/ds-react'
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
            <Label as="p" className="mb-4">
                Vi har mottatt denne oppholdstillatelsen fra Utlendingsdirektoratet:
            </Label>
            <InfoBoks>
                <Label as="p" className="mb-1">
                    {tittel}
                </Label>
                <BodyShort>{periode}</BodyShort>
            </InfoBoks>
        </>
    )
}

const InfoBoks = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-6 p-3 rounded bg-surface-info-subtle">{children}</p>
)
