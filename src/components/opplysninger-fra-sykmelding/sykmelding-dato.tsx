import dayjs from 'dayjs'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

const SykmeldingDato = () => {
    const { valgtSykmelding } = useAppStore()

    if (!valgtSykmelding?.bekreftelse.utstedelsesdato) {
        return null
    }

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">{tekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}</EtikettLiten>
            <Normaltekst>{dayjs(valgtSykmelding.bekreftelse.utstedelsesdato).format('D. MMM YYYY')}</Normaltekst>
        </div>
    )
}

export default SykmeldingDato
