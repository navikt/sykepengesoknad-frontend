import { BodyLong, Label, Link, ReadMore } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'

const PerioderMedOpphold = () => {
    return (
        <div className="avsnitt">
            <Label as="h2" className="arbeidstaker-tittel">
                {tekst('kvittering.naeringsdrivende.tittel')}
            </Label>
            <BodyLong spacing as="span">
                {tekst('kvittering.arbeidstaker.med-opphold')}{' '}
            </BodyLong>
            <ReadMore className={'mt-4'} header={tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt')}>
                <BodyLong spacing>{tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt.tekst')}</BodyLong>
            </ReadMore>
            <div className="avsnitt hva-skjer">
                <Label as="h2" className="arbeidstaker-tittel">
                    {tekst('kvittering.nav-behandler-soknaden')}
                </Label>
                <BodyLong spacing as="span">
                    {tekst('kvittering.arbeidstaker.saksbehandlingstid')}{' '}
                </BodyLong>
                <Link target="_blank" href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                    <BodyLong spacing as="span">
                        {tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                    </BodyLong>
                </Link>
                .
            </div>
            <div className="avsnitt">
                <Label as="h2" className="arbeidstaker-tittel">
                    {tekst('kvittering.naar-blir-pengene')}
                </Label>
                <BodyLong spacing>
                    {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-arbeidsgiver'))}{' '}
                </BodyLong>
                <BodyLong spacing as="span">
                    {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-NAV'))}{' '}
                </BodyLong>
            </div>
            <div className="avsnitt kontonummer">
                <Kontonummer />
            </div>
        </div>
    )
}

export default PerioderMedOpphold
