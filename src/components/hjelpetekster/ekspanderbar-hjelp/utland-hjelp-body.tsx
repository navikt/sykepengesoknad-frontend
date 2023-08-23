import { BodyShort } from '@navikt/ds-react'

export const UtlandHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Du har kun rett til sykepenger under opphold utenfor EU/EØS i fire uker i løpet av en
                tolvmånedersperiode. Det er anbefalt å søke før du reiser så du er sikker på at du beholder sykepengene
                dine før du reiser.
            </BodyShort>
            <BodyShort spacing>
                Svar ja, dersom du har oppholdt deg utenfor EU/EØS i løpet av perioden som står i spørsmålet.
            </BodyShort>
            <BodyShort spacing>
                Svar nei, dersom du har avviklet lovbestemt ferie. Da svarer du i stedet på spørsmålet om ferie i
                søknaden.
            </BodyShort>
        </>
    )
}
