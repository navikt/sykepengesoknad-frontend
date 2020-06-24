import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../../utils/tekster'

const Inntil16dager = () => {

    return (
        <div className="avsnitt">
            <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.arbeidstaker.tittel')}</Element>
            <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.brodtekst')} </Normaltekst>
        </div>
    )
}

export default Inntil16dager
