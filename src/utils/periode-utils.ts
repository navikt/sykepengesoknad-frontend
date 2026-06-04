import { Periode, Sykmelding } from '../types/sykmelding'
import { Soknad, TidsPeriode } from '../types/types'

export const tidligsteFom = (perioder: TidsPeriode[]) => {
    if (perioder.length === 0) {
        return null
    }

    return perioder
        .map((p) => {
            return p.fom
        })
        .sort((p1, p2) => {
            if (p1 > p2) {
                return 1
            } else if (p1 < p2) {
                return -1
            }
            return 0
        })[0]
}

export const senesteTom = (perioder: TidsPeriode[]) => {
    if (perioder.length === 0) {
        return null
    }
    return perioder
        .map((p) => {
            return p.tom
        })
        .sort((p1, p2) => {
            if (p1 < p2) {
                return 1
            } else if (p1 > p2) {
                return -1
            }
            return 0
        })[0]
}

export const senesteFom = (perioder: TidsPeriode[]) => {
    if (perioder.length === 0) {
        return null
    }
    return perioder
        .map((p) => {
            return p.tom
        })
        .sort((p1, p2) => {
            if (p1 < p2) {
                return 1
            } else if (p1 > p2) {
                return -1
            }
            return 0
        })[0]
}

const tilTidsperiode = (p: Periode) => {
    return {
        fom: p.fom,
        tom: p.tom,
    }
}

export const erOppdelt = (soknad: Soknad, sykmelding: Sykmelding) => {
    const fomSykmelding = tidligsteFom(sykmelding.sykmeldingsperioder.map(tilTidsperiode))!
    const tomSykmelding = senesteTom(sykmelding.sykmeldingsperioder.map(tilTidsperiode))!

    return !(soknad.fom!.getTime() === fomSykmelding.getTime() && soknad.tom!.getTime() === tomSykmelding.getTime())
}
