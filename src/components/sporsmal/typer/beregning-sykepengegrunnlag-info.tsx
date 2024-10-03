import React, { useEffect, useState } from 'react'
import { BodyShort, Heading, ReadMore } from '@navikt/ds-react'

import { logEvent } from '../../amplitude/amplitude'

export function BeregningSykepengegrunnlagInfo() {
    const [expanded, setExpanded] = useState<boolean>(false)

    useEffect(() => {
        setExpanded(false)
    }, [])
    const readmoreTittel = 'Hva betyr ferdiglignet inntekt?'

    return (
        <>
            <Heading size="medium" spacing>
                Beregning av sykepengegrunnlaget
            </Heading>

            <BodyShort spacing>
                Sykepenger for selvstendig næringsdrivende baseres vanligvis på gjennomsnittlig årsinntekt de tre siste
                ferdiglignede årene. Det er kun de ferdiglignede årene som skal være med i beregningen og det kan i noen
                tilfeller være opp til fem kalenderår tilbake i tid.
            </BodyShort>
            <BodyShort spacing>
                Hvis du ikke har tre ferdiglignede år, vil sykepengegrunnlaget fastsettes ved skjønn.
            </BodyShort>

            <ReadMore
                className="mb-8 mt-4 w-full"
                header={readmoreTittel}
                open={expanded}
                onClick={() => {
                    setExpanded((prev) => !prev)
                    logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                        tittel: readmoreTittel,
                        component: 'hjelpetekst',
                    })
                }}
            >
                <div className="mt-4">
                    Ferdiglignet inntekt betyr den endelige inntekten som er beregnet og godkjent av skattemyndighetene
                    etter at selvangivelsen eller skattemeldingen er gjennomgått.
                </div>
            </ReadMore>
        </>
    )
}
