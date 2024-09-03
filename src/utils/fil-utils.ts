const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const k = 1024

export const formaterFilstørrelse = (bytes: number, decimals = 1): string => {
    if (bytes === 0) return '0 Bytes'
    const dm = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / k ** i).toFixed(dm)).toLocaleString()} ${sizes[i]}`
}

export const filstørrelseTilBytes = (filstørrelse: string): number => {
    const mønster = /(\d+)\s*(\w+)/
    const verdi = parseInt(filstørrelse.match(mønster)![1], 10)
    const størrelse = filstørrelse.match(mønster)![2]
    const i = sizes.indexOf(størrelse)
    return verdi * k ** i
}

export const formattertFiltyper = '.png, .jpg .jpeg'

export const tillatteFiltyper = 'image/png,image/jpeg,image/jpg'

export const maxFilstørrelse = filstørrelseTilBytes('5MB')

export const customTruncet = (text: string, size: number) => {
    return text.length <= size ? text : text.slice(0, size) + '...' + text.slice(-3)
}
