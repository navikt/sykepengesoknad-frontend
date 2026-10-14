import { describe, expect, test } from 'vitest'

import type { RSSoknad } from '../../../types/rs-types/rs-soknad'
import type { RSSporsmal } from '../../../types/rs-types/rs-sporsmal'
import { testpersoner } from '../testperson'
import * as arbeidsledigSendt from './soknad/arbeidsledig-sendt'
import * as arbeidsledig from './soknad/arbeidsledig'
import * as arbeidstakerAvbrutt from './soknad/arbeidstaker-avbrutt'
import * as arbeidstakerFlereInntektskilderGhost from './soknad/arbeidstaker-flere-inntektskilder-ghost'
import * as arbeidstakerFremtidig from './soknad/arbeidstaker-fremtidig'
import * as arbeidstakerGradert from './soknad/arbeidstaker-gradert'
import arbeidstakerJulesoknad from './soknad/arbeidstaker-julesoknad'
import * as arbeidstakerKort from './soknad/arbeidstaker-kort'
import * as arbeidstakerMangePerioder from './soknad/arbeidstaker-mange-perioder'
import * as arbeidstakerReisetilskuddGradert from './soknad/arbeidstaker-reisetilskudd-gradert'
import * as arbeidstakerReisetilskudd from './soknad/arbeidstaker-reisetilskudd'
import * as arbeidstakerToPerioder from './soknad/arbeidstaker-to-perioder'
import * as arbeidstakerTrePerioder from './soknad/arbeidstaker-tre-perioder'
import * as arbeidstakerUtgatt from './soknad/arbeidstaker-utgatt'
import * as arbeidstaker from './soknad/arbeidstaker'
import * as behandlingsdager from './soknad/behandlingsdager'
import * as frilanser from './soknad/frilanser'
import * as friskmeldtTilArbeidsformidling from './soknad/friskmeldt-til-arbeidsformidling'
import * as naringsdrivende from './soknad/naringsdrivende'
import * as oppholdUtland from './soknad/opphold-utland'
import * as soknaderIntegration from './soknad/soknader-integration'
import * as veldigLangSoknad from './soknad/veldig-lang-soknad'

type SoknadMedKilde = {
    readonly kildefil: string
    readonly soknad: RSSoknad
}

const erSoknad = (verdi: unknown): verdi is RSSoknad => {
    return typeof verdi === 'object' && verdi !== null && 'id' in verdi && 'sporsmal' in verdi
}

const hentEksporterteSoknader = (kildefil: string, modul: object): readonly SoknadMedKilde[] => {
    return Object.values(modul)
        .filter(erSoknad)
        .map((soknad) => ({ kildefil, soknad }))
}

const soknaderFraKilder: readonly SoknadMedKilde[] = [
    ...hentEksporterteSoknader('soknad/arbeidsledig-sendt.ts', arbeidsledigSendt),
    ...hentEksporterteSoknader('soknad/arbeidsledig.ts', arbeidsledig),
    ...hentEksporterteSoknader('soknad/arbeidstaker-avbrutt.ts', arbeidstakerAvbrutt),
    ...hentEksporterteSoknader(
        'soknad/arbeidstaker-flere-inntektskilder-ghost.ts',
        arbeidstakerFlereInntektskilderGhost,
    ),
    ...hentEksporterteSoknader('soknad/arbeidstaker-fremtidig.ts', arbeidstakerFremtidig),
    ...hentEksporterteSoknader('soknad/arbeidstaker-gradert.ts', arbeidstakerGradert),
    { kildefil: 'soknad/arbeidstaker-julesoknad.ts', soknad: arbeidstakerJulesoknad },
    ...hentEksporterteSoknader('soknad/arbeidstaker-kort.ts', arbeidstakerKort),
    ...hentEksporterteSoknader('soknad/arbeidstaker-mange-perioder.ts', arbeidstakerMangePerioder),
    ...hentEksporterteSoknader('soknad/arbeidstaker-reisetilskudd-gradert.ts', arbeidstakerReisetilskuddGradert),
    ...hentEksporterteSoknader('soknad/arbeidstaker-reisetilskudd.ts', arbeidstakerReisetilskudd),
    ...hentEksporterteSoknader('soknad/arbeidstaker-to-perioder.ts', arbeidstakerToPerioder),
    ...hentEksporterteSoknader('soknad/arbeidstaker-tre-perioder.ts', arbeidstakerTrePerioder),
    ...hentEksporterteSoknader('soknad/arbeidstaker-utgatt.ts', arbeidstakerUtgatt),
    ...hentEksporterteSoknader('soknad/arbeidstaker.ts', arbeidstaker),
    ...hentEksporterteSoknader('soknad/behandlingsdager.ts', behandlingsdager),
    ...hentEksporterteSoknader('soknad/frilanser.ts', frilanser),
    ...hentEksporterteSoknader('soknad/friskmeldt-til-arbeidsformidling.ts', friskmeldtTilArbeidsformidling),
    ...hentEksporterteSoknader('soknad/naringsdrivende.ts', naringsdrivende),
    ...hentEksporterteSoknader('soknad/opphold-utland.ts', oppholdUtland),
    ...hentEksporterteSoknader('soknad/soknader-integration.ts', soknaderIntegration),
    ...hentEksporterteSoknader('soknad/veldig-lang-soknad.ts', veldigLangSoknad),
]

