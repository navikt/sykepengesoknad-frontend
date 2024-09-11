import { describe, it, expect } from 'vitest'

import { hentInntektMetadata } from './ferdiglignet-inntekt'

describe('Parser metadata med informasjon om ferdiglignet inntekt og grunnbeløp', () => {
    const metadata: Record<string, number> = {
        'inntekt-2020': 400000,
        'inntekt-2021': 450000,
        'inntekt-2022': 500000,
        'g-2020': 60000,
        'g-2021': 65000,
        'g-2022': 70000,
        'g-sykmelding': 80000,
        'beregnet-snitt': 450000,
        'beregnet-p25': 562500,
        'beregnet-m25': 337500,
    }

    const inntektMetadata = hentInntektMetadata(metadata)

    it('Parser ferdiglignet inntekt', () => {
        expect(inntektMetadata?.inntekt).toEqual({
            '2020': 400000,
            '2021': 450000,
            '2022': 500000,
        })
    })

    it('parser grunnbeløp', () => {
        expect(inntektMetadata?.g).toEqual({
            '2020': 60000,
            '2021': 65000,
            '2022': 70000,
            sykmelding: 80000,
        })
    })

    it('Parser kalkulerte verdier', () => {
        expect(inntektMetadata?.beregnet).toEqual({
            snitt: 450000,
            p25: 562500,
            m25: 337500,
        })
    })
})
