import { Sporsmal } from '../types/types'

function parseVerdierMedPrefix(inntekt: Record<string, number>, prefix: string): Record<string, number> {
    const ferdiglignetInntekt: Record<string, number> = {}

    for (const [key, value] of Object.entries(inntekt)) {
        if (key.startsWith(prefix)) {
            const parts = key.split('-')
            const yearStr = parts[1]
            ferdiglignetInntekt[yearStr] = value
        }
    }
    return ferdiglignetInntekt
}

export function hentInntektMetadata(sporsmal: Sporsmal) {
    const inntektMetadata = sporsmal.metadata?.inntekt as Record<string, number>
    return (
        inntektMetadata && {
            inntekt: parseVerdierMedPrefix(inntektMetadata, 'inntekt-'),
            g: parseVerdierMedPrefix(inntektMetadata, 'g-'),
            beregnet: parseVerdierMedPrefix(inntektMetadata, 'beregnet-'),
        }
    )
}
