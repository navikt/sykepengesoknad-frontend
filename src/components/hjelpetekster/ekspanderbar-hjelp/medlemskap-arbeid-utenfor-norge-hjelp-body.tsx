import { BodyShort } from '@navikt/ds-react'

export const MedlemskapArbeidUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>Du må være medlem av folketrygden for å ha rett til sykepenger fra NAV.</BodyShort>

            <BodyShort spacing>
                Et ledd i vår vurdering av dette er om du har utført arbeid utenfor Norge. Vi vet ikke alltid dette og
                må derfor spørre deg.
            </BodyShort>
            <BodyShort spacing>Svar nei, hvis du har deltatt på korte kurs, konferanser eller møter.</BodyShort>
        </>
    )
}
