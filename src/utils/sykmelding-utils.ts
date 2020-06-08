import dayjs from 'dayjs'

import { SykmeldingPeriode } from '../types/types'

// TODO: Det skjer noe rart her. Browser og kompilator sier at tom og fom verken er dato eller string
export function sorterPerioderEldsteFoerst(perioder: SykmeldingPeriode[]) {
    return perioder.sort((a: SykmeldingPeriode, b: SykmeldingPeriode) => {
        if (s2d(a.fom).getTime() !== s2d(b.fom).getTime()) {
            return s2d(a.fom).getTime() - s2d(b.fom).getTime()
        }
        return s2d(a.tom).getTime() - s2d(b.tom).getTime()
    })
}

const s2d = (datostreng: any) => {
    const dato: Date = dayjs(datostreng).toDate()
    return dato
}
