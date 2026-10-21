import { sykmeldinger } from '../sykmeldinger'
import { arbeidstakerMedGammelEOSSporsmal } from '../soknad/arbeidstaker'

import { Persona } from './personas'

export const oppholdUtenforEosPerson: Persona = {
    soknader: [{ ...arbeidstakerMedGammelEOSSporsmal, demoinfo: 'Arbeidstaker med gammelt EØS-spørsmål' }],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'Beholde sykepengene utenfor EU/EØS',
}
