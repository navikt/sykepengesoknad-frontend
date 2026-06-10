import { Detail } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { tilLesbarDatoOgTid } from '../../../utils/dato-utils'
import Avkrysset from '../../oppsummering/utdrag/avkrysset'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

import { Mottaker } from './kvittering-status'

const ArbeidstakerStatus = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    let medKopi = tekst('kvittering.med-kopi-til-nav')
    if (valgtSoknad!.sendtTilArbeidsgiverDato && valgtSoknad!.sendtTilNAVDato) {
        medKopi = ''
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
                    <Detail className="pl-6">{tilLesbarDatoOgTid(valgtSoknad.sendtTilArbeidsgiverDato)}</Detail>
                </div>
            )}
            {valgtSoknad.sendtTilNAVDato && (
                <div data-cy="sendt-nav">
                    <Avkrysset tekst={Mottaker.NAV} />
                    <Detail className="pl-6">{tilLesbarDatoOgTid(valgtSoknad.sendtTilNAVDato)}</Detail>
                </div>
            )}
        </>
    )
}

export default ArbeidstakerStatus
