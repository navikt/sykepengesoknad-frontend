import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../../utils/tekster'

const PerioderUtenOpphold = () => {

    return (
        <div className="avsnitt">
            <div className="avsnitt hva-skjer">
                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </Normaltekst>
                <Lenke href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}</Normaltekst>
                </Lenke>.
            </div>
            <div className="avsnitt">
                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naar-blir-pengene')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.over16.utbetaling')} </Normaltekst>
            </div>
        </div>
    )
}

export default PerioderUtenOpphold
