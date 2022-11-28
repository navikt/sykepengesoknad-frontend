import { brukertest } from './data/brukertest'
import { eldreUsendtSoknad, flereEldreUsendteSoknader } from './data/eldre-usendt-soknad'
import { bareUtland } from './data/opphold-utland'
import { opplaering } from './data/opplaering'
import { reisetilskudd } from './data/reisetilskudd'
import { enUsendtSykmelding, toUsendteSykmeldinger } from './data/usendte-sykmeldinger'
import { alleData, harIkkeKontonummer, harKontonummer, Persona, utenData } from './personas'

export interface StringFunctionMap {
    [index: string]: () => Persona
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    reisetilskudd: () => reisetilskudd,
    opplaering: () => opplaering,
    'alle-soknader': () => alleData,
    'en-usendt-sykmelding': () => enUsendtSykmelding,
    'to-usendte-sykmeldinger': () => toUsendteSykmeldinger,
    'en-eldre-usendt-soknad': () => eldreUsendtSoknad,
    'to-eldre-usendte-soknader': () => flereEldreUsendteSoknader,
    'bare-utland': () => bareUtland,
    brukertest: () => brukertest,
    'har kontonummer': () => harKontonummer,
    'har ikke kontonummer': () => harIkkeKontonummer,
}

export function hentTestperson(url?: string): Persona | null {
    const parsetUrl = new URL(`https://test${url}`)

    const testperson = parsetUrl.searchParams.get('testperson')
    if (!testperson) {
        return null
    }
    return personas[testperson]()
}
