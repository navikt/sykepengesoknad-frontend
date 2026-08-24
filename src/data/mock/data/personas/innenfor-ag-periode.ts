import { skapSoknad, skapSykmelding } from '../testadataGeneratorFunksjoner'

import type { Persona } from './personas'

const hovedjobb = 'Borettslaget AS'
const fom = '2024-04-08'
const tom = '2024-04-11'

export function lagInnenforArbeidsgiverperiodenSykmelding(opts: { fom: string; tom: string; id: string }) {
    return skapSykmelding({ fom: opts.fom, tom: opts.tom, hovedjobb, id: opts.id })
}

export function lagInnenforArbeidsgiverperiodenSoknad(opts: {
    fom: string
    tom: string
    soknadId: string
    sykmeldingId: string
    opprettetDato?: string
}) {
    return skapSoknad({
        fom: opts.fom,
        tom: opts.tom,
        hovedjobb,
        sykmeldingId: opts.sykmeldingId,
        soknadId: opts.soknadId,
        opprettetDato: opts.opprettetDato,
    })
}

export const innenforArbeidsgiverperiodenSykmelding = lagInnenforArbeidsgiverperiodenSykmelding({
    fom,
    tom,
    id: '147ece1a-d05e-42d2-b2ec-6ab38a4a85e4',
})

export const soknadInnenforArbeidsgiverperioden = lagInnenforArbeidsgiverperiodenSoknad({
    fom,
    tom,
    sykmeldingId: innenforArbeidsgiverperiodenSykmelding.id,
    soknadId: '73f690c5-5b80-45bd-a270-179f5241ee60',
})

export const innenforArbeidsgiverPeriodenPerson: Persona = {
    soknader: [soknadInnenforArbeidsgiverperioden],
    sykmeldinger: [innenforArbeidsgiverperiodenSykmelding],
    beskrivelse: 'Kort søknad innenfor arbeidsgiverperioden',
}
