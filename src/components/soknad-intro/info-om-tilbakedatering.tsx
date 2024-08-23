import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

export const InfoOmTilbakedatering = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) {
        return null
    }

    const ikkeGodkjentTilbakedatering = valgtSoknad.merknaderFraSykmelding?.some((merknad) =>
        ['UGYLDIG_TILBAKEDATERING', 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'].includes(merknad.type),
    )
    const tilbakedateringUnderBehandling = valgtSoknad.merknaderFraSykmelding
        ?.map((merknad) => merknad.type)
        .includes('UNDER_BEHANDLING')

    const infotekst = () => {
        if (tilbakedateringUnderBehandling) {
            return (
                <BodyLong>
                    Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt en
                    tidligere startdato. NAV må vurdere om det er en gyldig grunn for at sykemeldingen din starter før
                    du var i kontakt med legen, og vil ta med dette i vurderingen når de går igjennom søknaden din.
                </BodyLong>
            )
        }
        if (ikkeGodkjentTilbakedatering) {
            return (
                <>
                    <BodyLong spacing>
                        Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt
                        en tidligere startdato. NAV har kommet til at det ikke er noen gyldig grunn til at sykmeldingen
                        startet før dere hadde kontakt.
                    </BodyLong>
                    <BodyShort spacing weight="semibold">
                        Hva nå?
                    </BodyShort>
                    <BodyLong>
                        Du kan likevel sende inn søknaden. Når den er behandlet, får du en begrunnelse for hvorfor du
                        ikke får sykepenger for alle dagene. Samtidig får du mulighet til å klage.
                    </BodyLong>
                </>
            )
        }
        return null
    }

    if (!infotekst()) return null

    return (
        <Alert variant="warning" className="mb-8">
            <Heading level="3" spacing size="medium">
                Viktig informasjon
            </Heading>
            {infotekst()}
        </Alert>
    )
}
