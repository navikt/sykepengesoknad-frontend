import { logger } from '@navikt/next-logger'

import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { brukertest } from './data/brukertest'
import { eldreUsendtSoknad, flereEldreUsendteSoknader } from './data/eldre-usendt-soknad'
import { bareUtland } from './data/opphold-utland'
import { reisetilskudd } from './data/reisetilskudd'
import { enUsendtSykmelding, toUsendteSykmeldinger } from './data/usendte-sykmeldinger'
import {
    får400vedSendSoknad,
    får500vedSendSoknad,
    harIkkeKontonummer,
    harKontonummer,
    integration,
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
    'alle-soknader': () => integration,
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
    'korrigeringsfrist-utlopt': () => korrigeringsfristUtloptPerson,
}

export function testpersoner(): { [index: string]: Persona } {
    const data: { [index: string]: Persona } = {
        'uten-data': jsonDeepCopy(utenData),
        reisetilskudd: jsonDeepCopy(reisetilskudd),
        'utenlandsk sykmelding': jsonDeepCopy(utenlandskSykmelding),
        yrkesskade: jsonDeepCopy(yrkesskadePerson),
        opplaering: jsonDeepCopy(opplaering),
        'nytt-arbeid-underveis': jsonDeepCopy(nyttArbeidUnderveisPerson),
        'alle-soknader': jsonDeepCopy(integration),
        'en-usendt-sykmelding': jsonDeepCopy(enUsendtSykmelding),
        'to-usendte-sykmeldinger': jsonDeepCopy(toUsendteSykmeldinger),
        'en-eldre-usendt-soknad': jsonDeepCopy(eldreUsendtSoknad),
        'to-eldre-usendte-soknader': jsonDeepCopy(flereEldreUsendteSoknader),
        'bare-utland': jsonDeepCopy(bareUtland),
        'selvstendig-naringsdrivende': jsonDeepCopy(selvstendigNaringsdrivende),
        brukertest: jsonDeepCopy(brukertest),
        'har kontonummer': jsonDeepCopy(harKontonummer),
        'har ikke kontonummer': jsonDeepCopy(harIkkeKontonummer),
        'egenmeldingsdager arbeidsgiver': jsonDeepCopy(egenmeldingsdagerArbeidsgiver),
        'sykmelding med egenmeldingsdager': jsonDeepCopy(egenmeldingSykmeldingaPerson),
        'http 400 ved send soknad': jsonDeepCopy(får400vedSendSoknad),
        'http 500 ved send soknad': jsonDeepCopy(får500vedSendSoknad),
        'korrigeringsfrist-utlopt': jsonDeepCopy(korrigeringsfristUtloptPerson),
    }

    // Valider at alle søknader har unik ID, det gjør logikken i API mye lettere da vi kan anta at alle søknadsider er unike per sesjon
    const soknadsIder = new Set<string>()
    Object.keys(data).forEach((key) => {
        const person = data[key]
        person.soknader.forEach((soknad) => {
            if (soknadsIder.has(soknad.id)) {
                const message = `Søknad med id ${soknad.id} finnes flere ganger. sist funnet i ${key}`
                logger.error(message)
                throw Error(message)
            }
            soknadsIder.add(soknad.id)
        })
    })
    return data
}

export function hentTestperson(url?: string): Persona | null {
    const parsetUrl = new URL(`https://test${url}`)

    const testperson = parsetUrl.searchParams.get('testperson')
    if (!testperson) {
        return null
    }
    return personas[testperson]()
}
