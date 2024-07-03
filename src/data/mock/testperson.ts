import { logger } from '@navikt/next-logger'

import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { brukertest } from './data/personas/brukertest'
import { eldreUsendtSoknad, flereEldreUsendteSoknader } from './data/personas/eldre-usendt-soknad'
import { reisetilskuddTestPerson } from './data/personas/reisetilskuddTestPerson'
import { enUsendtSykmelding, toUsendteSykmeldinger } from './data/usendte-sykmeldinger'
import {
    arbeidsledigPerson,
    arbeidstakerPerson,
    behandlingsdagerPerson,
    clsPerson,
    fremtidigPerson,
    frilanserPerson,
    får400vedSendSoknad,
    får403vedGetSoknad,
    får404vedPutOgGetSoknad,
    får500vedSendSoknad,
    harIkkeKontonummer,
    harKontonummer,
    integration,
    over70,
    Persona,
    reisetilskuddPerson,
    tilbakedateringer,
    utenData,
    utlandPerson,
} from './data/personas/personas'
import { opprettetAvInntektsmelding } from './data/personas/opprettet-av-inntektsmelding'
import { utenlandskSykmelding } from './data/utenlandsk-sykmelding'
import { yrkesskadePerson, yrkesskadeV2Person } from './data/yrkesskade'
import { egenmeldingSykmeldingaPerson } from './data/personas/egenmeldingsdager-i-sykmeldingen'
import { selvstendigNaringsdrivende, selvstendigNaringsdrivendeSendt } from './data/personas/naringsdrivende'
import { korrigeringsfristUtloptPerson } from './data/personas/korrigeringsfrist-utlopt'
import { medlemskapPerson } from './data/personas/medlemskap'
import { fiskePerson } from './data/personas/fisker'
import { kjenteInntektskilderPerson } from './data/personas/kjente-inntektskilder'
import { innenforAgPerioden } from './data/personas/innenfor-ag-periode'
import { oppholdUtenforEOS } from './data/personas/opphold-utenfor-eos'

type PersonaKey =
    | 'uten-data'
    | 'arbeidstaker'
    | 'arbeidsledig'
    | 'reisetilskudd'
    | 'reisetilskudd-test'
    | 'frilanser'
    | 'fisker'
    | 'behandlingsdager'
    | 'fremtidig'
    | 'utenlandsk-sykmelding'
    | 'yrkesskade'
    | 'yrkesskade-v2'
    | 'medlemskap'
    | 'opphold-utenfor-eos'
    | 'over-70'
    | 'integrasjon-soknader'
    | 'en-usendt-sykmelding'
    | 'to-usendte-sykmeldinger'
    | 'en-eldre-usendt-soknad'
    | 'to-eldre-usendte-soknader'
    | 'bare-utland'
    | 'selvstendig-naringsdrivende'
    | 'brukertest'
    | 'har-kontonummer'
    | 'har-ikke-kontonummer'
    | 'egenmeldingsdager-arbeidsgiver'
    | 'sykmelding-med-egenmeldingsdager'
    | 'http-400-ved-send-soknad'
    | 'http-403-ved-get-soknad'
    | 'http-404-ved-put-soknad'
    | 'http-500-ved-send-soknad'
    | 'korrigeringsfrist-utlopt'
    | 'kjente-inntektskilder'
    | 'cummulative-layout-shift'
    | 'tilbakedateringer'
    | 'selvstendig-naringsdrivende-sendt'
    | 'innenfor-arbeidsgiver-perioden'

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export type PersonaGroupKey = 'soknad-typer' | 'soknad-sporsmal' | 'medlemskap-sporsmal' | 'testing'
type PersonaGroup = Record<PersonaGroupKey, PersonaData>

export function testpersoner(): PersonaData {
    let alle: PersonaData = {}
    Object.values(testpersonerGruppert()).forEach((group) => {
        alle = { ...alle, ...group }
    })
    return alle
}

