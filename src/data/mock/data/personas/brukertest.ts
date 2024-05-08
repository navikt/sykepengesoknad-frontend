import { skapSoknad, skapSykmelding } from '../testadataGeneratorFunksjoner'

import { Persona } from './personas'

const url = typeof window === 'undefined' ? new URL('http://test') : new URL(window.location.href)

const hovedjobb = url.searchParams.get('hovedjobb') ?? 'MATBUTIKKEN AS'
const fom = url.searchParams.get('fom') ?? '2022-09-08'
const tom = url.searchParams.get('tom') ?? '2022-09-21'

export const brukertestSykmelding = skapSykmelding({
    fom,
    tom,
    hovedjobb,
    id: 'abc5acf2-a44f-42e5-87b2-02c9d0b39ce8',
})

export const brukertestSoknad = skapSoknad({
    fom,
    tom,
    hovedjobb,
    sykmeldingId: brukertestSykmelding.id,
    soknadId: '963e816f-7b3c-4513-818b-95595d84dd91',
})

export const brukertest: Persona = {
    soknader: [brukertestSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Brukertest',
}
