import { BodyLong } from '@navikt/ds-react'

export const NaringsdrivendeNyIArbeidsLivetHjelpBody = () => {
    return (
        <>
            <BodyLong spacing>
                Nav bruker vanligvis gjennomsnittet av den pensjonsgivende inntekten din for de siste 3 årene før du ble
                syk for å beregne hvor mye sykepenger du kan få.
            </BodyLong>
            <BodyLong spacing>
                Hvis du har blitt yrkesaktiv innenfor perioden over, skal sykepengene dine fastsettes ved skjønn. Da
                trenger vi dokumentasjon på inntekten du har hatt fra du begynte å jobbe.
            </BodyLong>
            <BodyLong>
                Svar ja, hvis du først ble yrkesaktiv i løpet av perioden over. Dette gjelder både yrkesaktiv som
                næringsdrivende eller i andre arbeidsforhold.
            </BodyLong>
        </>
    )
}
