import { Forslag } from './Forslag'

export const tilForslagsliste = (suggestions: string[], verdiArray: string[] = []): Forslag[] => {
    return suggestions
        .filter((suggestion: string) => {
            return verdiArray && verdiArray.includes
                ? !verdiArray.includes(suggestion)
                : true
        })
        .map((tag: string) => {
            return new Forslag(tag)
        })
}

export const forslagFinnesIForslagsliste = (forslagsliste: string[], forslag: Forslag) => {
    const formatertliste = tilForslagsliste(forslagsliste)
    return formatertliste.find((t) => {
        return t.id === forslag.id
    }) !== undefined
}

export const finnForslag = (forslagsliste: string[], forslag: Forslag) => {
    const formatertListe = tilForslagsliste(forslagsliste)
    return formatertListe.find((t) => {
        return t.id === forslag.id
    })!.text
}
