import { BodyLong, BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'
import { KvitteringTekster } from '../../kvittering-tekster'
import { BegrepsforklarerReplacer } from '../../../begrepsforklarer/begrepsforklarer-inserter'

interface gradertReisetilskuddProps {
    erGradert: boolean
}

const Over16dager = ({ erGradert }: gradertReisetilskuddProps) => {
    return (
        <div className="mt-4">
            <Label as="h2" spacing>
                {KvitteringTekster['kvittering.før.nav.behandler']}
            </Label>
            <BodyShort>
                <BegrepsforklarerReplacer
                    text={
                        erGradert
                            ? tekst('kvittering.arbeidstaker.over16.gradertreisetilskudd.brodtekst')
                            : tekst('kvittering.arbeidstaker.over16.brodtekst')
                    }
                    replacements={[
                        {
                            inlinetekst: 'inntektsmelding',
                            tittel: tekst('kvittering.hva-er-inntektsmelding'),
                            children: (
                                <BodyLong>{tekst('kvittering.arbeidstaker.over16.inntektsmelding.brodtekst')}</BodyLong>
                            ),
                        },
                        {
                            inlinetekst: '16 kalenderdager',
                            tittel: tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager'),
                            children: (
                                <BodyLong>
                                    {erGradert
                                        ? tekst('kvittering.arbeidsgiveren-skal-betale-gradertreisetilskudd')
                                        : tekst('kvittering.arbeidsgiveren-skal-betale')}
                                </BodyLong>
                            ),
                        },
                    ]}
                ></BegrepsforklarerReplacer>
            </BodyShort>

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

export default Over16dager
