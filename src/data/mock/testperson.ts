import { brukertest } from './data/brukertest'
import { eldreUsendtSoknad, flereEldreUsendteSoknader } from './data/eldre-usendt-soknad'
import { bareUtland } from './data/opphold-utland'
import { opplaering } from './data/opplaering'
import { reisetilskudd } from './data/reisetilskudd'
import { enUsendtSykmelding, toUsendteSykmeldinger } from './data/usendte-sykmeldinger'
import {
    alleData,
    får400vedSendSoknad,
    får500vedSendSoknad,
    harIkkeKontonummer,
    harKontonummer,
    Persona,
    utenData,
} from './personas'
import { egenmeldingsdagerArbeidsgiver } from './data/kort-soknad'
import { nyttArbeidUnderveisPerson } from './data/nytt-arbeidunderveis'
import { utenlandskSykmelding } from './data/utenlandsk-sykmelding'
import { yrkesskadePerson } from './data/yrkesskade'

export interface StringFunctionMap {
    [index: string]: () => Persona
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    reisetilskudd: () => reisetilskudd,
    'utenlandsk sykmelding': () => utenlandskSykmelding,
    yrkesskade: () => yrkesskadePerson,
    opplaering: () => opplaering,
    'nytt-arbeid-underveis': () => nyttArbeidUnderveisPerson,
    'alle-soknader': () => alleData,
    'en-usendt-sykmelding': () => enUsendtSykmelding,
    'to-usendte-sykmeldinger': () => toUsendteSykmeldinger,
    'en-eldre-usendt-soknad': () => eldreUsendtSoknad,
    'to-eldre-usendte-soknader': () => flereEldreUsendteSoknader,
    'bare-utland': () => bareUtland,
    brukertest: () => brukertest,
    'har kontonummer': () => harKontonummer,
    'har ikke kontonummer': () => harIkkeKontonummer,
    'egenmeldingsdager arbeidsgiver': () => egenmeldingsdagerArbeidsgiver,
    'http 400 ved send soknad': () => får400vedSendSoknad,
    'http 500 ved send soknad': () => får500vedSendSoknad,
}

export function hentTestperson(url?: string): Persona | null {
    const parsetUrl = new URL(`https://test${url}`)

    const testperson = parsetUrl.searchParams.get('testperson')
    if (!testperson) {
        return null
    }
    return personas[testperson]()
}
