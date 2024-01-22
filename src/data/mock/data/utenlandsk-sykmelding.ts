import { RSSporsmal } from '../../../types/rs-types/rs-sporsmal'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { Persona } from './personas/personas'
import { brukertestSoknad, brukertestSykmelding } from './personas/brukertestOld'
import { utenlandskSykmeldingSporsmalene } from './sporsmal/utenlandsk-sykmelding-sporsmalene'

export const soknadTilUtenlandskSykmelding = deepcopyMedNyId(brukertestSoknad, '3708c4de-d16c-4835-841b-a6716b6d39e9')
soknadTilUtenlandskSykmelding.utenlandskSykmelding = true
const sporsmalene: RSSporsmal[] = []
sporsmalene.push(soknadTilUtenlandskSykmelding.sporsmal[0])
sporsmalene.push(...utenlandskSykmeldingSporsmalene)
sporsmalene.push(...soknadTilUtenlandskSykmelding.sporsmal.slice(1))

soknadTilUtenlandskSykmelding.sporsmal = sporsmalene

export const utenlandskSykmelding: Persona = {
    soknader: [soknadTilUtenlandskSykmelding],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Utlansk sykmelding spørsmål i søknaden',
}
