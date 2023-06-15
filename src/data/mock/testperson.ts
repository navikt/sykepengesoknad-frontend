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

export enum PersonaKeys {
    'uten-data' = 'uten-data',
    'reisetilskudd' = 'reisetilskudd',
    'utenlandsk-sykmelding' = 'utenlandsk-sykmelding',
    'yrkesskade' = 'yrkesskade',
    'opplaering' = 'opplaering',
    'nytt-arbeid-underveis' = 'nytt-arbeid-underveis',
    'alle-soknader' = 'alle-soknader',
    'en-usendt-sykmelding' = 'en-usendt-sykmelding',
    'to-usendte-sykmeldinger' = 'to-usendte-sykmeldinger',
    'en-eldre-usendt-soknad' = 'en-eldre-usendt-soknad',
    'to-eldre-usendte-soknader' = 'to-eldre-usendte-soknader',
    'bare-utland' = 'bare-utland',
    'selvstendig-naringsdrivende' = 'selvstendig-naringsdrivende',
    'brukertest' = 'brukertest',
    'har-kontonummer' = 'har-kontonummer',
    'har-ikke-kontonummer' = 'har-ikke-kontonummer',
    'egenmeldingsdager-arbeidsgiver' = 'egenmeldingsdager-arbeidsgiver',
    'sykmelding-med-egenmeldingsdager' = 'sykmelding-med-egenmeldingsdager',
    'http-400-ved-send-soknad' = 'http-400-ved-send-soknad',
    'http-500-ved-send-soknad' = 'http-500-ved-send-soknad',
    'korrigeringsfrist-utlopt' = 'korrigeringsfrist-utlopt',
}

type PersonaData = Record<PersonaKeys, Persona>

export function testpersoner(): PersonaData {
    const data: PersonaData = {
        [PersonaKeys['uten-data']]: jsonDeepCopy(utenData),
        [PersonaKeys['reisetilskudd']]: jsonDeepCopy(reisetilskudd),
        [PersonaKeys['utenlandsk-sykmelding']]: jsonDeepCopy(utenlandskSykmelding),
        [PersonaKeys['yrkesskade']]: jsonDeepCopy(yrkesskadePerson()),
        [PersonaKeys['opplaering']]: jsonDeepCopy(opplaering),
        [PersonaKeys['nytt-arbeid-underveis']]: jsonDeepCopy(nyttArbeidUnderveisPerson),
        [PersonaKeys['alle-soknader']]: jsonDeepCopy(integration),
        [PersonaKeys['en-usendt-sykmelding']]: jsonDeepCopy(enUsendtSykmelding),
        [PersonaKeys['to-usendte-sykmeldinger']]: jsonDeepCopy(toUsendteSykmeldinger),
        [PersonaKeys['en-eldre-usendt-soknad']]: jsonDeepCopy(eldreUsendtSoknad),
        [PersonaKeys['to-eldre-usendte-soknader']]: jsonDeepCopy(flereEldreUsendteSoknader),
        [PersonaKeys['bare-utland']]: jsonDeepCopy(bareUtland),
        [PersonaKeys['selvstendig-naringsdrivende']]: jsonDeepCopy(selvstendigNaringsdrivende),
        [PersonaKeys['brukertest']]: jsonDeepCopy(brukertest),
        [PersonaKeys['har-kontonummer']]: jsonDeepCopy(harKontonummer),
        [PersonaKeys['har-ikke-kontonummer']]: jsonDeepCopy(harIkkeKontonummer),
        [PersonaKeys['egenmeldingsdager-arbeidsgiver']]: jsonDeepCopy(egenmeldingsdagerArbeidsgiver),
        [PersonaKeys['sykmelding-med-egenmeldingsdager']]: jsonDeepCopy(egenmeldingSykmeldingaPerson),
        [PersonaKeys['http-400-ved-send-soknad']]: jsonDeepCopy(får400vedSendSoknad),
        [PersonaKeys['http-500-ved-send-soknad']]: jsonDeepCopy(får500vedSendSoknad),
        [PersonaKeys['korrigeringsfrist-utlopt']]: jsonDeepCopy(korrigeringsfristUtloptPerson),
    }

    // Valider at alle søknader har unik ID, det gjør logikken i API mye lettere da vi kan anta at alle søknadsider er unike per sesjon
    const soknadsIder = new Set<string>()
    Object.keys(data).forEach((key) => {
        const person = data[key as PersonaKeys]
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
