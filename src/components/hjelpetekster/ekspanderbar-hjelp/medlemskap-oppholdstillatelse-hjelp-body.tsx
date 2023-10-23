import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdstillatelseHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Du må ha oppholdstillatelse i Norge for å være medlem i folketrygden og ha rett til sykepenger.
            </BodyShort>
            <BodyShort spacing>
                Hvis du har hatt flere tillatelser i ulike perioder, oppgi den siste perioden.
            </BodyShort>
        </>
    )
}
