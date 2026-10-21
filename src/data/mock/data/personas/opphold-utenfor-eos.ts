import { sykmeldinger } from '../sykmeldinger'
import { arbeidstakerMedGammelEOSSporsmal } from '../soknad/arbeidstaker'
import { frilanserMedNyOppholdUtenfoeEOSSporsmal } from '../soknad/frilanser'

import { Persona } from './personas'

export const oppholdUtenforEosPerson: Persona = {
    soknader: [
        { ...arbeidstakerMedGammelEOSSporsmal, demoinfo: 'Arbeidstaker med gammelt EØS-spørsmål' },
        { ...frilanserMedNyOppholdUtenfoeEOSSporsmal, demoinfo: 'Frilanser med nytt EU/EØS-spørsmål' },
    ],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'Beholde sykepengene utenfor EU/EØS',
}
