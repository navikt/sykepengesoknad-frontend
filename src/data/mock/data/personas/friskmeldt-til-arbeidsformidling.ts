import {
    fremtidigFriskmeldtTilArbeidsformidling1,
    fremtidigFriskmeldtTilArbeidsformidling2,
    friskmeldtTilArbeidsformidling,
} from '../soknad/friskmeldt-til-arbeidsformidling'

import { Persona } from './personas'

export const fremtidigeFriskmeldtTilArbeidsformidling: Persona = {
    soknader: [fremtidigFriskmeldtTilArbeidsformidling1, fremtidigFriskmeldtTilArbeidsformidling2],
    sykmeldinger: [],
    beskrivelse: 'To fremtidige friskmeldt til arbeidsformidling søknader',
}
export const friskmeldtTilArbeidsformidlingPersona: Persona = {
    soknader: [friskmeldtTilArbeidsformidling],
    sykmeldinger: [],
    beskrivelse: 'Søknad om sykepenger grunnet friskmeldt til arbeidsformidling',
}
