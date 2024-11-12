import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

export const JulesoknadTekstIntroside = () => {
    return (
        <Alert variant="info" className="mb-8">
            <BodyShort>
                For å kunne få sykepenger før jul, kan du søke tidligere enn vanlig. Da må du fylle ut søknaden med
                opplysninger om hvordan du tror sykmeldingsperioden fremover vil bli.
            </BodyShort>
        </Alert>
    )
}

export const JulesoknadTekstKvittering = () => {
    return (
        <Alert variant="warning">
            <BodyShort weight="semibold" spacing>
                Endre søknaden hvis situasjonen din endrer seg
            </BodyShort>
            <BodyShort>
                Endringer i situasjonen din mens du er sykmeldt kan påvirke hva du får utbetalt. Når sykmeldingsperioden
                er over bør du sjekke at søknaden fortsatt stemmer. Du kan oppdatere svarene dine i 12 måneder etter du
                har sendt inn søknaden.
            </BodyShort>
        </Alert>
    )
}
