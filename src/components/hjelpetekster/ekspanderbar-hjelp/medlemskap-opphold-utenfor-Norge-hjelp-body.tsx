import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>Dette spørsmålet gjelder opphold i utlandet hvor du ikke har arbeidet.</BodyShort>
            <BodyShort spacing>
                Svar nei, hvis du har oppholdt deg i utlandet i mindre enn 5 uker de siste 12 månedene
            </BodyShort>
            <BodyShort spacing>
                Svar nei, hvis utenlandsperiodene er de samme som de du har oppgitt i forrige spørsmål (arbeidsperioder
                i utlandet).
            </BodyShort>
        </>
    )
}
