import { BodyLong, BodyShort, Label, ReadMore } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

import UtbetalingAvPenger from './gjentagende-segmenter/UtbetalingAvPenger'

const PerioderMedOpphold = () => {
    return (
        <div>
            <div className="mt-4">
                <Label as="h2" spacing>
                    {tekst('kvittering.for.nav.behandler')}
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

            <UtbetalingAvPenger />

            <Kontonummer />
        </div>
    )
}

export default PerioderMedOpphold
