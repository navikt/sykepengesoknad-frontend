import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../types/sykmelding'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { arbeidsledig, arbeidstaker, arbeidstakerGradert, behandlingsdager, fremtidigSoknad } from './data/opplaering'
import { gradertReisetilskudd, nyttReisetilskudd, soknaderReisetilskudd } from './data/reisetilskudd'
import {
    arbeidsledigKvittering,
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdKvittering,
    arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger,
    arbeidstakerTilKorrigering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdKvittering,
    avbruttSoknad,
    delvisUtfylltArbeidsledig,
    foranArbeidstakerMedOppholdKvittering,
    oppholdUtlandKvittering,
    selvstendigKvittering,
    sendtArbeidsledig,
    sendtArbeidsledigKvittering,
    sok6,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
    soknadSomTriggerSporsmalFinnesIkkeISoknad,
    utgattSoknad,
} from './data/soknader-integration'
import { syk7, sykmeldinger } from './data/sykmeldinger'
import { brukertestSoknad } from './data/brukertest'
import { veldigLangSoknad } from './data/veldig-land-soknad'
import { oppholdUtland } from './data/opphold-utland'
import { frilanser } from './data/frilanser'

export interface Persona {
    soknader: RSSoknad[]
    sykmeldinger: Sykmelding[]
    kontonummer?: string
}

export const utenData: Persona = {
    soknader: [],
    sykmeldinger: [],
}

const kortSoknadMedID = (id: string) => {
    const soknad = jsonDeepCopy(arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering)
    soknad.id = id
    return soknad
}
export const får400vedSendSoknad: Persona = {
    soknader: [kortSoknadMedID('400-ved-send-soknad')],
    sykmeldinger: [syk7],
}

export const får500vedSendSoknad: Persona = {
    soknader: [kortSoknadMedID('500-ved-send-soknad')],
    sykmeldinger: [syk7],
}

export const harKontonummer: Persona = {
    soknader: [arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering],
    sykmeldinger: [syk7],
    kontonummer: '12340012345',
}

export const harIkkeKontonummer: Persona = {
    soknader: [arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering],
    sykmeldinger: [syk7],
    kontonummer: undefined,
}

export const soknaderIntegration = [
    utgattSoknad,
    arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger,
    sendtArbeidsledig,
    avbruttSoknad,
    veldigLangSoknad,
    arbeidsledigKvittering,
    arbeidstakerTilKorrigering,
    sendtArbeidsledigKvittering,
    oppholdUtlandKvittering,
    selvstendigKvittering,
    foranArbeidstakerMedOppholdKvittering,
    delvisUtfylltArbeidsledig,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdKvittering,
    sok6,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdKvittering,
    soknadSomTriggerSporsmalFinnesIkkeISoknad,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
    brukertestSoknad,
] as RSSoknad[]

export const soknaderOpplaering = [
    arbeidstakerGradert,
    arbeidstaker,
    arbeidsledig,
    frilanser,
    behandlingsdager,
    oppholdUtland,
    nyttReisetilskudd,
    gradertReisetilskudd,
    fremtidigSoknad,
] as RSSoknad[]

export const opplaering: Persona = {
    soknader: soknaderOpplaering,
    sykmeldinger: sykmeldinger,
}

export const alleData: Persona = {
    // Alle søknader filtrert på unik id
    soknader: [...soknaderIntegration, ...soknaderOpplaering, ...soknaderReisetilskudd].filter(
        (value, index, array) => array.findIndex((a) => a.id === value.id) === index,
    ),
    sykmeldinger: sykmeldinger,
}
