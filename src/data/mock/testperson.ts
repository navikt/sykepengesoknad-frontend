import { brukertest } from './data/brukertest'
import { eldreUsendtSoknad, flereEldreUsendteSoknader } from './data/eldre-usendt-soknad'
import { bareUtland } from './data/opphold-utland'
import { reisetilskudd } from './data/reisetilskudd'
import { enUsendtSykmelding, toUsendteSykmeldinger } from './data/usendte-sykmeldinger'
import {
    alleData,
    får400vedSendSoknad,
    får500vedSendSoknad,
    harIkkeKontonummer,
    harKontonummer,
    opplaering,
    Persona,
    utenData,
} from './personas'
import { egenmeldingsdagerArbeidsgiver } from './data/kort-soknad'
import { nyttArbeidUnderveisPerson } from './data/nytt-arbeidunderveis'
import { utenlandskSykmelding } from './data/utenlandsk-sykmelding'
import { yrkesskadePerson } from './data/yrkesskade'
import { egenmeldingSykmeldingaPerson } from './data/egenmeldingsdager-i-sykmeldingen'
import { selvstendigNaringsdrivende } from './data/naringsdrivende'
import { korrigeringsfristUtloptPerson } from './data/korrigeringsfrist-utlopt'

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
    'selvstendig-naringsdrivende': () => selvstendigNaringsdrivende,
    brukertest: () => brukertest,
    'har kontonummer': () => harKontonummer,
    'har ikke kontonummer': () => harIkkeKontonummer,
    'egenmeldingsdager arbeidsgiver': () => egenmeldingsdagerArbeidsgiver,
    'sykmelding med egenmeldingsdager': () => egenmeldingSykmeldingaPerson,
    'http 400 ved send soknad': () => får400vedSendSoknad,
    'http 500 ved send soknad': () => får500vedSendSoknad,
    'koirrigeringsfrist-utlopt': () => korrigeringsfristUtloptPerson,
}

export function hentTestperson(url?: string): Persona | null {
    const parsetUrl = new URL(`https://test${url}`)

    const testperson = parsetUrl.searchParams.get('testperson')
    if (!testperson) {
        return null
    }
    return personas[testperson]()
}
