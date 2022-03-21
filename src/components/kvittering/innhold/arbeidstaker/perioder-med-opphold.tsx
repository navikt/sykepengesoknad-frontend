import { Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Utvidbar from '../../../utvidbar/utvidbar'
import Kontonummer from '../../kontonummer/kontonummer'

const PerioderMedOpphold = () => {

    return (
        <div className="avsnitt">
            <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naeringsdrivende.tittel')}</Element>
            <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.med-opphold')} </Normaltekst>
            <Utvidbar erApen={false} type="intern"
                tittel={tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt')}
            >
                <Normaltekst>{tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt.tekst')}</Normaltekst>
            </Utvidbar>
            <div className="avsnitt hva-skjer">
                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </Normaltekst>
                <Link target="_blank" href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}</Normaltekst>
                </Link>.
            </div>
            <div className="avsnitt">
                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naar-blir-pengene')}</Element>
                <Normaltekst tag="span">{parser(tekst('kvittering.arbeidstaker.over16.utbetaling'))} </Normaltekst>
            </div>
            <div className="avsnitt">
                <Kontonummer />
            </div>
        </div>
    )
}

export default PerioderMedOpphold
