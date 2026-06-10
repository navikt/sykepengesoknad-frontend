import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { tilLesbarDatoOgTid } from '../../../utils/dato-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

export enum Mottaker {
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

const KvitteringStatus = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    return (
        <>
            {valgtSoknad.sendtTilNAVDato && (
                <Alert variant="success" data-cy="sendt-nav">
                    <Heading size="small" level="2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {Mottaker.NAV}
                    </Heading>
                    <BodyShort>
                        {tekst('kvittering.mottatt')}: {tilLesbarDatoOgTid(valgtSoknad.sendtTilNAVDato)}
                    </BodyShort>
                </Alert>
            )}
        </>
    )
}

export default KvitteringStatus
