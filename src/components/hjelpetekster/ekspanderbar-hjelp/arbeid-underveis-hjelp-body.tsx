import { BodyLong } from '@navikt/ds-react'

export const ArbeidUnderveisHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Du kan begynne å jobbe selv om du er helt sykmeldt. Jobber du når du er sykmeldt må du registrere antall
                timer eller prosent du har jobbet i denne perioden.
            </BodyLong>
            <BodyLong className="mt-4">
                Opplysningene om arbeidsmengden er med på å beregne hvor mye du skal få utbetalt i sykepenger. Det
                utbetales ikke sykepenger for den delen du er i arbeid eller hvis din arbeidsuførhet er nedsatt med
                mindre enn 20%.
            </BodyLong>
        </>
    )
}
