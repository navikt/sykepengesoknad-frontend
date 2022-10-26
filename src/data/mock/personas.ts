import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../types/sykmelding'
import { soknaderOpplaering } from './data/opplaering'
import { soknaderReisetilskudd } from './data/reisetilskudd'
import { soknaderIntegration } from './data/soknader-integration'
import { sykmeldinger } from './data/sykmeldinger'

export interface Persona {
    soknader: RSSoknad[]
    sykmeldinger: Sykmelding[]
}

export const utenData: Persona = {
    soknader: [],
    sykmeldinger: [],
}

export const alleData: Persona = {
    // Alle søknader filtrert på unik id
    soknader: [...soknaderIntegration, ...soknaderOpplaering, ...soknaderReisetilskudd].filter(
        (value, index, array) => array.findIndex((a) => a.id === value.id) === index
    ),
    sykmeldinger: sykmeldinger,
}
