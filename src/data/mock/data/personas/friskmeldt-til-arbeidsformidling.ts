import {
    fremtidigFriskmeldtTilArbeidsformidling1,
    fremtidigFriskmeldtTilArbeidsformidling2,
    nyFriskmeldtTilArbeidsformidling,
} from '../soknad/friskmeldt-til-arbeidsformidling'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { Persona } from './personas'

export const fremtidigeFriskTilArbeidPerson: Persona = {
    soknader: [fremtidigFriskmeldtTilArbeidsformidling1, fremtidigFriskmeldtTilArbeidsformidling2],
    sykmeldinger: [],
    beskrivelse: 'To fremtidige friskmeldt til arbeidsformidling søknader',
}
export const friskTilArbeidPerson: Persona = {
    soknader: [
        nyFriskmeldtTilArbeidsformidling({
            fom: '2025-03-31',
            tom: '2025-04-13',
            uuid: '7e89c042-a822-40e6-bb4c-d04fe5f12685',
            sisteSoknad: false,
        }),
        deepcopyMedNyId(fremtidigFriskmeldtTilArbeidsformidling2, '3a5ca70f-d14c-4012-aaab-21dcaa019d4a'),
        deepcopyMedNyId(fremtidigFriskmeldtTilArbeidsformidling1, '3a5ca70f-d14c-4012-aaab-21dcaa019d4b'),
    ],
    sykmeldinger: [],
    beskrivelse: 'Søknad om sykepenger grunnet friskmeldt til arbeidsformidling',
}

export const sisteSoknadFriskTilArbeidPerson: Persona = {
    soknader: [
        nyFriskmeldtTilArbeidsformidling({
            fom: '2025-03-31',
            tom: '2025-04-13',
            uuid: 'ac0ff5c0-e6bc-416d-b5d9-dfa3654e9f26',
            sisteSoknad: true,
        }),
    ],
    sykmeldinger: [],
    beskrivelse: 'Siste søknad i vedtaksperiode om sykepenger grunnet friskmeldt til arbeidsformidling',
}
