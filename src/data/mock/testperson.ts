import { brukertest } from './data/brukertest'
import { eldreUsendtSoknad, flereEldreUsendteSoknader } from './data/eldre-usendt-soknad'
import {
    alleData,
    bareUtland,
    enUsendtSykmelding,
    opplaering,
    Persona,
    reisetilskudd,
    toUsendteSykmeldinger,
    utenData,
} from './personas'

export interface StringFunctionMap {
    [index: string]: () => Persona
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    reisetilskudd: () => reisetilskudd,
    opplaering: () => opplaering,
    'alle-soknader': () => alleData,
    'en-usendt-sykmelding': () => enUsendtSykmelding(),
    'to-usendte-sykmeldinger': () => toUsendteSykmeldinger(),
    'en-eldre-usendt-soknad': () => eldreUsendtSoknad,
    'to-eldre-usendte-soknader': () => flereEldreUsendteSoknader,
    'bare-utland': () => bareUtland(),
    brukertest: () => brukertest(),
}