export function testpersonerGruppert(): PersonaGroup {
    const data: PersonaGroup = {
        ['soknad-typer']: {
            ['arbeidstaker']: jsonDeepCopy(arbeidstakerPerson),
            ['arbeidsledig']: jsonDeepCopy(arbeidsledigPerson),
            ['selvstendig-naringsdrivende']: jsonDeepCopy(selvstendigNaringsdrivende),
            ['selvstendig-naringsdrivende-sendt']: jsonDeepCopy(selvstendigNaringsdrivendeSendt),
            ['frilanser']: jsonDeepCopy(frilanserPerson),
            ['fisker']: jsonDeepCopy(fiskePerson),
            ['behandlingsdager']: jsonDeepCopy(behandlingsdagerPerson),
            ['reisetilskudd']: jsonDeepCopy(reisetilskuddPerson),
            ['bare-utland']: jsonDeepCopy(utlandPerson),
            ['fremtidig']: jsonDeepCopy(fremtidigPerson),
            ['uten-data']: jsonDeepCopy(utenData),
            ['innenfor-arbeidsgiver-perioden']: jsonDeepCopy(innenforAgPerioden),
        },
        ['soknad-sporsmal']: {
            ['opphold-utenfor-eos']: jsonDeepCopy(oppholdUtenforEOS),
            ['kjente-inntektskilder']: jsonDeepCopy(kjenteInntektskilderPerson),
            ['yrkesskade']: jsonDeepCopy(yrkesskadePerson),
            ['yrkesskade-v2']: jsonDeepCopy(yrkesskadeV2Person),
            ['utenlandsk-sykmelding']: jsonDeepCopy(utenlandskSykmelding),
            ['brukertest']: jsonDeepCopy(brukertest),
            ['egenmeldingsdager-arbeidsgiver']: jsonDeepCopy(opprettetAvInntektsmelding),
            ['sykmelding-med-egenmeldingsdager']: jsonDeepCopy(egenmeldingSykmeldingaPerson),
        },
        ['medlemskap-sporsmal']: {
            ['medlemskap']: jsonDeepCopy(medlemskapPerson),
        },
        ['testing']: {
            ['over-70']: over70(),
            ['korrigeringsfrist-utlopt']: jsonDeepCopy(korrigeringsfristUtloptPerson),
            ['har-kontonummer']: jsonDeepCopy(harKontonummer),
            ['har-ikke-kontonummer']: jsonDeepCopy(harIkkeKontonummer),
            ['tilbakedateringer']: jsonDeepCopy(tilbakedateringer()),
            ['reisetilskudd-test']: jsonDeepCopy(reisetilskuddTestPerson),
            ['en-usendt-sykmelding']: jsonDeepCopy(enUsendtSykmelding),
            ['to-usendte-sykmeldinger']: jsonDeepCopy(toUsendteSykmeldinger),
            ['en-eldre-usendt-soknad']: jsonDeepCopy(eldreUsendtSoknad),
            ['to-eldre-usendte-soknader']: jsonDeepCopy(flereEldreUsendteSoknader),
            ['http-400-ved-send-soknad']: jsonDeepCopy(får400vedSendSoknad),
            ['http-403-ved-get-soknad']: jsonDeepCopy(får403vedGetSoknad),
            ['http-404-ved-put-soknad']: jsonDeepCopy(får404vedPutOgGetSoknad),
            ['http-500-ved-send-soknad']: jsonDeepCopy(får500vedSendSoknad),
            ['cummulative-layout-shift']: jsonDeepCopy(clsPerson),
            ['integrasjon-soknader']: jsonDeepCopy(integration),
        },
    }

    // Valider at alle søknader har unik ID, det gjør logikken i API mye lettere da vi kan anta at alle søknadsider er unike per sesjon
    const soknadsIder = new Set<string>()
    Object.values(data).forEach((group) => {
        Object.entries(group).forEach(([key, person]) => {
            person.soknader.forEach((soknad) => {
                if (soknadsIder.has(soknad.id)) {
                    const message = `Søknad med id ${soknad.id} finnes flere ganger. sist funnet i ${key}`
                    logger.error(message)
                    throw Error(message)
                }
                soknadsIder.add(soknad.id)
            })
        })
    })

    return data
}
