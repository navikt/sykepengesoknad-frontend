import dayjs, { Dayjs } from 'dayjs'

export function easterSunday(InputYear: number): Dayjs {
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

    return dayjs(`${InputYear}-${n}-${p}`)
}

function paskedager(inputYear: number): Dayjs[] {
    const forstePaskeDag = easterSunday(inputYear)
    const andrePaskeDag = forstePaskeDag.add(1, 'days')
    const langfredag = forstePaskeDag.subtract(2, 'days')
    const skjertorsdag = forstePaskeDag.subtract(3, 'days')

    return [skjertorsdag, langfredag, forstePaskeDag, andrePaskeDag]
}

export function innenforPaske(min?: Date, max?: Date) {
    if (!min || !max) {
        return false
    }

    const start = dayjs(min)
    const slutt = dayjs(max)
    const paske = paskedager(start.year())
    let erInnenforPaske = false

    paske.forEach((dag) => {
        if (start.isSame(dag, 'day') || slutt.isSame(dag, 'day') || (start.isBefore(dag) && slutt.isAfter(dag))) {
            erInnenforPaske = true
        }
    })

    return erInnenforPaske
}

export const kristiHimmelfartsdag = (inputYear: number) => {
    return easterSunday(inputYear).add(39, 'days')
} // ascension day
export const førstePinsedag = (inputYear: number) => {
    return easterSunday(inputYear).add(49, 'days')
} // white sunday
export const andrePinsedag = (inputYear: number) => {
    return easterSunday(inputYear).add(50, 'days')
} // white monday
