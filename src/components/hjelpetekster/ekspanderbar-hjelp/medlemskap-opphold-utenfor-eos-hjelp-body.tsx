import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforEOSHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Dette spørsmålet gjelder opphold utenfor EØS-området hvor du ikke har arbeidet.
            </BodyShort>
            <BodyShort spacing>
                Svar nei, hvis du har oppholdt deg utenfor EØS-området i mindre enn 5 uker de siste 12 månedene
            </BodyShort>
            <BodyShort spacing>
                Du trenger ikke legge inn perioder med opphold utenfor EØS-området hvis du allerede har lagt inn
                perioder med utført arbeid i utlandet i forrige spørsmål
            </BodyShort>
        </>
    )
}
