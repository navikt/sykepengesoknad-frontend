import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

const PerioderUtenOpphold = () => {
    return (
        <div>
            <div>
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
            <div>
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
            <div>
                <Kontonummer />
            </div>
        </div>
    )
}

export default PerioderUtenOpphold
