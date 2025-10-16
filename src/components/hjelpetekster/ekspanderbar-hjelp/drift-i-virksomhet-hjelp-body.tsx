import { BodyShort } from '@navikt/ds-react'

export const DriftIVirksomhetHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Svar ja hvis det fortsatt er drift og/eller du har tenkt å ta opp driften når du er frisk nok.
            </BodyShort>
            <BodyShort spacing>Svar nei hvis virksomheten er avviklet og slettet før du ble sykmeldt.</BodyShort>
            <BodyShort>
                Når du avvikler et firma velger du selv at du ikke vil drive virksomheten din lenger. Vi spør om dette
                fordi det er situasjonen din når du ble sykmeldt som bestemmer om NAV vurderer deg som selvstendig
                næringsdrivende eller ikke. Hvis virksomheten din er avviklet og slettet før du ble sykmeldt, vil du
                ikke ha rett til sykepenger som selvstendig næringsdrivende. Du vil da bli vurdert etter andre
                bestemmelser.
            </BodyShort>
        </>
    )
}
