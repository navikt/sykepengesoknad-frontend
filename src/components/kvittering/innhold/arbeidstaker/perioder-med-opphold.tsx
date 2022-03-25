import { BodyLong, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Utvidbar from '../../../utvidbar/utvidbar'
import Kontonummer from '../../kontonummer/kontonummer'

const PerioderMedOpphold = () => {

    return (
        <div className="avsnitt">
            <Label as="h2" className="arbeidstaker-tittel">{tekst('kvittering.naeringsdrivende.tittel')}</Label>
            <BodyLong spacing as="span">{tekst('kvittering.arbeidstaker.med-opphold')} </BodyLong>
            <Utvidbar erApen={false} type="intern"
                tittel={tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt')}
            >
                <BodyLong spacing>{tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt.tekst')}</BodyLong>
            </Utvidbar>
            <div className="avsnitt hva-skjer">
                <Label as="h2" className="arbeidstaker-tittel">{tekst('kvittering.nav-behandler-soknaden')}</Label>
                <BodyLong spacing as="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </BodyLong>
                <Link target="_blank" href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                    <BodyLong spacing as="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}</BodyLong>
                </Link>.
            </div>
            <div className="avsnitt">
                <Label as="h2" className="arbeidstaker-tittel">{tekst('kvittering.naar-blir-pengene')}</Label>
                <BodyLong spacing as="span">{parser(tekst('kvittering.arbeidstaker.over16.utbetaling'))} </BodyLong>
            </div>
            <div className="avsnitt">
                <Kontonummer />
            </div>
        </div>
    )
}

export default PerioderMedOpphold
