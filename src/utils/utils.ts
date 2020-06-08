export const lagDesimaltall = (streng: string) => {
    let s = streng.replace(/,/g, '.')
    if (s.startsWith('.')) {
        return ''
    }
    if (!s.endsWith('.')) {
        const n = parseFloat(s)
        if (isNaN(n)) {
            return ''
        }
    }
    s = `${s}`.replace(/\./g, ',')
    if (s.indexOf(',') > -1) {
        let a = s.split(',')
        a = [ s[0], s[1].substr(0, 2) ]
        return a.join(',')
    }
    return s
}

export const lagHeltall = (streng: string) => {
    const strengMedDesimaler = lagDesimaltall(streng)
    return strengMedDesimaler.split(',')[0]
}

export const getObjectValueByString = (o: {}, s: string) => {
    let string = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    string = string.replace(/^\./, '') // strip a leading dot
    const keys = string.split('.')
    let obj: any = { ...o }
    for (let i = 0, n = keys.length; i < n; i += 1) {
        const key = keys[i]
        if (key in obj) {
            obj = obj[key]
        }
    }
    return obj
}

export const formaterOrgnr = (orgnr: string) => {
    return orgnr.replace(/(...)(...)(...)/g, '$1 $2 $3')
}

export const setBodyClass = (name: string) => {
    if (document.body.className !== '') {
        document.body.classList.remove(document.body.className)
    }
    document.body.classList.add(name)
}
