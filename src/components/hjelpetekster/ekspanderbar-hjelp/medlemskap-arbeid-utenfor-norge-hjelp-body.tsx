import { BodyLong } from '@navikt/ds-react'

export const MedlemskapArbeidUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyLong>Du må være medlem av folketrygden for å ha rett til sykepenger fra NAV.</BodyLong>

            <BodyLong className="mt-4">
                Et ledd i vår vurdering av dette er om du har utført arbeid utenfor Norge. Vi vet ikke alltid dette og
                må derfor spørre deg.
            </BodyLong>
            <BodyLong className="mt-4">Svar nei, hvis du har deltatt på korte kurs, konferanser eller møter.</BodyLong>
        </>
    )
}
