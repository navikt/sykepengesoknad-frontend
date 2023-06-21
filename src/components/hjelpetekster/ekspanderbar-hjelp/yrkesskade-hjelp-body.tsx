import { BodyLong } from '@navikt/ds-react'

import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

export const DeprecatedYrkesskadeHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Yrkesskade er en personskade eller sykdom som oppstår under arbeid. En sykdom kan kategoriseres som
                yrkessykdom hvis årsaken er skadelig påvirkning fra arbeidet. Utbrenthet anses imidlertid vanligvis ikke
                som en yrkessykdom.
            </BodyLong>
            <BodyLong className="mt-4">
                Dersom du er sykmeldt grunnet en godkjent yrkesskade eller yrkessykdom, kan det gi deg visse fordeler.
                Disse fordelene kan påvirke sykepengeutbetalingen din ved å øke varigheten og/eller størrelsen på
                utbetalingene.
            </BodyLong>
            <BodyLong className="mt-4">
                Svar ja, hvis du er sykmeldt på grunn av en godkjent yrkesskade eller yrkessykdom.
            </BodyLong>
            <BodyLong className="mt-4">Svar ja, hvis det er påbegynt eller sendt inn en skademelding til NAV.</BodyLong>
            <LenkeMedIkon
                className="mt-4"
                href="https://www.nav.no/yrkesskade"
                text="Du kan lese mer om yrkesskade og sykepenger her."
            />
        </>
    )
}

export const YrkesskadeHjelpBody = () => {
    return (
        <>
            <BodyLong>Yrkesskade er en personskade eller sykdom som oppstår under arbeid.</BodyLong>
            <BodyLong className="mt-4">
                Er det en sammenheng mellom en tidligere godkjent yrkesskade eller yrkessykdom og dette sykefraværet,
                kan det gi deg visse fordeler. Disse fordelene kan påvirke sykepengeutbetalingen din ved å øke
                varigheten og/eller størrelsen på utbetalingene.
            </BodyLong>
            <BodyLong className="mt-4">Svar ja, hvis du er sykmeldt på grunn av en godkjent yrkesskade.</BodyLong>
            <BodyLong className="mt-4">
                Svar nei, hvis du ikke er sykmeldt på grunn av en godkjent yrkesskade eller har en pågående
                yrkesskadesak.
            </BodyLong>

            <LenkeMedIkon
                className="mt-4"
                href="https://www.nav.no/yrkesskade"
                text="Du kan lese mer om yrkesskade og sykepenger her."
            />
        </>
    )
}
