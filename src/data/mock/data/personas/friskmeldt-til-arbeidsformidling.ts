import {
    fremtidigFriskmeldtTilArbeidsformidling1,
    fremtidigFriskmeldtTilArbeidsformidling2,
} from '../soknad/friskmeldt-til-arbeidsformidling'

import { Persona } from './personas'

export const fremtidigeFriskmeldtTilArbeidsformidling: Persona = {
    soknader: [fremtidigFriskmeldtTilArbeidsformidling1, fremtidigFriskmeldtTilArbeidsformidling2],
    sykmeldinger: [],
    beskrivelse: 'To fremtidige friskmeldt til arbeidsformidling søknader',
}
