import { BodyLong, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'

const PerioderUtenOpphold = () => {
    return (
        <div className="avsnitt">
            <div className="avsnitt">
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
                <BodyLong spacing>{parser(tekst('kvittering.arbeidstaker.over16.utbetaling-arbeidsgiver'))} </BodyLong>
                <BodyLong spacing as="span">
                    {parser(tekst('kvittering.arbeidstaker.over16.utbetaling-NAV'))}{' '}
                </BodyLong>
            </div>
            <div className="avsnitt">
                <Kontonummer />
            </div>
        </div>
    )
}

export default PerioderUtenOpphold
