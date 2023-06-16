import { BodyLong } from '@navikt/ds-react'

import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

export const YrkesskadeHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Yrkesskade er en personskade eller sykdom som oppstår under arbeid.
            </BodyLong>
            <BodyLong className="mt-4">
                En godkjent yrkesskade eller yrkessykdom kan gi deg visse fordeler hvis den er årsaken til sykefraværet ditt.
                Disse fordelene kan påvirke sykepengeutbetalingen din ved å øke varigheten og/eller størrelsen på
                utbetalingene.
            </BodyLong>
            <BodyLong className="mt-4">
                Svar ja, hvis du er sykmeldt på grunn av en godkjent yrkesskade du ser i lista.
            </BodyLong>
            <BodyLong className="mt-4">
                Svar nei, hvis du ikke er sykmeldt på grunn av en godkjent yrkesskade du ser i lista eller har en
                pågående yrkesskadesak. Hvis skademelding ikke er sendt inn må arbeidsgiveren din gjøre dette før vi kan
                vurdere saken
            </BodyLong>
            <LenkeMedIkon
                className="mt-4"
                href="https://www.nav.no/yrkesskade"
                text="Du kan lese mer om yrkesskade og sykepenger her."
            />
        </>
    )
}
