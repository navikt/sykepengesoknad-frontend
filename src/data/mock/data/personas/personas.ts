import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../../../types/sykmelding'
import {
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    soknaderIntegration,
} from '../soknad/soknader-integration'
import {
    arbeidsledig100Syk,
    arbeidstaker100Syk,
    arbeidstaker50Syk,
    arbeidstakerBehandlingsdagSyk,
    arbeidstakerReisetilskuddSyk,
    frilanser100Syk,
    gradertReisetilskuddSm,
    syk7,
    sykmeldinger,
} from '../sykmeldinger'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { oppholdUtland } from '../soknad/opphold-utland'
import { kortSoknadMedID } from '../../kort-soknad-med-id'
import { arbeidstakerGradert } from '../soknad/arbeidstaker-gradert'
import { arbeidstaker } from '../soknad/arbeidstaker'
import { arbeidsledig } from '../soknad/arbeidsledig'
import { frilanser } from '../soknad/frilanser'
import { behandlingsdager } from '../soknad/behandlingsdager'
import { nyttReisetilskudd } from '../soknad/arbeidstaker-reisetilskudd'
import { gradertReisetilskudd } from '../soknad/arbeidstaker-reisetilskudd-gradert'
import { fremtidigSoknad } from '../soknad/arbeidstaker-fremtidig'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { brukertestSoknad, brukertestSykmelding } from './brukertest'

export interface Persona {
    soknader: RSSoknad[]
    sykmeldinger: Sykmelding[]
    beskrivelse: string
    kontonummer?: string
}

export const utenData: Persona = {
    soknader: [],
    sykmeldinger: [],
    beskrivelse: 'Uten data',
}

export const får400vedSendSoknad: Persona = {
    soknader: [kortSoknadMedID('9157b65a-0372-4657-864c-195037349df5')],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 400 feil ved sending av søknad',
}
export const får403vedGetSoknad: Persona = {
    soknader: [kortSoknadMedID('3fa85f64-5717-4562-b3fc-2c963f67afa3')],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 403 feil ved henting av en annen persons søknad',
}

export const får404vedPutOgGetSoknad: Persona = {
    soknader: [
        kortSoknadMedID('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
        kortSoknadMedID('5a7d403b-df78-491e-86f0-bf3f25408765'),
    ],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 404 feil ved oppdatering av svar på søknad',
}

export const får500vedSendSoknad: Persona = {
    soknader: [kortSoknadMedID('2a9196c7-306f-4b4f-afdc-891d8a564e42')],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 500 feil ved sending av søknad',
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
    beskrivelse: 'Arbeidstaker søknad med kontonummer',
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
    beskrivelse: 'Arbeidstaker søknad uten kontonummer',
}

export const clsPerson: Persona = {
    soknader: [deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f23807777777')],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'CLS',
}

export const arbeidstakerPerson: Persona = {
    soknader: [arbeidstaker, arbeidstakerGradert],
    sykmeldinger: [arbeidstaker100Syk, arbeidstaker50Syk],
    beskrivelse: 'Arbeidstaker søknad',
}

export const arbeidsledigPerson: Persona = {
    soknader: [arbeidsledig],
    sykmeldinger: [arbeidsledig100Syk],
    beskrivelse: 'Arbeidsledig søknad',
}

export const frilanserPerson: Persona = {
    soknader: [frilanser],
    sykmeldinger: [frilanser100Syk],
    beskrivelse: 'Frilanser søknad',
}

export const behandlingsdagerPerson: Persona = {
    soknader: [behandlingsdager],
    sykmeldinger: [arbeidstakerBehandlingsdagSyk],
    beskrivelse: 'Arbeidstaker med behandlingsdager søknad',
}

export const utlandPerson: Persona = {
    soknader: [oppholdUtland],
    sykmeldinger: [],
    beskrivelse: 'Opphold utland søknad',
}

export const reisetilskuddPerson: Persona = {
    soknader: [nyttReisetilskudd, gradertReisetilskudd],
    sykmeldinger: [arbeidstakerReisetilskuddSyk, gradertReisetilskuddSm],
    beskrivelse: 'Kun reisetilskudd og gradert reisetilskudd søknader',
}

export const fremtidigPerson: Persona = {
    soknader: [fremtidigSoknad],
    sykmeldinger: [arbeidstaker100Syk],
    beskrivelse: 'Fremtidig søknad som ikke kan fylles ut',
}

export const integration: Persona = {
    soknader: soknaderIntegration,
    sykmeldinger: sykmeldinger,
    beskrivelse: 'God mix med søknader som brukes til integrasjons tester',
}

export function over70(): Persona {
    const sykmeldingOver70 = jsonDeepCopy(arbeidsledig100Syk)
    sykmeldingOver70.pasient = {
        overSyttiAar: true,
    }
    return jsonDeepCopy({
        soknader: [deepcopyMedNyId(arbeidsledig, 'df1371a4-2773-41c2-a895-49f56142496c')],
        sykmeldinger: [sykmeldingOver70],
        beskrivelse: 'Person som er over 70',
    })
}
