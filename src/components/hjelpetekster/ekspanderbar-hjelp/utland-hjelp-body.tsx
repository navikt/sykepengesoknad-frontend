import { BodyShort } from '@navikt/ds-react'

export const UtlandHjelpBody = ({ medNei }: { medNei: boolean }) => {
    return (
        <>
            <BodyShort spacing>
                Du kan ha rett til sykepenger under opphold utenfor EU/EØS i fire uker i løpet av en
                tolvmånedersperiode. Dette forutsetter at du søker om det. Det er anbefalt å søke før du reiser så du er
                sikker på at du beholder sykepengene før du reiser.
            </BodyShort>
            <BodyShort spacing>
                Svar ja, dersom du har oppholdt deg utenfor EU/EØS i løpet av perioden som står i spørsmålet.
            </BodyShort>
            {medNei && (
                <BodyShort spacing>
                    Svar nei, dersom du har avviklet lovbestemt ferie. Da svarer du i stedet på spørsmålet om ferie i
                    søknaden.
                </BodyShort>
            )}
        </>
    )
}
