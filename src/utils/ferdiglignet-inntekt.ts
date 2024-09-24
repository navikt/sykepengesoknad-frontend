import {KjentInntektskilde} from "../types/types";

function parseVerdierMedPrefix(metadata: Record<string, number>, prefix: string): Record<string, number> {
    const ferdiglignetInntekt: Record<string, number> = {}

    for (const [key, value] of Object.entries(metadata)) {
        if (key.startsWith(prefix)) {
            const parts = key.split('-')
            const yearStr = parts[1]
            ferdiglignetInntekt[yearStr] = value
        }
    }
    return ferdiglignetInntekt
}

export function hentInntektMetadata(metadata: Record<string, string | number | KjentInntektskilde[]> | undefined) {
    const inntektMetadata = metadata as Record<string, number>
    return (
        metadata && {
            inntekt: parseVerdierMedPrefix(inntektMetadata, 'inntekt-'),
            g: parseVerdierMedPrefix(inntektMetadata, 'g-'),
            beregnet: parseVerdierMedPrefix(inntektMetadata, 'beregnet-'),
        }
    )
}
