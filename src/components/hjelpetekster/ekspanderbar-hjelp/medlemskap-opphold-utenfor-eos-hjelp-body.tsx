import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforEOSHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>Med «utenfor EU/EØS» mener vi i land som er utenfor EU og EFTA.</BodyShort>
            <BodyShort spacing>
                Dette spørsmålet gjelder opphold utenfor EU/EØS-området hvor du ikke har arbeidet.
            </BodyShort>
            <BodyShort spacing>Svar nei, hvis du har oppholdt deg mindre enn 5 uker de siste 12 månedene.</BodyShort>
            <BodyShort spacing>
                Svar nei, hvis utenlandsperiodene er de samme som de du har oppgitt i forrige spørsmål (arbeidsperioder
                i utlandet).
            </BodyShort>
        </>
    )
}
