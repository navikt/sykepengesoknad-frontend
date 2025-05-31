import { BodyShort } from '@navikt/ds-react'

export const AvvikletVirksomhetHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Hvis den fortsatt er i drift, eller du planlegger å ta opp driften når du blir frisk nok, svarer du nei.
            </BodyShort>
            <BodyShort>
                Vi spør om dette fordi det er situasjonen din når du ble sykmeldt som bestemmer om NAV vurderer deg som
                selvstendig næringsdrivende eller ikke. Hvis virksomheten din er avviklet og slettet før du ble
                sykmeldt, vil du ikke ha rett til sykepenger som selvstendig næringsdrivende. Du vil da bli vurdert
                etter andre bestemmelser.
            </BodyShort>
        </>
    )
}
