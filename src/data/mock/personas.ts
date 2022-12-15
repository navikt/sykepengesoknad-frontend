import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../types/sykmelding'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { soknaderOpplaering } from './data/opplaering'
import { soknaderReisetilskudd } from './data/reisetilskudd'
import {
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    soknaderIntegration,
} from './data/soknader-integration'
import { syk7, sykmeldinger } from './data/sykmeldinger'

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
export const alleData: Persona = {
    // Alle søknader filtrert på unik id
    soknader: [...soknaderIntegration, ...soknaderOpplaering, ...soknaderReisetilskudd].filter(
        (value, index, array) => array.findIndex((a) => a.id === value.id) === index,
    ),
    sykmeldinger: sykmeldinger,
}
