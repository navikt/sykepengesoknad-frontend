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
import { arbeidstakerMangePerioder } from '../soknad/arbeidstaker-mange-perioder'
import { arbeidstakerToPerioder } from '../soknad/arbeidstaker-to-perioder'
import { arbeidstakerTrePerioder } from '../soknad/arbeidstaker-tre-perioder'
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
import { yrkesskadeSoknad, yrkesskadeSoknadV1 } from '../yrkesskade'

import { nyttArbeidsforholdSoknad } from './nytt-arbeidsforhold'
import { soknadInnenforArbeidsgiverperioden, innenforArbeidsgiverperiodenSykmelding } from './innenfor-ag-periode'

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
    beskrivelse: 'Ingen søknader',
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

// Egne IDer for demo-kopiene i arbeidstaker-persona, slik at samme søknad kan vises flere steder
export const demoIder = {
    gradert: 'a0000001-0000-4000-a000-000000000001',
    innenforArbeidsgiverperioden: 'a0000001-0000-4000-a000-000000000002',
    yrkesskade: 'a0000001-0000-4000-a000-000000000003',
    yrkesskadeHistorisk: 'a0000001-0000-4000-a000-000000000004',
    nyttArbeidsforhold: 'a0000001-0000-4000-a000-000000000005',
    toPerioder: 'a0000001-0000-4000-a000-000000000006',
    firePerioder: 'a0000001-0000-4000-a000-000000000007',
} as const

export const arbeidstakerPerson: Persona = {
    soknader: [
        { ...arbeidstaker, demoinfo: '100 % sykmeldt' },
        {
            ...deepcopyMedNyId(arbeidstakerGradert, demoIder.gradert),
            demoinfo: '50 % sykmeldt',
        },
        {
            ...deepcopyMedNyId(soknadInnenforArbeidsgiverperioden, demoIder.innenforArbeidsgiverperioden),
            demoinfo: 'Innenfor arbeidsgiverperioden',
        },
        { ...deepcopyMedNyId(yrkesskadeSoknad, demoIder.yrkesskade), demoinfo: 'Yrkesskade' },
        {
            ...deepcopyMedNyId(yrkesskadeSoknadV1, demoIder.yrkesskadeHistorisk),
            demoinfo: 'Yrkesskade (historisk)',
        },
        {
            ...deepcopyMedNyId(nyttArbeidsforholdSoknad, demoIder.nyttArbeidsforhold),
            demoinfo: 'Nytt arbeidsforhold/tilkommen inntekt',
        },
        {
            ...deepcopyMedNyId(arbeidstakerToPerioder, demoIder.toPerioder),
            demoinfo: '2 perioder',
        },
        {
            ...deepcopyMedNyId(arbeidstakerMangePerioder, demoIder.firePerioder),
            demoinfo: '4 perioder',
        },
    ],
    sykmeldinger: [arbeidstaker100Syk, arbeidstaker50Syk, brukertestSykmelding, innenforArbeidsgiverperiodenSykmelding],
    beskrivelse: 'Arbeidstaker',
}

export const arbeidstakerPeriodeVarianter_Person: Persona = {
    soknader: [arbeidstakerToPerioder, arbeidstakerTrePerioder, arbeidstakerMangePerioder],
    sykmeldinger: [arbeidstaker100Syk],
    beskrivelse: 'Arbeidstakersøknader med 2, 3 og 4 perioder',
}

export const arbeidstakerGradertPerson: Persona = {
    soknader: [arbeidstakerGradert],
    sykmeldinger: [arbeidstaker50Syk],
    beskrivelse: 'Arbeidstakersøknad 50%',
}

export const gammelOppsummeringPerson: Persona = {
    soknader: [{ ...arbeidtakerMedGammelOppsummering(), demoinfo: 'Sendt søknad med gammel oppsummering' }],
    sykmeldinger: [arbeidstaker100Syk],
    beskrivelse: 'Søknad med gammel oppsummering',
}

export const arbeidsledigPerson: Persona = {
    soknader: [{ ...arbeidsledig, demoinfo: '100 % sykmeldt arbeidsledig' }],
    sykmeldinger: [arbeidsledig100Syk],
    beskrivelse: 'Arbeidsledig',
}

export const frilanserPerson: Persona = {
    soknader: [{ ...frilanser, demoinfo: '100 % sykmeldt frilanser' }],
    sykmeldinger: [frilanser100Syk],
    beskrivelse: 'Frilanser',
}

export const behandlingsdagerPerson: Persona = {
    soknader: [{ ...behandlingsdager, demoinfo: 'Sykmelding med behandlingsdager' }],
    sykmeldinger: [arbeidstakerBehandlingsdagSyk],
    beskrivelse: 'Behandlingsdager',
}

export const utlandPerson: Persona = {
    soknader: [{ ...oppholdUtland, demoinfo: 'Søknad om å beholde sykepengene utenfor EU/EØS' }],
    sykmeldinger: [],
    beskrivelse: 'Egen søknad om å beholde sykepenger i utlandet',
}

export const reisetilskuddPerson: Persona = {
    soknader: [
        { ...nyttReisetilskudd, demoinfo: 'Kun reisetilskudd' },
        { ...gradertReisetilskudd, demoinfo: 'Gradert sykmelding med reisetilskudd' },
    ],
    sykmeldinger: [arbeidstakerReisetilskuddSyk, gradertReisetilskuddSm],
    beskrivelse: 'Reisetilskudd',
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
    soknader: [
        {
            ...deepcopyMedNyId(utgattSoknad, 'df1371a4-2773-41c2-a895-49f561424aaa'),
            demoinfo: 'Søknad som gikk ut på tid før den ble sendt',
        },
    ],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'Utgått søknad',
}

export function over70(): Persona {
    const sykmeldingOver70 = jsonDeepCopy(arbeidsledig100Syk)
    sykmeldingOver70.pasient = {
        overSyttiAar: true,
    }
    return jsonDeepCopy({
        soknader: [
            {
                ...deepcopyMedNyId(arbeidsledig, 'df1371a4-2773-41c2-a895-49f56142496c'),
                demoinfo: 'Sykmeldt som er over 70 år',
            },
        ],
        sykmeldinger: [sykmeldingOver70],
        beskrivelse: 'Sykmeldt er over 70 år',
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
