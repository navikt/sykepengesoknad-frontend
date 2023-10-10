import { BodyLong, GuidePanel, Label } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import useSoknad from '../../hooks/useSoknad'

export const ViktigInformasjon = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    if (!valgtSoknad) {
        return null
    }

    const style = {
        '--ac-guide-panel-border': 'var(--a-orange-400)',
        '--ac-guide-panel-illustration-bg': 'var(--a-orange-200)',
    } as React.CSSProperties

    const ikkeGodkjentTilbakedatering = valgtSoknad.merknaderFraSykmelding?.some((a) =>
        ['UGYLDIG_TILBAKEDATERING', 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'].includes(a.type),
    )
    if (ikkeGodkjentTilbakedatering) {
        return (
            <GuidePanel poster style={style}>
                <Label as="h2" spacing>
                    Viktig informasjon
                </Label>
                <BodyLong spacing>
                    Vanligvis starter sykmeldingen den dagen du er hos legen. I ditt tilfelle har legen skrevet at den
                    startet tidligere.
                </BodyLong>
                <BodyLong spacing>
                    NAV har kommet til at det ikke er noen gyldig grunn til at sykmeldingen startet før dere hadde
                    kontakt.
                </BodyLong>
                <Label as="h3" spacing>
                    Hva nå?
                </Label>
                <BodyLong spacing>
                    Du kan likevel sende inn søknaden. Når den er behandlet, får du en begrunnelse for hvorfor du ikke
                    får sykepenger for alle dagene. Samtidig får du mulighet til å klage.
                </BodyLong>
            </GuidePanel>
        )
    }
    const tilbakedateringUnderBehandling = valgtSoknad.merknaderFraSykmelding
        ?.map((a) => a.type)
        .includes('UNDER_BEHANDLING')
    if (tilbakedateringUnderBehandling) {
        return (
            <GuidePanel poster style={style}>
                <Label as="h2" spacing>
                    Viktig informasjon
                </Label>
                <BodyLong spacing>
                    Vanligvis starter sykmeldingen den dagen du er hos legen. I ditt tilfelle har legen skrevet at den
                    startet tidligere. NAV må vurdere om det er en gyldig grunn for at sykmeldingen din starter før du
                    var i kontakt med legen.
                </BodyLong>
                <Label as="h3" spacing>
                    Hva nå?
                </Label>
                <BodyLong spacing>
                    Du kan sende inn søknaden som vanlig. Når søknaden er behandlet vil du få melding fra oss med
                    resultatet.
                </BodyLong>
            </GuidePanel>
        )
    }
    return null
}
