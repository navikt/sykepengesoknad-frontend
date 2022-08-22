import dayjs from 'dayjs'

import { Periode, Sykmelding } from '../types/sykmelding'
import { TidsPeriode } from '../types/types'

export const sorterEtterEldsteTom = (p1: Periode, p2: Periode) => {
    return dayjs(p1.tom).unix() - dayjs(p2.tom).unix()
}

export const hentArbeidssituasjon = (valgtSykmelding?: Sykmelding) => {
    return valgtSykmelding?.sykmeldingStatus.sporsmalOgSvarListe?.find((s) => s.shortName === 'ARBEIDSSITUASJON')?.svar
        ?.svar
}

export const harForsikring = (valgtSykmelding?: Sykmelding) => {
    return (
        valgtSykmelding?.sykmeldingStatus.sporsmalOgSvarListe?.find((s) => s.shortName === 'FORSIKRING')?.svar?.svar ===
        'JA'
    )
}

export const harSpmOmForsikring = (valgtSykmelding?: Sykmelding) => {
    return (
        valgtSykmelding?.sykmeldingStatus.sporsmalOgSvarListe?.find((s) => s.shortName === 'FORSIKRING') !== undefined
    )
}

export const hentPerioderFørSykmelding = (valgtSykmelding?: Sykmelding) => {
    const perioder = valgtSykmelding?.sykmeldingStatus.sporsmalOgSvarListe?.find((s) => s.shortName === 'PERIODE')?.svar
        ?.svar
    if (perioder) {
        const p: TidsPeriode[] = JSON.parse(perioder)
        return p
    }
    return []
}

export const harSpmOmPerioderFørSykmelding = (valgtSykmelding?: Sykmelding) => {
    return valgtSykmelding?.sykmeldingStatus.sporsmalOgSvarListe?.find((s) => s.shortName === 'PERIODE') !== undefined
}