const hentSoknader = (): readonly SoknadMedKilde[] => {
    const personaSoknader = Object.values(testpersoner()).flatMap((persona) => {
        return persona?.soknader.map((soknad) => ({ kildefil: 'personas/testpersoner.ts', soknad })) ?? []
    })
    const unikeSoknader = new Map<string, SoknadMedKilde>()
    const alleSoknader = [...personaSoknader, ...soknaderFraKilder]
    alleSoknader.forEach((soknadMedKilde) => {
        unikeSoknader.set(`${soknadMedKilde.kildefil}:${soknadMedKilde.soknad.id}`, soknadMedKilde)
    })
    return [...unikeSoknader.values()]
}

const finnSporsmal = (sporsmal: readonly RSSporsmal[], tag: string): readonly RSSporsmal[] => {
    return sporsmal.flatMap((element) => [
        ...(element.tag === tag ? [element] : []),
        ...finnSporsmal(element.undersporsmal, tag),
    ])
}

const tillattePeriodeavvik = new Map<string, string>([
    ['a0000001-0000-4000-a000-000000000001', 'Demokopi av gradert arbeidstakersøknad med bevisst sprikende perioder'],
    ['5b769c04-e171-47c9-b79b-23ab8fce331e', 'Historisk gradert fikstur med bevisst avvikende periode'],
    ['6dd1c260-d47a-469f-b878-b9912b2a6982', 'Kontonummerscenario med kunstig historisk periode'],
    ['540b6488-1c4a-458b-9f46-679e26fa3663', 'Scenario uten kontonummer med kunstig historisk periode'],
    ['e6e53c43-3b64-48be-b9d1-39d95198e528', 'Eldre usendt søknad: april 2022-datoer ligger utenfor originalperioden'],
    ['e6e53c43-3b64-48be-b9d1-39d95198e521', 'Eldre usendt søknad: datoer gjør den ikke utfyllbar'],
    ['e6e53c43-3b64-48be-b9d1-39d95198e522', 'Eldre usendt søknad: datoer gjør den ikke utfyllbar'],
    ['9157b65a-0372-4657-864c-195037349df5', 'HTTP-feil-fikstur: tester 400 ved sending, ikke periodeinnhold'],
    ['3fa85f64-5717-4562-b3fc-2c963f67afa3', 'HTTP-feil-fikstur: tester 403 ved henting, ikke periodeinnhold'],
    ['3fa85f64-5717-4562-b3fc-2c963f66afa6', 'HTTP-feil-fikstur: tester 404 ved oppdatering eller henting'],
    ['5a7d403b-df78-491e-86f0-bf3f25408765', 'HTTP-feil-fikstur: tester annen 404-variant'],
    ['2a9196c7-306f-4b4f-afdc-891d8a564e42', 'HTTP-feil-fikstur: tester 500 ved sending'],
    ['5b74f271-5b94-455a-b79f-428f593f2b98', 'Integrasjonssøknad med utenlandsopphold og kunstige perioder'],
    ['811d15b2-2a76-4623-9530-1ba55617e0a5', 'Avbrutt søknad med historisk kunstig periodeavvik'],
    ['d3756302-4488-4f15-837b-38d51bc9b773', 'Arbeidsledig kvitteringsscenario med kunstige perioder'],
    ['8e267bc7-b213-4f19-a423-1543e09e0dc1', 'Selvstendig kvittering med separat TILBAKE_NAR-scenario'],
    ['35dc9bfb-e935-4f02-931f-9fa5306bbceb', 'Integrasjonssøknad: kunstige perioder for sortering og status'],
    ['99c14afb-f654-4df5-8612-085fe235536f', 'Delvis utfylt arbeidsledig integrasjonssøknad med kunstige perioder'],
    ['08a516f1-62be-45ee-8ce3-4ba0294728b0', 'Integrasjonssøknad innenfor arbeidsgiverperioden'],
    ['08a516f1-62be-45ee-8ce3-4ba0294728b1', 'Integrasjonssøknad utenfor arbeidsgiverperioden'],
    [
        '08a516f1-62be-45ee-8ce3-4ba0294728b3',
        'Integrasjonssøknad med første delte periode utenfor arbeidsgiverperioden',
    ],
    ['08a516f1-62be-45ee-8ce3-4ba0294728b4', 'Integrasjonssøknad uten opphold og med kunstig sykmeldingsperiode'],
    ['08a516f1-62be-45ee-8ce3-4ba0294728b5', 'Integrasjonssøknad for sok6, brukt i periode- og rekkefølgetesting'],
    ['08a516f1-62be-45ee-8ce3-4ba0294728b6', 'Integrasjonssøknad med opphold i første del av arbeidsgiverperioden'],
])

