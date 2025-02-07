import {
    fremtidigFriskmeldtTilArbeidsformidling1,
    fremtidigFriskmeldtTilArbeidsformidling2,
    friskmeldtTilArbeidsformidling,
} from '../soknad/friskmeldt-til-arbeidsformidling'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { Persona } from './personas'

export const fremtidigeFriskmeldtTilArbeidsformidling: Persona = {
    soknader: [fremtidigFriskmeldtTilArbeidsformidling1, fremtidigFriskmeldtTilArbeidsformidling2],
    sykmeldinger: [],
    beskrivelse: 'To fremtidige friskmeldt til arbeidsformidling søknader',
}
export const friskmeldtTilArbeidsformidlingPersona: Persona = {
    soknader: [
        friskmeldtTilArbeidsformidling,
        deepcopyMedNyId(fremtidigFriskmeldtTilArbeidsformidling2, '3a5ca70f-d14c-4012-aaab-21dcaa019d4a'),
    ],
    sykmeldinger: [],
    beskrivelse: 'Søknad om sykepenger grunnet friskmeldt til arbeidsformidling',
}
