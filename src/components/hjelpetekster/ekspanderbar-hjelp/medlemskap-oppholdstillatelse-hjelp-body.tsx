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

export const MedlemskapOppholdstillatelseV2HjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Når du ikke er norsk statsborger, må du ha oppholdstillatelse i Norge for å være medlem i folketrygden
                og ha rett til sykepenger.
            </BodyShort>
            <BodyShort spacing>
                Hvis du har hatt en annen oppholdstillatelse før den som gjelder nå, svarer du ja. Vi ber deg oppgi
                datoen du fikk denne oppholdstillatelsen og perioden for oppholdstillatelsen.
            </BodyShort>
            <BodyShort spacing>Hvis du ikke har en oppholdstillatelse før den som gjelder nå, svarer du nei.</BodyShort>
        </>
    )
}
