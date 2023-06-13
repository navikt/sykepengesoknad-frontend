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
    'UtenData' = 'uten-data',
    'Reisetilskudd' = 'reisetilskudd',
    'UtenlandskSykmelding' = 'utenlandsk sykmelding',
    'Yrkesskade' = 'yrkesskade',
    'Opplaering' = 'opplaering',
    'NyttArbeidUnderveis' = 'nytt-arbeid-underveis',
    'AlleSoknader' = 'alle-soknader',
    'EnUsendtSykmelding' = 'en-usendt-sykmelding',
    'ToUsendteSykmeldinger' = 'to-usendte-sykmeldinger',
    'EnEldreUsendtSoknad' = 'en-eldre-usendt-soknad',
    'ToEldreUsendteSoknader' = 'to-eldre-usendte-soknader',
    'BareUtland' = 'bare-utland',
    'SelvstendigNaringsdrivende' = 'selvstendig-naringsdrivende',
    'Brukertest' = 'brukertest',
    'HarKontonummer' = 'har kontonummer',
    'HarIkkeKontonummer' = 'har ikke kontonummer',
    'EgenmeldingsdagerArbeidsgiver' = 'egenmeldingsdager arbeidsgiver',
    'SykmeldingMedEgenmeldingsdager' = 'sykmelding med egenmeldingsdager',
    'Http400VedSendSoknad' = 'http 400 ved send soknad',
    'Http500VedSendSoknad' = 'http 500 ved send soknad',
    'KorrigeringsfristUtlopt' = 'korrigeringsfrist-utlopt',
}
type PersonaData = Record<PersonaKeys, Persona>

export function testpersoner(): PersonaData {
    const data: PersonaData = {
        [PersonaKeys.UtenData]: jsonDeepCopy(utenData),
        [PersonaKeys.Reisetilskudd]: jsonDeepCopy(reisetilskudd),
        [PersonaKeys.UtenlandskSykmelding]: jsonDeepCopy(utenlandskSykmelding),
        [PersonaKeys.Yrkesskade]: jsonDeepCopy(yrkesskadePerson),
        [PersonaKeys.Opplaering]: jsonDeepCopy(opplaering),
        [PersonaKeys.NyttArbeidUnderveis]: jsonDeepCopy(nyttArbeidUnderveisPerson),
        [PersonaKeys.AlleSoknader]: jsonDeepCopy(integration),
        [PersonaKeys.EnUsendtSykmelding]: jsonDeepCopy(enUsendtSykmelding),
        [PersonaKeys.ToUsendteSykmeldinger]: jsonDeepCopy(toUsendteSykmeldinger),
        [PersonaKeys.EnEldreUsendtSoknad]: jsonDeepCopy(eldreUsendtSoknad),
        [PersonaKeys.ToEldreUsendteSoknader]: jsonDeepCopy(flereEldreUsendteSoknader),
        [PersonaKeys.BareUtland]: jsonDeepCopy(bareUtland),
        [PersonaKeys.SelvstendigNaringsdrivende]: jsonDeepCopy(selvstendigNaringsdrivende),
        [PersonaKeys.Brukertest]: jsonDeepCopy(brukertest),
        [PersonaKeys.HarKontonummer]: jsonDeepCopy(harKontonummer),
        [PersonaKeys.HarIkkeKontonummer]: jsonDeepCopy(harIkkeKontonummer),
        [PersonaKeys.EgenmeldingsdagerArbeidsgiver]: jsonDeepCopy(egenmeldingsdagerArbeidsgiver),
        [PersonaKeys.SykmeldingMedEgenmeldingsdager]: jsonDeepCopy(egenmeldingSykmeldingaPerson),
        [PersonaKeys.Http400VedSendSoknad]: jsonDeepCopy(får400vedSendSoknad),
        [PersonaKeys.Http500VedSendSoknad]: jsonDeepCopy(får500vedSendSoknad),
        [PersonaKeys.KorrigeringsfristUtlopt]: jsonDeepCopy(korrigeringsfristUtloptPerson),
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
