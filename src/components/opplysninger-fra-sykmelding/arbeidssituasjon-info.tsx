import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

const ArbeidssituasjonInfo = () => {
    const { valgtSykmelding } = useAppStore()


    if (valgtSykmelding?.valgtArbeidssituasjon) {

        return (
            <div className="avsnitt">
                <EtikettLiten tag="h3"
                    className="avsnitt-hode">{tekst('din-sykmelding.arbeidssituasjon.tittel.2')}</EtikettLiten>
                <Normaltekst>{tekst(`din-sykmelding.arbeidssituasjon.alternativ.${valgtSykmelding.valgtArbeidssituasjon.toLowerCase()}`)}</Normaltekst>
            </div>
        )
    }


    return null

}

export default ArbeidssituasjonInfo
