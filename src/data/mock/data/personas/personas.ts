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
    julesoknadSykmelding,
    syk7,
    sykmeldinger,
} from '../sykmeldinger'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { oppholdUtland } from '../soknad/opphold-utland'
import { kortSoknadMedID } from '../../kort-soknad-med-id'
import { arbeidstakerGradert } from '../soknad/arbeidstaker-gradert'
import { arbeidstaker, arbeidtakerMedGammelOppsummering } from '../soknad/arbeidstaker'
import { arbeidsledig } from '../soknad/arbeidsledig'
import { frilanser } from '../soknad/frilanser'
import { behandlingsdager } from '../soknad/behandlingsdager'
import { nyttReisetilskudd } from '../soknad/arbeidstaker-reisetilskudd'
import { gradertReisetilskudd } from '../soknad/arbeidstaker-reisetilskudd-gradert'
import { fremtidigSoknad } from '../soknad/arbeidstaker-fremtidig'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'
import { utgattSoknad } from '../soknad/arbeidstaker-utgatt'
import arbeidstakerJulesoknad from '../soknad/arbeidstaker-julesoknad'

import { brukertestSoknad, brukertestSykmelding } from './brukertestPerosn'

export interface Persona {
    soknader: RSSoknad[]
    sykmeldinger: Sykmelding[]
    beskrivelse: string
    kontonummer?: string
}

export const utenDataPerson: Persona = {
    soknader: [],
    sykmeldinger: [],
    beskrivelse: 'Søknad uten data',
}

export const http400vedSendSoknad: Persona = {
    soknader: [kortSoknadMedID('9157b65a-0372-4657-864c-195037349df5')],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 400 feil ved sending av søknad',
}
export const http403vedGetSoknad: Persona = {
    soknader: [kortSoknadMedID('3fa85f64-5717-4562-b3fc-2c963f67afa3')],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 403 feil ved henting av en annen persons søknad',
}

export const http404vedPutOgGetSoknad: Persona = {
    soknader: [
        kortSoknadMedID('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
        kortSoknadMedID('5a7d403b-df78-491e-86f0-bf3f25408765'),
    ],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 404 feil ved oppdatering av svar på søknad',
}

export const http500vedSendSoknad: Persona = {
    soknader: [kortSoknadMedID('2a9196c7-306f-4b4f-afdc-891d8a564e42')],
    sykmeldinger: [syk7],
    beskrivelse: 'Gir 500 feil ved sending av søknad',
}

export const harKontonummerPerson: Persona = {
    soknader: [
        deepcopyMedNyId(
            arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
            '6dd1c260-d47a-469f-b878-b9912b2a6982',
        ),
    ],
    sykmeldinger: [syk7],
    kontonummer: '12340012345',
    beskrivelse: 'Arbeidstakersøknad med kontonummer',
}

export const harIkkeKontonummerPerson: Persona = {
    soknader: [
        deepcopyMedNyId(
            arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
            '540b6488-1c4a-458b-9f46-679e26fa3663',
        ),
    ],
    sykmeldinger: [syk7],
    kontonummer: undefined,
    beskrivelse: 'Arbeidstakersøknad uten kontonummer',
}

export const clsPerson: Persona = {
    soknader: [deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f23807777777')],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Test av Cummulative Layout Shift',
}

export const arbeidstakerPerson: Persona = {
    soknader: [arbeidstaker],
    sykmeldinger: [arbeidstaker100Syk],
    beskrivelse: 'Arbeidstakersøknad 100%',
}

export const arbeidstakerGradertPerson: Persona = {
    soknader: [arbeidstakerGradert],
    sykmeldinger: [arbeidstaker50Syk],
    beskrivelse: 'Arbeidstakersøknad 50%',
}

export const gammelOppsummeringPerson: Persona = {
    soknader: [arbeidtakerMedGammelOppsummering()],
    sykmeldinger: [arbeidstaker100Syk],
    beskrivelse: 'Søknad med gammel oppsummering',
}

export const arbeidsledigPerson: Persona = {
    soknader: [arbeidsledig],
    sykmeldinger: [arbeidsledig100Syk],
    beskrivelse: 'Arbeidsledigsøknad',
}

export const frilanserPerson: Persona = {
    soknader: [frilanser],
    sykmeldinger: [frilanser100Syk],
    beskrivelse: 'Frilansersøknad',
}

export const behandlingsdagerPerson: Persona = {
    soknader: [behandlingsdager],
    sykmeldinger: [arbeidstakerBehandlingsdagSyk],
    beskrivelse: 'Arbeidstaker med behandlingsdager',
}

export const utlandPerson: Persona = {
    soknader: [oppholdUtland],
    sykmeldinger: [],
    beskrivelse: 'Opphold utland søknad',
}

export const reisetilskuddPerson: Persona = {
    soknader: [nyttReisetilskudd, gradertReisetilskudd],
    sykmeldinger: [arbeidstakerReisetilskuddSyk, gradertReisetilskuddSm],
    beskrivelse: 'Søknader med reisetilskudd og gradert reisetilskudd',
}

export const fremtidigPerson: Persona = {
    soknader: [fremtidigSoknad],
    sykmeldinger: [arbeidstaker100Syk],
    beskrivelse: 'Fremtidig søknad som ikke kan fylles ut',
}

export const integrasjonstestPerson: Persona = {
    soknader: soknaderIntegration,
    sykmeldinger: sykmeldinger,
    beskrivelse: 'Forskjellige søknader for integrasjonstest',
}

export const kunUtgattSoknadPerson: Persona = {
    soknader: [deepcopyMedNyId(utgattSoknad, 'df1371a4-2773-41c2-a895-49f561424aaa')],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'Utgått søknad',
}

export function over70(): Persona {
    const sykmeldingOver70 = jsonDeepCopy(arbeidsledig100Syk)
    sykmeldingOver70.pasient = {
        overSyttiAar: true,
    }
    return jsonDeepCopy({
        soknader: [deepcopyMedNyId(arbeidsledig, 'df1371a4-2773-41c2-a895-49f56142496c')],
        sykmeldinger: [sykmeldingOver70],
        beskrivelse: 'Søknad fra person som er over 70',
    })
}

export function tilbakedateringer(): Persona {
    const underBehandling = deepcopyMedNyId(arbeidstaker, '9205cc51-145b-4bda-8e99-aeaade949daf')
    underBehandling.merknaderFraSykmelding = [
        {
            type: 'UNDER_BEHANDLING',
        },
    ]
    const ugyldigTilbakedatering = deepcopyMedNyId(arbeidstaker, '9205cc51-145b-4bda-8e99-aeaade949daa')
    ugyldigTilbakedatering.merknaderFraSykmelding = [
        {
            type: 'UGYLDIG_TILBAKEDATERING',
        },
    ]
    return {
        soknader: [underBehandling, ugyldigTilbakedatering],
        sykmeldinger: sykmeldinger,
        beskrivelse: 'Søknader fra tilbakedaterte sykmeldinger. En under behandling og en ikke godkjent',
    }
}

export const julesoknadPerson: Persona = {
    soknader: [deepcopyMedNyId(arbeidstakerJulesoknad, '343a0419-5d44-4ce8-afad-015c151a2382')],
    sykmeldinger: [julesoknadSykmelding],
    beskrivelse: 'Testing av Julesøknad',
}
