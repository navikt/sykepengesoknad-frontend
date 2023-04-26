import { BodyLong } from '@navikt/ds-react'

export const ArbeidUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Du kan ha rettigheter i flere land enn Norge, derfor trenger NAV opplysninger om du har jobbet i
                utlandet de siste 12 månedene.
            </BodyLong>
            <BodyLong className={'mt-4'}>
                Svar nei, dersom du har vært på en kort tjenestereise eller konferanse i utlandet.
            </BodyLong>
        </>
    )
}
