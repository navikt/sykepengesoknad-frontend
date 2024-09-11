import React, { useEffect, useState } from 'react'
import { BodyShort, Heading, ReadMore } from '@navikt/ds-react'

export function BeregningSykepengegrunnlagInfo() {
    const [expanded, setExpanded] = useState<boolean>(false)

    useEffect(() => {
        setExpanded(false)
    }, [])

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
                Unntak kan gjøres hvis inntekten din har endret seg varig mer enn 25 prosent på grunn av endringer i
                arbeidssituasjonen. I slike tilfeller vil sykepengegrunnlaget fastsettes basert på inntekten din på
                sykmeldingstidspunktet.
            </BodyShort>
            <BodyShort spacing>
                Hvis du ikke har tre ferdiglignede år, vil sykepengegrunnlaget fastsettes ved skjønn.
            </BodyShort>

            <ReadMore
                className="mb-8 mt-4 w-full"
                header="Hva betyr ferdiglignet inntekt?"
                open={expanded}
                onClick={() => {
                    setExpanded((prev) => !prev)
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