describe('Konsistens i mock-søknader', () => {
    test('søknadsperioden samsvarer med yttergrensene i søknadsperiodene', () => {
        const avvik = hentSoknader().flatMap(({ kildefil, soknad }) => {
            if (soknad.soknadPerioder.length === 0 || tillattePeriodeavvik.has(soknad.id)) return []
            const fom = [...soknad.soknadPerioder].sort((a, b) => a.fom.localeCompare(b.fom))[0].fom
            const tom = [...soknad.soknadPerioder].sort((a, b) => b.tom.localeCompare(a.tom))[0].tom
            return soknad.fom === fom && soknad.tom === tom
                ? []
                : [
                      {
                          kilde: `${kildefil}:${soknad.id}`,
                          soknad: `${soknad.fom}..${soknad.tom}`,
                          perioder: `${fom}..${tom}`,
                      },
                  ]
        })

        expect(avvik).toEqual([])
    })

    test('TILBAKE_NAR bruker søknadens yttergrenser', () => {
        const avvik = hentSoknader().flatMap(({ kildefil, soknad }) => {
            if (finnSporsmal(soknad.sporsmal, 'TILBAKE_I_ARBEID').length === 0) return []
            return finnSporsmal(soknad.sporsmal, 'TILBAKE_NAR').flatMap((sporsmal) =>
                sporsmal.min === soknad.fom && sporsmal.max === soknad.tom
                    ? []
                    : [{ kilde: `${kildefil}:${soknad.id}`, min: sporsmal.min, max: sporsmal.max }],
            )
        })

        expect(avvik).toEqual([])
    })

    test('periodebarn for ferie, permisjon og utenlandsopphold bruker søknadens yttergrenser', () => {
        const barnetagger = ['FERIE_NAR_V2', 'PERMISJON_NAR_V2', 'OPPHOLD_UTENFOR_EOS_NAR', 'UTLAND_NAR_V2']
        const avvik = hentSoknader().flatMap(({ kildefil, soknad }) => {
            return barnetagger.flatMap((tag) =>
                finnSporsmal(soknad.sporsmal, tag).flatMap((sporsmal) =>
                    sporsmal.min === soknad.fom && sporsmal.max === soknad.tom
                        ? []
                        : [{ kilde: `${kildefil}:${soknad.id}`, tag, min: sporsmal.min, max: sporsmal.max }],
                ),
            )
        })

        expect(avvik).toEqual([])
    })

    test('alle tillatte periodeavvik brukes av en mock-søknad', () => {
        const soknadsIder = new Set(hentSoknader().map(({ soknad }) => soknad.id))
        const manglendeIder = [...tillattePeriodeavvik.keys()].filter((id) => !soknadsIder.has(id))

        expect(manglendeIder).toEqual([])
    })
})
