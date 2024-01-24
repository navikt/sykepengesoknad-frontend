export function camelCase(tekst: string): string {
    return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase()
}
