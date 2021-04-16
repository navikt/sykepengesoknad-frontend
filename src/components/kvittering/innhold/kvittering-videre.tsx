import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import VisBlock from '../../vis-block'

const KvitteringVidere = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore()

    if (sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)) {
        return null
    }

    return (
        <AlertStripeInfo className="opplysninger">
            <Undertittel tag="h3">{tekst('kvittering.hva-skjer-videre')}</Undertittel>
            
            <VisBlock hvis={valgtSykmelding && valgtSykmelding!.valgtArbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE}
                render={() => {
                    return (
                        <div className="avsnitt">
                            <Element tag="h2">{tekst('kvittering.naeringsdrivende.tittel')}</Element>
                            <Normaltekst tag="span">{tekst('kvittering.naeringsdrivende.brodtekst')} </Normaltekst>
                            <Lenke target="blank" href={tekst('kvittering.naeringsdrivende.lenke.url')}>
                                <Normaltekst tag="span">{tekst('kvittering.naeringsdrivende.lenke')}</Normaltekst>
                            </Lenke>.
                        </div>
                    )
                }}
            />
            <div className="avsnitt hva-skjer">
                <Element tag="h2">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </Normaltekst>
                <Lenke target="blank" href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}</Normaltekst>
                </Lenke>
            </div>

            <VisBlock hvis={valgtSoknad && valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD}
                render={() => {
                    return (
                        <div className="avsnitt">
                            <Element tag="h2">{tekst('kvittering.naar-blir-pengene')}</Element>
                            <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.over16.utbetaling')} </Normaltekst>
                        </div>
                    )
                }}
            />

        </AlertStripeInfo>
    )
}

export default KvitteringVidere
