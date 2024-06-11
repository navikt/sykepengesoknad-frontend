import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforEOSHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Dette spørsmålet gjelder opphold utenfor EU/EØS eller Sveits hvor du ikke har arbeidet.
            </BodyShort>
            <BodyShort spacing>Svar nei, hvis oppholdet var kortere enn 5 uker de siste 12 månedene.</BodyShort>
            <BodyShort spacing>
                Svar nei, hvis oppholdet var de samme periodene som du har oppgitt i forrige spørsmål (arbeidsperioder i
                utlandet).
            </BodyShort>
        </>
    )
}
