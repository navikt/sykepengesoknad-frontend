import { BodyLong } from '@navikt/ds-react'

export const TilbakeIArbeidHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Du kan begynne å jobbe fullt igjen før sykmeldingen er slutt. NAV trenger opplysninger om du var tilbake
                i fullt arbeid for å beregne hvor mye du skal få utbetalt i sykepenger.
            </BodyLong>
            <BodyLong className={'mt-4'}>
                Svar ja, hvis du var fullt tilbake på jobb i løpet av perioden. Dette betyr at du ikke lenger er
                sykmeldt fra datoen du oppgir under.
            </BodyLong>
            <BodyLong className={'mt-4'}>
                Svar nei, dersom du kun var delvis tilbake på jobb i denne perioden. Du vil senere i søknaden bli spurt
                om hvor mange timer du har jobbet.
            </BodyLong>
        </>
    )
}
