import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

import UtbetalingAvPenger from './gjentagende-segmenter/UtbetalingAvPenger'
import InntektSN from './gjentagende-segmenter/InntektSN'

const PerioderUtenOpphold = ({ skalSendeInntektsmelding }: { skalSendeInntektsmelding: boolean }) => {
    return (
        <div>
            <InntektSN skalSendeInntektsmelding={skalSendeInntektsmelding} />

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

            <UtbetalingAvPenger />

            <Kontonummer />
        </div>
    )
}

export default PerioderUtenOpphold
