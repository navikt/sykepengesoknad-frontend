import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import plasterHover from '../../opplysninger/plaster-hover.svg'
import plaster from '../../opplysninger/plaster.svg'
import Utvidbar from '../../utvidbar/utvidbar'

const KvitteringInfo = () => {
    return (
        <Utvidbar className={'ekspander apen'}
            ikon={plaster} ikonHover={plasterHover} erApen={true}
            tittel={tekst('kvittering.hva-skjer-videre')}
            ikonAltTekst=''
        >
            <div className='opplysninger'>
                <div className="avsnitt">
                    <Undertittel tag="h3">{tekst('kvittering.nav-behandler-soknaden')}</Undertittel>
                    <Normaltekst tag="span">{tekst('kvittering.saksbehandling-avhenger-av')} </Normaltekst>
                    <Lenke href={tekst('kvittering.finn-ut.url')}>
                        <Normaltekst tag="span">{tekst('kvittering.finn-ut')}</Normaltekst>
                    </Lenke>
                </div>
                <div className="avsnitt">
                    <Undertittel tag="h3">{tekst('kvittering.naar-blir-pengene')}</Undertittel>
                    <Normaltekst tag="span">{tekst('kvittering.det-er-ulike-regler')} </Normaltekst>
                    <Lenke href={tekst('kvittering.se-hva.url')}>
                        <Normaltekst tag="span">{tekst('kvittering.se-hva')}</Normaltekst>
                    </Lenke>
                </div>
                <div className="avsnitt">
                    <Undertittel tag="h3">{tekst('kvittering.viktig-for-arbeidstaker')}</Undertittel>
                    <Normaltekst tag="span">{tekst('kvittering.soker-du-etter')}</Normaltekst>
                    <Utvidbar erApen={false} tittel={tekst('kvittering.hva-er-arbeidsgiverperioden')} className="intern">
                        <AlertStripeInfo>
                            <Normaltekst>{tekst('kvittering.arbeidsgiveren-skal-betale')}</Normaltekst>
                        </AlertStripeInfo>
                    </Utvidbar>
                    <Utvidbar erApen={false} tittel={tekst('kvittering.hva-er-inntektsmelding')} className="intern">
                        <AlertStripeInfo>
                            <Normaltekst>{tekst('kvittering.digital-inntektsmelding')}</Normaltekst>
                        </AlertStripeInfo>
                    </Utvidbar>
                </div>
                <div className="avsnitt">
                    <Undertittel tag="h3">{tekst('kvittering.viktig-for-selvstendige')}</Undertittel>
                    <Normaltekst tag="span">{tekst('kvittering.for-at-nav.1')} </Normaltekst>
                    <Lenke href={tekst('kvittering.for-at-nav.2.url')} className="lenke">
                        <Normaltekst tag="span">{tekst('kvittering.for-at-nav.2')}</Normaltekst>
                    </Lenke>
                    <Normaltekst tag="span">{tekst('kvittering.for-at-nav.3')}</Normaltekst>
                </div>
            </div>
        </Utvidbar>
    )
}

export default KvitteringInfo
