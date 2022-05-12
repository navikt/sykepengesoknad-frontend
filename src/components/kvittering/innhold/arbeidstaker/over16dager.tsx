import { BodyLong, BodyShort, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Utvidbar from '../../../utvidbar/utvidbar'
import Kontonummer from '../../kontonummer/kontonummer'

interface gradertReisetilskuddProps {
    erGradert: boolean
}

const Over16dager = ({ erGradert }: gradertReisetilskuddProps) => {
    return (
        <div className="avsnitt">
            <Label as="h2" className="arbeidstaker-tittel">
                {tekst('kvittering.naeringsdrivende.tittel')}
            </Label>
            <BodyLong spacing as="span">
                {erGradert
                    ? tekst(
                          'kvittering.arbeidstaker.over16.gradertreisetilskudd.brodtekst'
                      )
                    : tekst('kvittering.arbeidstaker.over16.brodtekst')}
            </BodyLong>
            <Utvidbar
                erApen={false}
                type="intern"
                tittel={tekst(
                    'kvittering.arbeidstaker.hvorfor-skille-ved-16-dager'
                )}
            >
                <BodyLong spacing>
                    {erGradert
                        ? tekst(
                              'kvittering.arbeidsgiveren-skal-betale-gradertreisetilskudd'
                          )
                        : tekst('kvittering.arbeidsgiveren-skal-betale')}
                </BodyLong>
            </Utvidbar>
            <Utvidbar
                erApen={false}
                type="intern"
                tittel={tekst('kvittering.hva-er-inntektsmelding')}
            >
                <BodyLong spacing>
                    {tekst(
                        'kvittering.arbeidstaker.over16.inntektsmelding.brodtekst'
                    )}
                </BodyLong>
            </Utvidbar>
            <div className="avsnitt hva-skjer">
                <Label as="h2" className="arbeidstaker-tittel">
                    {tekst('kvittering.nav-behandler-soknaden')}
                </Label>
                <BodyLong spacing as="span">
                    {tekst('kvittering.arbeidstaker.saksbehandlingstid')}{' '}
                </BodyLong>
                <Link
                    target="_blank"
                    href={tekst(
                        'kvittering.arbeidstaker.saksbehandlingstid.lenke.url'
                    )}
                >
                    <BodyShort as="span">
                        {tekst(
                            'kvittering.arbeidstaker.saksbehandlingstid.lenke'
                        )}
                    </BodyShort>
                </Link>
                .
            </div>
            <div className="avsnitt">
                <Label as="h2" className="arbeidstaker-tittel">
                    {tekst('kvittering.naar-blir-pengene')}
                </Label>
                <BodyLong spacing>
                    {parser(
                        tekst(
                            'kvittering.arbeidstaker.over16.utbetaling-arbeidsgiver'
                        )
                    )}{' '}
                </BodyLong>
                <BodyLong spacing as="span">
                    {parser(
                        tekst('kvittering.arbeidstaker.over16.utbetaling-NAV')
                    )}{' '}
                </BodyLong>
            </div>
            <div className="avsnitt">
                <Kontonummer />
            </div>
        </div>
    )
}

export default Over16dager
