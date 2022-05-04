import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

import { Sykmelding } from '../../types/sykmelding'
import { sykmeldingerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'

export const UsendtSykmelding = () => {
    const { logEvent } = useAmplitudeInstance()

    logEvent('komponent vist', { komponent: 'usendt sykmelding' })

    return (
        <Alert variant="warning">
            {tekst('usendt.sykmelding.alert')}
            <BodyShort size="small">
                <a
                    href={sykmeldingerUrl()}
                    onClick={() =>
                        logEvent('navigere', {
                            lenketekst: tekst('usendt.sykmelding.gaa-til'),
                        })
                    }
                >
                    {tekst('usendt.sykmelding.gaa-til')}
                </a>
            </BodyShort>
        </Alert>
    )
}

export function harUsendtSykmelding(sykmeldinger: Sykmelding[]): Boolean {
    const enSykmeldingSomIkkeErSendt = sykmeldinger.find(
        (sykmelding) => sykmelding.sykmeldingStatus.statusEvent == 'APEN'
    )
    return enSykmeldingSomIkkeErSendt !== undefined
}
