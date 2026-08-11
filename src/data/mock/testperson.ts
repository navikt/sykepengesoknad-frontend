import { logger } from '@navikt/next-logger'

import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { brukertestPerosn } from './data/personas/brukertestPerosn'
import { eldreUsendtSoknad, flereEldreUsendteSoknader } from './data/personas/eldre-usendt-soknad'
import { reisetilskuddTestPerson } from './data/personas/reisetilskuddTestPerson'
import { enUsendtSykmelding, toUsendteSykmeldinger } from './data/usendte-sykmeldinger'
import {
    arbeidsledigPerson,
    arbeidstakerGradertPerson,
    arbeidstakerPeriodeVarianter_Person,
    arbeidstakerPerson,
    behandlingsdagerPerson,
    clsPerson,
    fremtidigPerson,
    frilanserPerson,
    http400vedSendSoknad,
    http403vedGetSoknad,
    http404vedPutOgGetSoknad,
    http500vedSendSoknad,
    gammelOppsummeringPerson,
    harIkkeKontonummerPerson,
    harKontonummerPerson,
    integrasjonstestPerson,
    julesoknadPerson,
    kunUtgattSoknadPerson,
    over70,
    Persona,
    reisetilskuddPerson,
    tilbakedateringer,
    utenDataPerson,
    utlandPerson,
} from './data/personas/personas'
import { utenlandskSykmeldingPerson } from './data/utenlandsk-sykmelding-person'
import { yrkesskadePerson, yrkesskadeV2Person } from './data/yrkesskade'
import { egenmeldingSykmeldingaPerson } from './data/personas/egenmeldingsdager-i-sykmeldingen'
import { selvstendigNaringsdrivendeSendtPerson, selvstendigNaringsdrivende } from './data/personas/naringsdrivende'
import { korrigeringsfristUtloptPerson } from './data/personas/korrigeringsfrist-utlopt'
import { medlemskapPerson } from './data/personas/medlemskap'
import { fiskePerson } from './data/personas/fisker'
import { kjenteInntektskilderPerson } from './data/personas/kjente-inntektskilder'
import { innenforArbeidsgiverPeriodenPerson } from './data/personas/innenfor-ag-periode'
import { oppholdUtenforEosPerson } from './data/personas/opphold-utenfor-eos-person'
import { nyttArbeidsforholdPerson } from './data/personas/nytt-arbeidsforhold'
import {
    fremtidigeFriskTilArbeidPerson,
    friskTilArbeidPerson,
    sisteSoknadFriskTilArbeidPerson,
} from './data/personas/friskmeldt-til-arbeidsformidling'

type PersonaKey =
    | 'uten-data'
    | 'arbeidstaker'
    | 'arbeidstaker-gradert'
    | 'arbeidstaker-periode-varianter'
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
    | 'nytt-arbeidsforhold'
    | 'selvstendig-naringsdrivende-sendt'
    | 'selvstendig-naringsdrivende-virksomheten-din'
    | 'innenfor-arbeidsgiver-perioden'
    | 'gammel-oppsummering'
    | 'utgatt'
    | 'julesoknad'
    | 'fta-to-fremtidige'
    | 'fta-en-ny'
    | 'fta-siste'

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export type PersonaGroupKey = 'arbeidssituasjon' | 'andre-soknader' | 'historiske-soknader'
type PersonaGroup = Record<PersonaGroupKey, PersonaData>

export function testpersoner(): PersonaData {
    let alle: PersonaData = {}
    Object.values(testpersonerGruppert()).forEach((gruppe) => {
        alle = { ...alle, ...gruppe }
    })
    alle = { ...alle, ...skjultePersoner() }

    // Valider at alle søknader har unik ID, det gjør logikken i API mye lettere da vi kan anta at alle søknadsider er unike per sesjon
    const soknadsIder = new Set<string>()
    Object.entries(alle).forEach(([key, person]) => {
        person.soknader.forEach((soknad) => {
            if (soknadsIder.has(soknad.id)) {
                const message = `Søknad med id ${soknad.id} finnes flere ganger. sist funnet i ${key}`
                logger.error(message)
                throw Error(message)
            }
            soknadsIder.add(soknad.id)
        })
    })

    return alle
}

