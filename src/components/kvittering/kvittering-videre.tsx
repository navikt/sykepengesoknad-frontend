import dayjs from 'dayjs'
import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const KvitteringVidere = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore()

    if (dayjs(new Date()).diff(dayjs(valgtSoknad!.opprettetDato), 'day') > 30) {
        return null
    }

    return (
        <AlertStripeInfo className="opplysninger">
            <Undertittel tag="h3">{tekst('kvittering.hva-skjer-videre')}</Undertittel>
            <Vis hvis={valgtSykmelding!.valgtArbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE}>
                <div className="avsnitt">
                    <Element tag="h2">{tekst('kvittering.naeringsdrivende.tittel')}</Element>
                    <Normaltekst tag="span">{tekst('kvittering.naeringsdrivende.brodtekst')} </Normaltekst>
                    <Lenke href={tekst('kvittering.naeringsdrivende.lenke')}>
                        <Normaltekst tag="span">{tekst('kvittering.naeringsdrivende.lenke')}</Normaltekst>
                    </Lenke>.
                </div>
            </Vis>
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
