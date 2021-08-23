import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Utvidbar from '../../../utvidbar/utvidbar'

interface gradertReisetilskuddProps {
    erGradert: boolean
}

const Over16dager = ({ erGradert }: gradertReisetilskuddProps) => {

    return (
        <div className="avsnitt">
            <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naeringsdrivende.tittel')}</Element>
            <Normaltekst tag="span">
                {erGradert ?
                    tekst('kvittering.arbeidstaker.over16.gradertreiserilskudd.brodtekst') :
                    tekst('kvittering.arbeidstaker.over16.brodtekst')

                }
            </Normaltekst>
            <Utvidbar erApen={false} type="intern" tittel={tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager')}>
                <AlertStripeInfo>
                    {erGradert ?
                        tekst('kvittering.arbeidsgiveren-skal-betale-gradertreisetilskudd') :
                        tekst('kvittering.arbeidsgiveren-skal-betale')
                    }
                </AlertStripeInfo>
            </Utvidbar>
            <Utvidbar erApen={false} type="intern" tittel={tekst('kvittering.hva-er-inntektsmelding')}>
                <AlertStripeInfo>{tekst('kvittering.arbeidstaker.over16.inntektsmelding.brodtekst')}</AlertStripeInfo>
            </Utvidbar>
            <div className="avsnitt hva-skjer">
                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </Normaltekst>
                <Lenke target="blank" href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
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

export default Over16dager
