import { Detail } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import Avkrysset from '../../oppsummering/utdrag/avkrysset'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

import { Mottaker } from './kvittering-status'

const ArbeidstakerStatus = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

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
        <>
            <Vis
                hvis={valgtSoknad.sendtTilArbeidsgiverDato}
                render={() => (
                    <div data-cy="sendt-arbeidsgiver">
                        <Avkrysset tekst={`${tilArbNavn()} ${tilOrg()}${medKopi}`} />
                        <Detail className="pl-6">{tilArbDato()}</Detail>
                    </div>
                )}
            />
            <Vis
                hvis={valgtSoknad.sendtTilNAVDato}
                render={() => (
                    <div data-cy="sendt-nav">
                        <Avkrysset tekst={Mottaker.NAV} />
                        <Detail className="pl-6">{tilNavDato()}</Detail>
                    </div>
                )}
            />
        </>
    )
}

export default ArbeidstakerStatus
