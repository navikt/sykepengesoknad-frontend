import { BodyLong, BodyShort, Label, ReadMore } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

const PerioderMedOpphold = () => {
    return (
        <div>
            <div className="mt-4">
                <Label as="h2" spacing>
                    {tekst('kvittering.naeringsdrivende.tittel')}
                </Label>
                <BodyShort spacing>{tekst('kvittering.arbeidstaker.med-opphold')} </BodyShort>
                <ReadMore className="mt-2" header={tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt')}>
                    <BodyLong spacing>
                        {tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt.tekst')}
                    </BodyLong>
                </ReadMore>
            </div>

            <div className="mt-8">
                <Label as="h2" spacing>
                    {tekst('kvittering.nav-behandler-soknaden')}
                </Label>
                <BodyShort as="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </BodyShort>
                <LenkeMedIkon
                    href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}
                    text={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                />
                .
            </div>

            <div className="mt-8">
                <Label as="h2" spacing>
                    {tekst('kvittering.naar-blir-pengene')}
                </Label>
                <BodyShort spacing>
                    {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-arbeidsgiver'))}{' '}
                </BodyShort>
                <BodyShort spacing>
                    {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-NAV'))}{' '}
                </BodyShort>
            </div>

            <Kontonummer />
        </div>
    )
}

export default PerioderMedOpphold
