import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

import { Sykmelding } from '../../types/sykmelding'
import env from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'

export const UsendtSykmelding = () => {
    const { logEvent } = useAmplitudeInstance()

    logEvent('komponent vist', { 'komponent': 'usendt sykmelding' })

    return (
        <Alert variant="warning">
            {tekst('usendt.sykmelding.alert')}
            <BodyShort as="li" size="small" className="smule">
                <a href={env.sykmeldingUrl()} className="navds-link">{tekst('usendt.sykmelding.gaa-til')}</a>
            </BodyShort>
        </Alert>
    )
}

export function harEldreUsendtSykmelding(sykmeldinger: Sykmelding[]): Boolean {
    const enSykmeldingSomIkkeErSendt = sykmeldinger.find((sykmelding) =>
        sykmelding.sykmeldingStatus.statusEvent == 'APEN'
    )
    return enSykmeldingSomIkkeErSendt !== undefined
}


