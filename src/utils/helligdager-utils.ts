import { addDays, subDays, isSameDay, isBefore, isAfter, getDay } from 'date-fns'
import { TZDate } from '@date-fns/tz'

const OSLO = 'Europe/Oslo'

export function easterSunday(InputYear: number): Date {
    const a = InputYear % 19
    const b = Math.floor(InputYear / 100)
    const c = InputYear % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const n = Math.floor((h + l - 7 * m + 114) / 31)
    let p = (h + l - 7 * m + 114) % 31
    p++

    const month = String(n).padStart(2, '0')
    const day = String(p).padStart(2, '0')
    return new TZDate(`${InputYear}-${month}-${day}`, OSLO)
}

function paskedager(inputYear: number): Date[] {
    const forstePaskeDag = easterSunday(inputYear)
    const andrePaskeDag = addDays(forstePaskeDag, 1)
    const langfredag = subDays(forstePaskeDag, 2)
    const skjertorsdag = subDays(forstePaskeDag, 3)

    return [skjertorsdag, langfredag, forstePaskeDag, andrePaskeDag]
}

export function innenforPaske(min?: Date, max?: Date) {
    if (!min || !max) {
        return false
    }

    const paske = paskedager(min.getFullYear())
    let erInnenforPaske = false

    paske.forEach((dag) => {
        if (isSameDay(min, dag) || isSameDay(max, dag) || (isBefore(min, dag) && isAfter(max, dag))) {
            erInnenforPaske = true
        }
    })

    return erInnenforPaske
}

export const førsteNyttårsdag = (inputYear: number) => {
    return new TZDate(`${inputYear}-01-01`, OSLO)
}
export const arbeidernesDag = (inputYear: number) => {
    return new TZDate(`${inputYear}-05-01`, OSLO)
}
export const grunnlovsdagen = (inputYear: number) => {
    return new TZDate(`${inputYear}-05-17`, OSLO)
}
export const kristiHimmelfartsdag = (inputYear: number) => {
    return addDays(easterSunday(inputYear), 39)
}
export const førstePinsedag = (inputYear: number) => {
    return addDays(easterSunday(inputYear), 49)
}
export const andrePinsedag = (inputYear: number) => {
    return addDays(easterSunday(inputYear), 50)
}
export const førsteJuledag = (inputYear: number) => {
    return new TZDate(`${inputYear}-12-25`, OSLO)
}
export const andreJuledag = (inputYear: number) => {
    return new TZDate(`${inputYear}-12-26`, OSLO)
}

export const rodeDager = (inputYear: number) => {
    const rodeDagerMinusPaske = [
        førsteNyttårsdag(inputYear),
        arbeidernesDag(inputYear),
        grunnlovsdagen(inputYear),
        kristiHimmelfartsdag(inputYear),
        førstePinsedag(inputYear),
        andrePinsedag(inputYear),
        førsteJuledag(inputYear),
        andreJuledag(inputYear),
    ]
    return rodeDagerMinusPaske.concat(paskedager(inputYear))
}

export function rodeUkeDagerIPerioden(min?: Date, max?: Date) {
    if (!min || !max) {
        return false
    }

    const roodeDager = rodeDager(min.getFullYear())
    let rodDagErIUkeDag = false

    roodeDager.forEach((dag) => {
        if (
            (isSameDay(min, dag) || isSameDay(max, dag) || (isBefore(min, dag) && isAfter(max, dag))) &&
            getDay(dag) !== 0 &&
            getDay(dag) !== 6
        ) {
            rodDagErIUkeDag = true
        }
    })

    return rodDagErIUkeDag
}
