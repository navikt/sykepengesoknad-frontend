import { Alert, BodyShort, Detail, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import useSoknad from '../../../hooks/useSoknad'
import { RouteParams } from '../../../app'

import { Mottaker } from './kvittering-status'

const ArbeidstakerStatus = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    let medKopi = tekst('kvittering.med-kopi-til-nav')
    if (valgtSoknad!.sendtTilArbeidsgiverDato && valgtSoknad!.sendtTilNAVDato) {
        medKopi = ''
    }

    const tilNavDato = () => {
        const datoNav = dayjs(valgtSoknad?.sendtTilNAVDato).format('dddd D. MMM, kl HH:mm')
        return datoNav.charAt(0).toUpperCase() + datoNav.slice(1)
    }

    const tilArbDato = () => {
        const datoArb = dayjs(valgtSoknad?.sendtTilArbeidsgiverDato).format('dddd D. MMM, kl HH:mm')
        return datoArb.charAt(0).toUpperCase() + datoArb.slice(1)
    }

    const tilArbNavn = () => {
        return valgtSoknad?.arbeidsgiver?.navn ? valgtSoknad?.arbeidsgiver?.navn : Mottaker.ARBEIDSGIVER
    }

    const tilOrg = () => {
        return valgtSoknad?.arbeidsgiver?.orgnummer ? `(Org.nr. ${valgtSoknad.arbeidsgiver.orgnummer})` : ''
    }

    if (!valgtSoknad) return null

    return (
        <Alert variant="success">
            <Heading size="small" level="2">
                {tekst('kvittering.sendt-til')}
            </Heading>
            <Vis
                hvis={valgtSoknad.sendtTilArbeidsgiverDato}
                render={() => (
                    <div className="mb-4">
                        <BodyShort>{`${tilArbNavn()} ${tilOrg()}${medKopi}`}</BodyShort>
                        <Detail>{tilArbDato()}</Detail>
                    </div>
                )}
            />
            <Vis
                hvis={valgtSoknad.sendtTilNAVDato}
                render={() => (
                    <div className="mb-4">
                        <BodyShort>{Mottaker.NAV}</BodyShort>
                        <Detail>{tilNavDato()}</Detail>
                    </div>
                )}
            />
        </Alert>
    )
}

export default ArbeidstakerStatus
