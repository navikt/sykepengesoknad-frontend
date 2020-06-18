import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel, Element } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { AlertStripeInfo } from 'nav-frontend-alertstriper'

const KvitteringVidere = () => {
    return (
        <AlertStripeInfo className="opplysninger">
            <Undertittel tag="h3">{tekst('kvittering.hva-skjer-videre')}</Undertittel>
            <div className="avsnitt">
                <Element tag="h2">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.saksbehandling-avhenger-av')} </Normaltekst>
                <Lenke href={tekst('kvittering.finn-ut.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.finn-ut')}</Normaltekst>
                </Lenke>
            </div>
            <div className="avsnitt">
                <Element tag="h2">{tekst('kvittering.naar-blir-pengene')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.det-er-ulike-regler')} </Normaltekst>
                <Lenke href={tekst('kvittering.se-hva.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.se-hva')}</Normaltekst>
                </Lenke>
            </div>
        </AlertStripeInfo>
    )
}

export default KvitteringVidere
