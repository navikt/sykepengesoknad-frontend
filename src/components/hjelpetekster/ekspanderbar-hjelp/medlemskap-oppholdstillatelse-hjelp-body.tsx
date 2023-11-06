import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdstillatelseHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Når du ikke er norsk statsborger, må du ha oppholdstillatelse i Norge for å være medlem i folketrygden
                og ha rett til sykepenger.
            </BodyShort>
            <BodyShort spacing>
                Hvis du har hatt flere tillatelser i forskjellige perioder, oppgir du den siste perioden.
            </BodyShort>
        </>
    )
}
