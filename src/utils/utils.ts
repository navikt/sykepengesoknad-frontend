export const formatterTall = (tall?: number, desimaler = 0): string => {
    if (tall) {
        const nf_des = new Intl.NumberFormat('nb-NO', {
            maximumFractionDigits: desimaler,
            minimumFractionDigits: desimaler,
            useGrouping: true,
        })
        return nf_des.format(tall)
    } else {
        return ''
    }
}

export function konverterLenkerTilRenTekst(htmlString: string): string {
    const dokument = new DOMParser().parseFromString(htmlString, 'text/html')
    dokument.querySelectorAll('a').forEach((lenke) => {
        const lenkeTekst = lenke.textContent || ''
        const lenkeHref = lenke.getAttribute('href') || ''
        const tekstMedLenke = lenkeHref ? `${lenkeTekst} (${lenkeHref})` : lenkeTekst
        lenke.replaceWith(dokument.createTextNode(tekstMedLenke))
    })
    return dokument.body.textContent || ''
}
