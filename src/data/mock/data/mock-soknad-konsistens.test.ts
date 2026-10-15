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

describe('Konsistens i mock-søknader', () => {
    test('søknadsperioden samsvarer med yttergrensene i søknadsperiodene', () => {
        const avvik = hentSoknader().flatMap(({ kildefil, soknad }) => {
            if (soknad.soknadPerioder.length === 0) return []
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
})
