import { Detail } from '@navikt/ds-react'
import { format } from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import React from 'react'

import { tekst } from '../../../utils/tekster'
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
        const datoNav = format(valgtSoknad!.sendtTilNAVDato!, "EEEE d. MMMM, 'kl' HH:mm", { locale: nb })
        return datoNav.charAt(0).toUpperCase() + datoNav.slice(1)
    }

    const tilArbDato = () => {
        const datoArb = format(valgtSoknad!.sendtTilArbeidsgiverDato!, "EEEE d. MMMM, 'kl' HH:mm", { locale: nb })
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
            {valgtSoknad.sendtTilArbeidsgiverDato && (
                <div data-cy="sendt-arbeidsgiver">
                    <Avkrysset tekst={`${tilArbNavn()} ${tilOrg()}${medKopi}`} />
                    <Detail className="pl-6">{tilArbDato()}</Detail>
                </div>
            )}
            {valgtSoknad.sendtTilNAVDato && (
                <div data-cy="sendt-nav">
                    <Avkrysset tekst={Mottaker.NAV} />
                    <Detail className="pl-6">{tilNavDato()}</Detail>
                </div>
            )}
        </>
    )
}

export default ArbeidstakerStatus
