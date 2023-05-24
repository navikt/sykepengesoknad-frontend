import { BodyLong } from '@navikt/ds-react'

export const FravarForSykmeldingenHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Arbeidsgiveren din dekker dagene du har vært borte før sykmeldingen og de første 16 dagene av
                sykefraværet.
            </BodyLong>

            <BodyLong className="mt-4">
                NAV trenger å vite om du var syk og borte fra jobb med egenmelding noen av disse dagene før du ble
                sykmeldt for å beregne riktig utbetaling av sykepenger.
            </BodyLong>
        </>
    )
}
