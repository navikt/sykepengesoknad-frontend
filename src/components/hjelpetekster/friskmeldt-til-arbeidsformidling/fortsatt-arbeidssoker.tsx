import { Alert, BodyLong } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../../types/types'

export function FortsattArbeidssoker({ sporsmal, fieldValue }: { sporsmal: Sporsmal; fieldValue: any }) {
    if (
        (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_NY_JOBB' ||
            sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER') &&
        fieldValue === 'JA'
    ) {
        return (
            <Alert variant="info" className="mt-4">
                Du har svart at du fortsatt vil være registrert som arbeidssøker hos Nav lenger. Da vil du være
                friskmeldt til arbeidsformidling i neste periode, altså [22. april - 5. mai 2024].
            </Alert>
        )
    }
    if (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_NY_JOBB' && fieldValue === 'NEI') {
        return <IkkeLengreArbeidssøker variant="info" />
    }
    if (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER' && fieldValue === 'NEI') {
        return <IkkeLengreArbeidssøker variant="warning" />
    }
    return null
}

function IkkeLengreArbeidssøker({ variant }: { variant: 'warning' | 'info' }) {
    return (
        <Alert variant={variant} className="mt-4">
            <BodyLong spacing>
                Du har svart at du har begynt i ny jobb og dermed ikke vil være registrert som arbeidssøker hos Nav
                lenger.
            </BodyLong>
            <BodyLong>
                Det betyr at du ikke vil være friskmeldt til arbeidsformidling fra og med [FOM ny jobb]. Da stanser vi
                sykepengene dine fra og med denne datoen, og fjerner deg fra arbeidssøkerregisteret vårt.
            </BodyLong>
        </Alert>
    )
}
