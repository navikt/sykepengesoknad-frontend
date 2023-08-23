import { BodyLong } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyLong>Du må være medlem av folketrygden for å ha rett til sykepenger fra NAV.</BodyLong>

            <BodyLong className="mt-4">
                Et ledd i vår vurdering av dette er om du har oppholdt deg utenfor Norge uten å utføre arbeid. Vi vet
                ikke alltid dette og må derfor spørre deg.
            </BodyLong>
            <BodyLong className="mt-4">
                Svar ja, hvis du har oppholdt deg utenfor Norge, men ikke utført arbeid. Eller hvis du har hatt
                ferieopphold mer enn 5 uker hvert kalenderår.
            </BodyLong>
            <BodyLong className="mt-4">
                Svar nei, hvis du ikke har oppholdt deg utenfor Norge, eller hatt ferie opptil 5 uker utenfor Norge.
            </BodyLong>
        </>
    )
}
