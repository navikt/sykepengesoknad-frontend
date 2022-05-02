import { Alert } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

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
            <Link onClick={() => logEvent('navigere', { lenketekst: tekst('usendt.sykmelding.gaa-til') })}
                to={env.sykmeldingUrl()}>
                {tekst('usendt.sykmelding.gaa-til')}
            </Link>
        </Alert>
    )
}

export function harEldreUsendtSykmelding(sykmeldinger: Sykmelding[]): Boolean {
    const enSykmeldingSomIkkeErSendt = sykmeldinger.find((sykmelding) =>
        sykmelding.sykmeldingStatus.statusEvent == 'APEN'
    )
    return enSykmeldingSomIkkeErSendt !== undefined
}


