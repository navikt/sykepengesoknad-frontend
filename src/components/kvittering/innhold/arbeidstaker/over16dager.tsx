import { BodyLong, Label, ReadMore } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { tekst } from '../../../../utils/tekster'
import Kontonummer from '../../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../../lenke-med-ikon/LenkeMedIkon'

interface gradertReisetilskuddProps {
    erGradert: boolean
}

const Over16dager = ({ erGradert }: gradertReisetilskuddProps) => {
    return (
        <div className="avsnitt">
            <Label spacing as="h2">
                {tekst('kvittering.naeringsdrivende.tittel')}
            </Label>
            <BodyLong spacing as="span">
                {erGradert
                    ? tekst('kvittering.arbeidstaker.over16.gradertreisetilskudd.brodtekst')
                    : tekst('kvittering.arbeidstaker.over16.brodtekst')}
            </BodyLong>
            <ReadMore className="mt-2" header={tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager')}>
                <BodyLong spacing>
                    {erGradert
                        ? tekst('kvittering.arbeidsgiveren-skal-betale-gradertreisetilskudd')
                        : tekst('kvittering.arbeidsgiveren-skal-betale')}
                </BodyLong>
            </ReadMore>
            <ReadMore className="mt-2" header={tekst('kvittering.hva-er-inntektsmelding')}>
                <BodyLong spacing>{tekst('kvittering.arbeidstaker.over16.inntektsmelding.brodtekst')}</BodyLong>
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

export default Over16dager
