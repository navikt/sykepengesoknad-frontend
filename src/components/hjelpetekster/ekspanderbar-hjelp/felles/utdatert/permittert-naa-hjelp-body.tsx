import { BodyShort } from '@navikt/ds-react'

export const permittertNaaTittel = 'Hvorfor spør vi om dette?'

export const PermittertNaaHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Vi spør om permittering for å kunne beregne sykepengene dine riktig. Les mer om{' '}
                <a target="_blank" href="https://www.nav.no/kombinasjoner">
                    å være både sykmeldt og permittert.
                </a>
            </BodyShort>
        </>
    )
}
