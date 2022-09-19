import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../types/sykmelding'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { soknaderReisetilskudd } from './data/reisetilskudd'
import { soknaderIntegration } from './data/soknader-integration'
import { arbeidstaker, oppholdUtland, soknaderOpplaering } from './data/soknader-opplaering'
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
    soknader: soknaderOpplaering,
    sykmeldinger: sykmeldinger,
}
export const alleData: Persona = {
    // Alle søknader filtrert på unik id
    soknader: [...soknaderIntegration, ...soknaderOpplaering, ...soknaderReisetilskudd].filter(
        (value, index, array) => array.findIndex((a) => a.id === value.id) === index
    ),
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
    usendt.id = 'SKAL_IKKE_SENDES_TIL_DENNE'

    const eldsteUsendte = jsonDeepCopy(arbeidstaker100Syk)
    eldsteUsendte.sykmeldingStatus.statusEvent = 'APEN'
    eldsteUsendte.mottattTidspunkt = new Date()
    eldsteUsendte.id = 'APEN'
    eldsteUsendte.sykmeldingsperioder[0].fom = '2018-04-01' as any

    return {
        soknader: [arbeidstaker],
        sykmeldinger: [arbeidstaker100Syk, usendt, eldsteUsendte],
    } as Persona
}

export const bareUtland = () => {
    return {
        soknader: [oppholdUtland],
        sykmeldinger: [arbeidstaker100Syk],
    } as Persona
}
