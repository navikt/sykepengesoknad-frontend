import dayjs from 'dayjs'
import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'

const KvitteringUtenlands = () => {
    const { valgtSoknad } = useAppStore()

    if (dayjs(new Date()).diff(dayjs(valgtSoknad!.opprettetDato), 'day') > 30) {
        return null
    }

    return (
        <AlertStripeInfo className="opplysninger">
            <Undertittel tag="h3">{tekst('kvittering.hva-skjer-videre')}</Undertittel>
            <div className="avsnitt">
                <Element tag="h2">{tekst('kvittering.utenlands.overskrift1')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.utenlands.brodtekst1')} </Normaltekst>
            </div>
            <div className="avsnitt">
                <Element tag="h2">{tekst('kvittering.utenlands.overskrift2')}</Element>
                <Normaltekst tag="ul">
                    <li>{tekst('kvittering.utenlands.liste1')}</li>
                    <li>{tekst('kvittering.utenlands.liste2')}</li>
                    <li>{tekst('kvittering.utenlands.liste3')}</li>
                </Normaltekst>
                <Lenke href={tekst('kvittering.utenlands.lenke.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.utenlands.lenke')}</Normaltekst>
                </Lenke>.
            </div>
            <div className="avsnitt">
                <Element tag="h2">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.saksbehandling-avhenger-av')} </Normaltekst>
                <Lenke href={tekst('kvittering.finn-ut.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.finn-ut')}</Normaltekst>
                </Lenke>
            </div>
            <div className="avsnitt">
                <Element tag="h2">{tekst('kvittering.utenlands.overskrift3')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.utenlands.brodtekst3')} </Normaltekst>
            </div>
        </AlertStripeInfo>
    )
}

export default KvitteringUtenlands
