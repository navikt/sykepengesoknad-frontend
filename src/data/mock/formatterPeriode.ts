import dayjs from 'dayjs'

function mndTekst(dato: dayjs.Dayjs): string {
    switch (dato.month()) {
        case 0:
            return 'januar'
        case 1:
            return 'februar'
        case 2:
            return 'mars'
        case 3:
            return 'april'
        case 4:
            return 'mai'
        case 5:
            return 'juni'
        case 6:
            return 'juli'
        case 7:
            return 'august'
        case 8:
            return 'september'
        case 9:
            return 'oktober'
        case 10:
            return 'november'
        case 11:
            return 'desember'
    }
    throw Error('Ugyldig måned')
}

function hentMnd(fom: dayjs.Dayjs, tom: dayjs.Dayjs): string {
    if (fom.month == tom.month) {
        return ''
    } else {
        return ' ' + mndTekst(fom)
    }
}

function hentYear(fom: dayjs.Dayjs, tom: dayjs.Dayjs): string {
    if (fom.year == tom.year) {
        return ''
    } else {
        return ' ' + fom.year
    }
}

function formatterDato(dato: dayjs.Dayjs): string {
    return dato.day().toString() + '. ' + mndTekst(dato) + ' ' + dato.year()
}
// Replikerer tilsvarende kode fra backend.
export function formatterPeriode(fom: dayjs.Dayjs, tom: dayjs.Dayjs): string {
    const mnd = hentMnd(fom, tom)
    const year = hentYear(fom, tom)
    return fom.day().toString() + '.' + mnd + year + ' - ' + formatterDato(tom)
}
