import { BodyLong, BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'
import { KvitteringTekster } from '../../kvittering-tekster'
import { Begrepsforklarer, BegrepsforklarerModal } from '../../../begrepsforklarer/begrepsforklarer'

import UtbetalingAvPenger from './gjentagende-segmenter/UtbetalingAvPenger'

interface gradertReisetilskuddProps {
    erGradertReisetilskudd: boolean
}

const Over16dager = ({ erGradertReisetilskudd }: gradertReisetilskuddProps) => {
    const [sekstenDagerOpen, set16dagerOpen] = React.useState(false)
    const [inntektsmeldingOpen, setInntektsmeldingOpen] = React.useState(false)

    const begrepsForklaringInntektsmelding = (
        <Begrepsforklarer inlinetekst="inntektsmelding" setOpen={setInntektsmeldingOpen} />
    )
    const begrepsForklaring16Kalenderdager = (
        <Begrepsforklarer inlinetekst="16 kalenderdager" setOpen={set16dagerOpen} />
    )

    return (
        <>
            <div className="mt-4">
                <div>
                    <Label as="h2" spacing>
                        {KvitteringTekster['kvittering.for.nav.behandler']}
                    </Label>
                    {erGradertReisetilskudd ? (
                        <BodyShort>
                            Når sykefraværet ditt er lengre enn {begrepsForklaring16Kalenderdager}, betyr det at du får
                            sykepenger og reisetilskudd utbetalt av NAV. Noen arbeidsplasser fortsetter å utbetale
                            sykepenger og reisetilskudd fra dag 17, men da får de penger tilbake fra NAV senere.
                            Arbeidsgiveren din må derfor sende oss {begrepsForklaringInntektsmelding} så fort som mulig.
                        </BodyShort>
                    ) : (
                        <BodyShort>
                            Når sykefraværet ditt er lengre enn {begrepsForklaring16Kalenderdager}, betyr det at du får
                            sykepenger utbetalt av NAV. Noen arbeidsplasser fortsetter å utbetale sykepenger fra dag 17,
                            men da får de penger tilbake fra NAV senere. Arbeidsgiveren din må derfor sende oss{' '}
                            {begrepsForklaringInntektsmelding} så fort som mulig.
                        </BodyShort>
                    )}
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
            <BegrepsforklarerModal
                tittel={tekst('kvittering.hva-er-inntektsmelding')}
                open={inntektsmeldingOpen}
                setOpen={setInntektsmeldingOpen}
            >
                <BodyLong>{tekst('kvittering.arbeidstaker.over16.inntektsmelding.brodtekst')}</BodyLong>
            </BegrepsforklarerModal>
            <BegrepsforklarerModal
                tittel={tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager')}
                open={sekstenDagerOpen}
                setOpen={set16dagerOpen}
            >
                {erGradertReisetilskudd ? (
                    <BodyLong>{tekst('kvittering.arbeidsgiveren-skal-betale-gradertreisetilskudd')}</BodyLong>
                ) : (
                    <BodyLong>{tekst('kvittering.arbeidsgiveren-skal-betale')}</BodyLong>
                )}
                <BodyLong>{tekst('kvittering.arbeidstaker.over16.inntektsmelding.brodtekst')}</BodyLong>
            </BegrepsforklarerModal>
        </>
    )
}

export default Over16dager
