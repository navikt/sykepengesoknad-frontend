import { BodyShort } from '@navikt/ds-react'

export const permittertPeriodeTittel = 'Hvorfor spør vi om dette?'

export const PermittertPeriodeHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Tidspunkt og varighet avgjør om sykepengene skal beregnes likt som dagpenger. Derfor spør vi om de fire
                ukene før du ble sykmeldt. Les mer om{' '}
                <a target="_blank" href="https://www.nav.no/kombinasjoner">
                    å være både sykmeldt og permittert.
                </a>
            </BodyShort>
        </>
    )
}
