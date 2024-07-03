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
                Har du ikke hatt en oppholdstillatelse som gjelder for en periode før den vi har mottatt fra
                Utlendingsdirektoratet, svarer du nei.
            </BodyShort>
            <BodyShort spacing>
                Har du hatt én eller flere tidligere oppholdstillatelser, svarer du ja. Vi ber deg oppgi den siste
                tillatelsen før perioden vi har mottatt fra Utlendingsdirektoratet.
            </BodyShort>
        </>
    )
}
