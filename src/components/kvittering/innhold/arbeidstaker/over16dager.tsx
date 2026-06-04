import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

import UtbetalingAvPenger from './gjentagende-segmenter/UtbetalingAvPenger'

const Over16dager = () => {
    return (
        <>
            <div className="mt-4">
                <div>
                    <Label as="h2" spacing>
                        Nav ber arbeidsgiveren din om inntektsmelding
                    </Label>
                    <BodyShort>
                        For å behandle søknaden trenger vi en inntektsmelding fra arbeidsgiveren din. Inntektsmeldingen
                        inneholder blant annet opplysninger om inntekten din, når du var borte fra jobb og om
                        arbeidsgiver betaler lønn mens du er syk. Nav bruker opplysningene til å beregne hvor mye
                        sykepenger du kan få.
                    </BodyShort>
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
        </>
    )
}

export default Over16dager