export function testpersonerGruppert(): PersonaGroup {
    return {
        ['arbeidssituasjon']: {
            ['arbeidstaker']: jsonDeepCopy(arbeidstakerPerson),
            ['arbeidsledig']: jsonDeepCopy(arbeidsledigPerson),
            ['frilanser']: jsonDeepCopy(frilanserPerson),
            ['selvstendig-naringsdrivende']: jsonDeepCopy(selvstendigNaringsdrivende),
        },
        ['andre-soknader']: {
            ['behandlingsdager']: jsonDeepCopy(behandlingsdagerPerson),
            ['reisetilskudd']: jsonDeepCopy(reisetilskuddPerson),
            ['opphold-utenfor-eos']: jsonDeepCopy(oppholdUtenforEosPerson),
            ['uten-data']: jsonDeepCopy(utenDataPerson),
            ['medlemskap']: jsonDeepCopy(medlemskapPerson),
            ['over-70']: over70(),
        },
        ['historiske-soknader']: {
            ['kjente-inntektskilder']: jsonDeepCopy(kjenteInntektskilderPerson),
            ['yrkesskade']: jsonDeepCopy(yrkesskadePerson),
        },
    }
}

function skjultePersoner(): PersonaData {
    return {
        ['arbeidstaker-gradert']: jsonDeepCopy(arbeidstakerGradertPerson),
        ['arbeidstaker-periode-varianter']: jsonDeepCopy(arbeidstakerPeriodeVarianter_Person),
        ['fisker']: jsonDeepCopy(fiskePerson),
        ['fremtidig']: jsonDeepCopy(fremtidigPerson),
        ['bare-utland']: jsonDeepCopy(utlandPerson),
        ['utenlandsk-sykmelding']: jsonDeepCopy(utenlandskSykmeldingPerson),
        ['sykmelding-med-egenmeldingsdager']: jsonDeepCopy(egenmeldingSykmeldingaPerson),
        ['selvstendig-naringsdrivende-sendt']: jsonDeepCopy(selvstendigNaringsdrivendeSendtPerson),
        ['fta-to-fremtidige']: jsonDeepCopy(fremtidigeFriskTilArbeidPerson),
        ['fta-en-ny']: jsonDeepCopy(friskTilArbeidPerson),
        ['fta-siste']: jsonDeepCopy(sisteSoknadFriskTilArbeidPerson),
        ['julesoknad']: jsonDeepCopy(julesoknadPerson),
        ['brukertest']: jsonDeepCopy(brukertestPerosn),
        ['korrigeringsfrist-utlopt']: jsonDeepCopy(korrigeringsfristUtloptPerson),
        ['har-kontonummer']: jsonDeepCopy(harKontonummerPerson),
        ['har-ikke-kontonummer']: jsonDeepCopy(harIkkeKontonummerPerson),
        ['tilbakedateringer']: jsonDeepCopy(tilbakedateringer()),
        ['reisetilskudd-test']: jsonDeepCopy(reisetilskuddTestPerson),
        ['en-usendt-sykmelding']: jsonDeepCopy(enUsendtSykmelding),
        ['to-usendte-sykmeldinger']: jsonDeepCopy(toUsendteSykmeldinger),
        ['en-eldre-usendt-soknad']: jsonDeepCopy(eldreUsendtSoknad),
        ['to-eldre-usendte-soknader']: jsonDeepCopy(flereEldreUsendteSoknader),
        ['http-400-ved-send-soknad']: jsonDeepCopy(http400vedSendSoknad),
        ['http-403-ved-get-soknad']: jsonDeepCopy(http403vedGetSoknad),
        ['http-404-ved-put-soknad']: jsonDeepCopy(http404vedPutOgGetSoknad),
        ['http-500-ved-send-soknad']: jsonDeepCopy(http500vedSendSoknad),
        ['cummulative-layout-shift']: jsonDeepCopy(clsPerson),
        ['integrasjon-soknader']: jsonDeepCopy(integrasjonstestPerson),
        ['gammel-oppsummering']: jsonDeepCopy(gammelOppsummeringPerson),
        ['utgatt']: jsonDeepCopy(kunUtgattSoknadPerson),
        ['yrkesskade-v2']: jsonDeepCopy(yrkesskadeV2Person),
        ['nytt-arbeidsforhold']: jsonDeepCopy(nyttArbeidsforholdPerson),
        ['innenfor-arbeidsgiver-perioden']: jsonDeepCopy(innenforArbeidsgiverPeriodenPerson),
    }
}
