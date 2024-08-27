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

export function hentInntektMetadata(inntekt: Record<string, number>): Record<string, Record<string, number>> {
    return {
        inntekt: parseVerdierMedPrefix(inntekt, 'inntekt-'),
        g: parseVerdierMedPrefix(inntekt, 'g-'),
        beregnet: parseVerdierMedPrefix(inntekt, 'beregnet-'),
    }
}
