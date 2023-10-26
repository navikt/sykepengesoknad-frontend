import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyShort>Dette spørsmålet gjelder opphold i utlandet hvor du ikke har arbeidet.</BodyShort>
            <BodyShort spacing>
                Svar nei, hvis du har oppholdt deg i utlandet i mindre enn 5 uker de siste 12 månedene
            </BodyShort>
            <BodyShort spacing>
                Du trenger ikke legge inn perioder med opphold utenfor Norge hvis du allerede har lagt inn perioder med
                utført arbeid i utlandet i forrige spørsmål
            </BodyShort>
        </>
    )
}
