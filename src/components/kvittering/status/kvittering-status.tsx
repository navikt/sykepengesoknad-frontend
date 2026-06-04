import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import { format } from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

export enum Mottaker {
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

const KvitteringStatus = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const tilNavDato = () => {
        const datoNav = format(valgtSoknad!.sendtTilNAVDato!, "EEEE d. MMMM, 'kl' HH:mm", { locale: nb })
        return datoNav.charAt(0).toUpperCase() + datoNav.slice(1)
    }

    if (!valgtSoknad) return null

    return (
        <>
            {valgtSoknad.sendtTilNAVDato && (
                <Alert variant="success" data-cy="sendt-nav">
                    <Heading size="small" level="2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {Mottaker.NAV}
                    </Heading>
                    <BodyShort>
                        {tekst('kvittering.mottatt')}: {tilNavDato()}
                    </BodyShort>
                </Alert>
            )}
        </>
    )
}

export default KvitteringStatus
