import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../types/sykmelding'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { arbeidsledig, arbeidstaker, arbeidstakerGradert, behandlingsdager, fremtidigSoknad } from './data/opplaering'
import { gradertReisetilskudd, nyttReisetilskudd } from './data/reisetilskudd'
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
import { veldigLangSoknad } from './data/veldig-land-soknad'
import { oppholdUtland } from './data/opphold-utland'
import { frilanser } from './data/frilanser'
import { deepcopyMedNyId } from './deepcopyMedNyId'

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
    soknader: [kortSoknadMedID('9157b65a-0372-4657-864c-195037349df5')],
    sykmeldinger: [syk7],
}

export const får500vedSendSoknad: Persona = {
    soknader: [kortSoknadMedID('2a9196c7-306f-4b4f-afdc-891d8a564e42')],
    sykmeldinger: [syk7],
}

export const harKontonummer: Persona = {
    soknader: [
        deepcopyMedNyId(
            arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
            '6dd1c260-d47a-469f-b878-b9912b2a6982',
        ),
    ],
    sykmeldinger: [syk7],
    kontonummer: '12340012345',
}

export const harIkkeKontonummer: Persona = {
    soknader: [
        deepcopyMedNyId(
            arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
            '540b6488-1c4a-458b-9f46-679e26fa3663',
        ),
    ],
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

export const integration: Persona = {
    soknader: soknaderIntegration,
    sykmeldinger: sykmeldinger,
}
