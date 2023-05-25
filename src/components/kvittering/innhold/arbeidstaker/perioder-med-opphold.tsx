import { BodyLong, Label, ReadMore } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

const PerioderMedOpphold = () => {
    return (
        <div className="avsnitt">
            <Label spacing as="h2">
                {tekst('kvittering.naeringsdrivende.tittel')}
            </Label>
            <BodyLong spacing as="span">
                {tekst('kvittering.arbeidstaker.med-opphold')}{' '}
            </BodyLong>
            <ReadMore className="mt-4" header={tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt')}>
                <BodyLong spacing>{tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt.tekst')}</BodyLong>
            </ReadMore>
            <div className="avsnitt hva-skjer">
                <Label spacing as="h2">
                    {tekst('kvittering.nav-behandler-soknaden')}
                </Label>
                <BodyLong spacing as="span">
                    {tekst('kvittering.arbeidstaker.saksbehandlingstid')}{' '}
                </BodyLong>
                <LenkeMedIkon
                    href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}
                    text={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                />
                .
            </div>
            <div className="avsnitt">
                <Label spacing as="h2">
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
