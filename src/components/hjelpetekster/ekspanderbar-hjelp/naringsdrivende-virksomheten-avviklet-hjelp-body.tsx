import { BodyLong } from '@navikt/ds-react'

export const NaringsdrivendeVirksomhetenAvvikletHjelpBody = () => {
    return (
        <>
            <BodyLong spacing>
                Hvis du avviklet virksomheten din før du ble sykmeldt, har du ikke rett til sykepenger som selvstendig
                næringsdrivende. Da vil Nav vurdere om du kan ha rett til sykepenger etter andre vilkår.
            </BodyLong>
            <BodyLong spacing>
                Svar ja, hvis du har slettet virksomheten din i Brønnøysundregistrene før du ble sykmeldt.
            </BodyLong>
            <BodyLong>
                Svar nei, hvis virksomheten din fortsatt er i drift, eller du planlegger å ta opp driften igjen når du
                blir frisk nok.
            </BodyLong>
        </>
    )
}
