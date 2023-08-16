import { BodyLong, BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'
import { KvitteringTekster } from '../../kvittering-tekster'
import { Begrepsforklarer } from '../../../begrepsforklarer/begrepsforklarer'
import Vis from '../../../vis'

import UtbetalingAvPenger from './gjentagende-segmenter/UtbetalingAvPenger'

interface gradertReisetilskuddProps {
    erGradert: boolean
}

const Over16dager = ({ erGradert }: gradertReisetilskuddProps) => {
    const begrepsForklaringInntektsmelding = (
        <Begrepsforklarer inlinetekst="inntektsmelding" tittel={tekst('kvittering.hva-er-inntektsmelding')}>
            <BodyLong>{tekst('kvittering.arbeidstaker.over16.inntektsmelding.brodtekst')}</BodyLong>
        </Begrepsforklarer>
    )

    const begrepsForklaring16Kalenderdager = (
        <Begrepsforklarer
            inlinetekst="16 kalenderdager"
            tittel={tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager')}
        >
            <BodyLong>{tekst('kvittering.arbeidsgiveren-skal-betale')}</BodyLong>
        </Begrepsforklarer>
    )

    const begrepsForklaring16KalenderdagerGradertReisetilskudd = (
        <Begrepsforklarer
            inlinetekst="16 kalenderdager"
            tittel={tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager')}
        >
            <BodyLong>{tekst('kvittering.arbeidsgiveren-skal-betale-gradertreisetilskudd')}</BodyLong>
        </Begrepsforklarer>
    )

    return (
        <div className="mt-4">
            <div>
                <Label as="h2" spacing>
                    {KvitteringTekster['kvittering.før.nav.behandler']}
                </Label>
                <Vis
                    hvis={erGradert}
                    render={() => (
                        <BodyShort>
                            Når sykefraværet ditt er lengre enn {begrepsForklaring16KalenderdagerGradertReisetilskudd},
                            betyr det at du får sykepenger og reisetilskudd utbetalt av NAV. Noen arbeidsplasser
                            fortsetter å utbetale sykepenger og reisetilskudd fra dag 17, men da får de penger tilbake
                            fra NAV senere. Arbeidsgiveren din må derfor sende oss {begrepsForklaringInntektsmelding}så
                            fort som mulig.
                        </BodyShort>
                    )}
                />
                <Vis
                    hvis={!erGradert}
                    render={() => (
                        <BodyShort>
                            Når sykefraværet ditt er lengre enn {begrepsForklaring16Kalenderdager}, betyr det at du får
                            sykepenger utbetalt av NAV. Noen arbeidsplasser fortsetter å utbetale sykepenger fra dag 17,
                            men da får de penger tilbake fra NAV senere. Arbeidsgiveren din må derfor sende oss{' '}
                            {begrepsForklaringInntektsmelding} så fort som mulig.
                        </BodyShort>
                    )}
                />
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

export default Over16dager
