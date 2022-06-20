import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../types/sykmelding'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { soknaderReisetilskudd } from './data/reisetilskudd'
import { soknaderIntegration } from './data/soknader-integration'
import { arbeidstaker, soknaderOpplaering } from './data/soknader-opplaering'
import { arbeidstaker100Syk, sykmeldinger } from './data/sykmeldinger'

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

export const enUsendtSykmelding = () => {
    const usendt = jsonDeepCopy(arbeidstaker100Syk)
    usendt.sykmeldingStatus.statusEvent = 'APEN'
    usendt.mottattTidspunkt = new Date()
    usendt.id = 'APEN'
    return {
        soknader: [arbeidstaker],
        sykmeldinger: [arbeidstaker100Syk, usendt],
    } as Persona
}

export const toUsendteSykmeldinger = () => {
    const usendt = jsonDeepCopy(arbeidstaker100Syk)
    usendt.sykmeldingStatus.statusEvent = 'APEN'
    usendt.mottattTidspunkt = new Date()
    return {
        soknader: [arbeidstaker],
        sykmeldinger: [arbeidstaker100Syk, usendt, usendt],
    } as Persona
}
