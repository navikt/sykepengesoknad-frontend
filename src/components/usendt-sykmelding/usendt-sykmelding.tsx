import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

import { Sykmelding } from '../../types/sykmelding'
import { sykmeldingerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'

interface UsendtSykmeldingProps {
    usendteSykmeldinger: Sykmelding[]
}

export const UsendtSykmelding = ({
    usendteSykmeldinger,
}: UsendtSykmeldingProps) => {
    const { logEvent } = useAmplitudeInstance()

    const alertKey = () => {
        if (usendteSykmeldinger.length == 1) {
            return 'usendt.sykmelding.alert.entall'
        }
        return 'usendt.sykmelding.alert.flertall'
    }

    logEvent('alert vist', {
        tekst: tekst(alertKey()),
        variant: 'warning',
    })

    const lenke = () => {
        if (usendteSykmeldinger.length == 1) {
            return sykmeldingerUrl() + '/' + usendteSykmeldinger[0].id
        }
        return sykmeldingerUrl()
    }

    const lenkeTekstKey = () => {
        if (usendteSykmeldinger.length == 1) {
            return 'usendt.sykmelding.gaa-til-sykmeldingen'
        }
        return 'usendt.sykmelding.gaa-til-listevisning'
    }

    return (
        <Alert variant="warning">
            {tekst(alertKey())}
            <BodyShort size="small">
                <a
                    href={lenke()}
                    onClick={() =>
                        logEvent('navigere', {
                            lenketekst: tekst(lenkeTekstKey()),
                        })
                    }
                >
                    {tekst(lenkeTekstKey())}
                </a>
            </BodyShort>
        </Alert>
    )
}
