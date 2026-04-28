import { BodyShort } from '@navikt/ds-react'

export const andreInntektskilderGammelTittel = 'Hva mener vi med andre inntektskilder?'

export const AndreInntektskilderGammelHjelpBody = () => {
    return (
        <>
            <BodyShort spacing className="mb-4">
                Vi mener bare inntekter som er pensjonsgivende. Som oftest vil det si inntekt fra arbeid du har utført.
                Penger du får fra NAV, trenger du ikke oppgi selv om de er pensjonsgivende.
            </BodyShort>
            <BodyShort>
                Svarer du ja på spørsmålet, får du en liste å krysse av på. Velg frilanser hvis du får
                fosterhjemsgodtgjørelse eller honorar fra verv, for eksempel styreverv i bedrifter eller borettslag.
            </BodyShort>
        </>
    )
}
