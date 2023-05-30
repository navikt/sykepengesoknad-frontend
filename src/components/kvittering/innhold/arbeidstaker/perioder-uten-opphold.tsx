import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

const PerioderUtenOpphold = () => {
    return (
        <div>
            <div className="mt-4">
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

            <div className="mt-4">
                <Label as="h2" spacing>
                    {tekst('kvittering.naar-blir-pengene')}
                </Label>
                <BodyShort spacing>
                    {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-arbeidsgiver'))}
                </BodyShort>
                <BodyShort spacing>
                    {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-NAV'))}
                </BodyShort>
            </div>

            <Kontonummer />
        </div>
    )
}

export default PerioderUtenOpphold
