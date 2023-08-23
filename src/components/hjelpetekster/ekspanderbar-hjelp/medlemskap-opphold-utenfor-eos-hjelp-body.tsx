import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforEOSHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>Du må være medlem av folketrygden for å ha rett til sykepenger fra NAV.</BodyShort>

            <BodyShort spacing>
                Et ledd i vår vurdering av dette er om du har oppholdt deg utenfor EØS området. Vi vet ikke alltid dette
                og må derfor spørre deg.
            </BodyShort>
            <BodyShort spacing>
                Svar ja, hvis du har vært i utlandet utenfor EØS, men ikke utført arbeid. Eller hvis du har hatt
                ferieopphold mer enn 5 uker hvert kalenderår.
            </BodyShort>
            <BodyShort>
                Svar nei, hvis du ikke har oppholdt deg utenfor EØS, eller hatt ferie opptil 5 uker utenfor EØS.
            </BodyShort>
        </>
    )
}
