import { Alert } from '@navikt/ds-react'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'

const KvitteringUtenlands = () => {
    const { valgtSoknad } = useAppStore()

    if (sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)) {
        return null
    }

    return (
        <Alert variant="info" className="opplysninger">
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
            </div>
            <div className="avsnitt">
                <Lenke target="blank" href={tekst('kvittering.utenlands.lenke.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.utenlands.lenke')}</Normaltekst>
                </Lenke>.
            </div>
            <div className="avsnitt">
                <Element tag="h2">{tekst('kvittering.utenlands.overskrift3')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.utenlands.brodtekst3')} </Normaltekst>
            </div>
        </Alert>
    )
}

export default KvitteringUtenlands
