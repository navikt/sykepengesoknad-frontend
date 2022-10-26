export const setBodyClass = (name: string) => {
    if (document.body.className !== '') {
        document.body.setAttribute('class', '')
    }
    document.body.classList.add(name)
}

export const formatterTall = (tall?: number, desimaler = 0): string => {
    if (tall) {
        const nf_des = new Intl.NumberFormat('de-DE', {
            maximumFractionDigits: desimaler,
            minimumFractionDigits: desimaler,
            useGrouping: true,
        })
        return nf_des.format(tall)
    } else {
        return ''
    }
}
