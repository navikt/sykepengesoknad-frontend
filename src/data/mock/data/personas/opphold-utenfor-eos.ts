import { sykmeldinger } from '../sykmeldinger'
import { arbeidstakerMedGammelEOSSporsmal } from '../soknad/arbeidstaker'
import { arbeidsledigMedNyOppholdUtenforESSporsmal } from '../soknad/arbeidsledig'
import { frilanserMedNyOppholdUtenfoeEOSSporsmal } from '../soknad/frilanser'

import { Persona } from './personas'

export const oppholdUtenforEOS: Persona = {
    soknader: [
        arbeidstakerMedGammelEOSSporsmal,
        arbeidsledigMedNyOppholdUtenforESSporsmal,
        frilanserMedNyOppholdUtenfoeEOSSporsmal,
    ],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'Opphold utenfor eøs',
}
