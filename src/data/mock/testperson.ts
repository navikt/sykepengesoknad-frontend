import {
    alleData,
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
}
