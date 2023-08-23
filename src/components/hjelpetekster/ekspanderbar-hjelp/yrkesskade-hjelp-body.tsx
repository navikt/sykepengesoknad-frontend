import { BodyShort } from '@navikt/ds-react'

import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

export const DeprecatedYrkesskadeHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Yrkesskade er en personskade eller sykdom som oppstår under arbeid. En sykdom kan kategoriseres som
                yrkessykdom hvis årsaken er skadelig påvirkning fra arbeidet. Utbrenthet anses imidlertid vanligvis ikke
                som en yrkessykdom.
            </BodyShort>
            <BodyShort spacing>
                Dersom du er sykmeldt grunnet en godkjent yrkesskade eller yrkessykdom, kan det gi deg visse fordeler.
                Disse fordelene kan påvirke sykepengeutbetalingen din ved å øke varigheten og/eller størrelsen på
                utbetalingene.
            </BodyShort>
            <BodyShort spacing>
                Svar ja, hvis du er sykmeldt på grunn av en godkjent yrkesskade eller yrkessykdom.
            </BodyShort>
            <BodyShort spacing>Svar ja, hvis det er påbegynt eller sendt inn en skademelding til NAV.</BodyShort>
            <LenkeMedIkon
                href="https://www.nav.no/yrkesskade"
                text="Du kan lese mer om yrkesskade og sykepenger her."
            />
        </>
    )
}

export const YrkesskadeHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>Yrkesskade er en personskade eller sykdom som oppstår under arbeid.</BodyShort>
            <BodyShort spacing>
                Er det en sammenheng mellom en tidligere godkjent yrkesskade eller yrkessykdom og dette sykefraværet,
                kan det gi deg visse fordeler. Disse fordelene kan påvirke sykepengeutbetalingen din ved å øke
                varigheten og/eller størrelsen på utbetalingene.
            </BodyShort>
            <BodyShort spacing>Svar ja, hvis du er sykmeldt på grunn av en godkjent yrkesskade.</BodyShort>
            <BodyShort spacing>
                Svar nei, hvis du ikke er sykmeldt på grunn av en godkjent yrkesskade eller har en pågående
                yrkesskadesak.
            </BodyShort>

            <LenkeMedIkon
                href="https://www.nav.no/yrkesskade"
                text="Du kan lese mer om yrkesskade og sykepenger her."
            />
        </>
    )
}
