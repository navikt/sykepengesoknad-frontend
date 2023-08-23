import { BodyShort } from '@navikt/ds-react'

export const TilbakeIArbeidHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Du kan begynne å jobbe fullt igjen før sykmeldingen er slutt. NAV trenger opplysninger om du var tilbake
                i fullt arbeid for å beregne hvor mye du skal få utbetalt i sykepenger.
            </BodyShort>
            <BodyShort spacing>
                Svar ja, hvis du var fullt tilbake på jobb i løpet av perioden. Dette betyr at du ikke lenger er
                sykmeldt fra datoen du oppgir under.
            </BodyShort>
            <BodyShort spacing>
                Svar nei, dersom du kun var delvis tilbake på jobb i denne perioden. Du vil senere i søknaden bli spurt
                om hvor mange timer du har jobbet.
            </BodyShort>
        </>
    )
}
