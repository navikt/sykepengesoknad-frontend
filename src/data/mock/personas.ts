import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../types/sykmelding'
import { soknaderReisetilskudd } from './data/reisetilskudd'
import { soknaderIntegration } from './data/soknader-integration'
import { soknaderOpplaering } from './data/soknader-opplaering'
import { sykmeldinger } from './data/sykmeldinger'

export interface Persona {
    soknader: RSSoknad[]
    sykmeldinger: Sykmelding[]
}

export const utenData: Persona = {
    soknader: [],
    sykmeldinger: [],
}

export const reisetilskudd: Persona = {
    soknader: [...soknaderReisetilskudd],
    sykmeldinger: sykmeldinger,
}

export const opplaering: Persona = {
    soknader: [...soknaderOpplaering, ...soknaderReisetilskudd],
    sykmeldinger: sykmeldinger,
}
export const alleData: Persona = {
    soknader: [
        ...soknaderIntegration,
        ...soknaderOpplaering,
        ...soknaderReisetilskudd,
    ],
    sykmeldinger: sykmeldinger,
}
