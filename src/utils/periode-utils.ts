import { Soknad, Sykmelding, SykmeldingPeriode, TidsPeriode } from '../types/types'

export const tidligsteFom = (perioder: TidsPeriode[]) => {
    return perioder.map((p) => {
        return p.fom
    }).sort((p1, p2) => {
        if (p1 > p2) {
            return 1
        } else if (p1 < p2) {
            return -1
        }
        return 0
    })[0]
}

export const senesteTom = (perioder: TidsPeriode[]) => {
    return perioder.map((p) => {
        return p.tom
    }).sort((p1, p2) => {
        if (p1 < p2) {
            return 1
        } else if (p1 > p2) {
            return -1
        }
        return 0
    })[0]
}

export const erOppdelt = (soknad: Soknad, sykmelding: Sykmelding) => {
    if (!sykmelding) {
        return false
    }

    const tilTidsperiode = (p: SykmeldingPeriode) => {
        return {
            fom: new Date(p.fom),
            tom: new Date(p.tom)
        }
    }
    const tomSykmelding = senesteTom(sykmelding.mulighetForArbeid.perioder.map(tilTidsperiode))
    const fomSykmelding = tidligsteFom(sykmelding.mulighetForArbeid.perioder.map(tilTidsperiode))

    return !(soknad.fom!.getTime() === fomSykmelding.getTime()
        && soknad.tom!.getTime() === tomSykmelding.getTime())
}
