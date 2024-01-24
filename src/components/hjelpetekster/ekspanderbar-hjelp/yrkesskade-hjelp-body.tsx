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
            <BodyShort spacing>
                Yrkesskade er en personskade eller sykdom som oppstår under arbeid, men det kan også være en personskade
                som ble registrert da du var barn. Personskader som har skjedd i barndommen blir registrert som
                yrkesskade fordi de kan påvirke senere arbeidsførhet.
            </BodyShort>
            <BodyShort spacing>
                Nedenfor finner du yrkesskader som er registrert på deg. Dette kan være eldre registrerte skader som du
                ikke vet om eller husker. Dessverre kan vi ikke innhente nærmere informasjon om disse skadene.
            </BodyShort>
            <BodyShort spacing>
                Sammenhengen mellom en yrkesskade og sykefraværet har ofte en nær tilknytning til hverandre og er kjent
                for den sykemeldte.
            </BodyShort>
            <BodyShort spacing> Svar ja, hvis du har en godkjent yrkesskade som påvirker dette sykefraværet.</BodyShort>
            <BodyShort spacing>
                Svar ja, hvis det nylig er sendt inn en skademelding som påvirker dette sykefraværet.
            </BodyShort>
            <BodyShort spacing>
                Dersom du ikke vet hva yrkesskaden er, og den oppsto i ung alder, må du selv vurdere om du tror at en
                eldre yrkesskade påvirker dette sykefraværet. Hvis du tror det er en sammenheng, svar ja på dette
                spørsmålet.
            </BodyShort>
            <BodyShort spacing>
                Ved å svare ja på dette spørsmålet vil en saksbehandler gjennomgå saken din og vurdere om sykefraværet
                ditt er knyttet til en godkjent yrkesskade. Dette vil forlenge saksbehandlingstiden.
            </BodyShort>

            <LenkeMedIkon
                href="https://www.nav.no/yrkesskade"
                text="Du kan lese mer om yrkesskade og sykepenger her."
            />
        </>
    )
}
