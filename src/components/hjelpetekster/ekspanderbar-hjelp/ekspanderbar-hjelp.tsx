import { ReadMore } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { logEvent } from '../../umami/umami'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { erSigrunInntekt, SigrunInntekt, Sporsmal } from '../../../types/types'
import { formatterTall } from '../../../utils/utils'

import { SporsmalTagMedHjelpetekst } from './types'
import { AndreInntektskilderHjelpBody, andreInntektskilderTittel } from './felles/andre-inntektskilder-hjelp-body'
import {
    AndreInntektskilderGammelHjelpBody,
    andreInntektskilderGammelTittel,
} from './felles/utdatert/andre-inntektskilder-gammel-hjelp-body'
import { TilbakeIArbeidHjelpBody, tilbakeIArbeidTittel } from './arbeidstaker/tilbake-i-arbeid-hjelp-body'
import {
    DeprecatedYrkesskadeHjelpBody,
    deprecatedYrkesskadeTittel,
    YrkesskadeHjelpBody,
    yrkesskadeTittel,
} from './felles/yrkesskade-hjelp-body'
import { FerieHjelpBody, ferieTittel } from './felles/ferie-hjelp-body'
import { PermisjonHjelpBody, permisjonTittel } from './arbeidstaker/permisjon-hjelp-body'
import { UtlandHjelpBody, utlandTittel } from './felles/utland-hjelp-body'
import { ArbeidUnderveisHjelpBody, arbeidUnderveisTittel } from './arbeidstaker/arbeid-underveis-hjelp-body'
import { ArbeidUtenforNorgeHjelpBody, arbeidUtenforNorgeTittel } from './medlemskap/arbeid-utenfor-norge-hjelp-body'
import {
    FravarForSykmeldingenHjelpBody,
    fravarForSykmeldingenTittel,
} from './arbeidstaker/utdatert/fravar-for-sykmeldingen-hjelp-body'
import {
    BrukteReisetilskuddetHjelpBody,
    brukteReisetilskuddetTittel,
} from './arbeidstaker/brukte-reisetilskuddet-hjelp-body'
import { KvitteringerHjelpBody, kvitteringerTittel } from './arbeidstaker/kvitteringer-hjelp-body'
import { EndringSNHjelpBody, endringSNTittel } from './naeringsdrivende/utdatert/endring-sn-hjelp-body'
import {
    MedlemskapArbeidUtenforNorgeHjelpBody,
    medlemskapArbeidUtenforNorgeTittel,
} from './medlemskap/medlemskap-arbeid-utenfor-norge-hjelp-body'
import {
    MedlemskapOppholdUtenforEOSHjelpBody,
    medlemskapOppholdUtenforEOSTittel,
} from './medlemskap/medlemskap-opphold-utenfor-eos-hjelp-body'
import {
    MedlemskapOppholdUtenforNorgeHjelpBody,
    medlemskapOppholdUtenforNorgeTittel,
} from './medlemskap/medlemskap-opphold-utenfor-Norge-hjelp-body'
import {
    MedlemskapOppholdstillatelseHjelpBody,
    medlemskapOppholdstillatelseTittel,
    MedlemskapOppholdstillatelseV2HjelpBody,
    medlemskapOppholdstillatelseV2Tittel,
} from './medlemskap/medlemskap-oppholdstillatelse-hjelp-body'
import { KjenteInntektkilderHjelpBody, kjenteInntektkilderTittel } from './arbeidstaker/kjente-inntektkilder'
import {
    VarigEndring25prosentHjelpBody,
    varigEndring25prosentTittel,
} from './naeringsdrivende/utdatert/varig-endring25prosent-hjelp-body'
import {
    DriftIVirksomhetHjelpBody,
    driftIVirksomhetTittel,
} from './naeringsdrivende/utdatert/drift-i-virksomhet-hjelp-body'
import {
    AvvikletVirksomhetHjelpBody,
    avvikletVirksomhetTittel,
} from './naeringsdrivende/utdatert/avviklet-virksomhet-hjelp-body'
import { TilkommenInntektHjelpBody, tilkommenInntektTittel } from './arbeidstaker/tilkommen-inntekt-hjelp-body'
import {
    InntektUnderveisFtaHjelpBody,
    inntektUnderveisFtaTittel,
} from './friskmeldt-til-arbeidsformidling/inntekt-underveis-fta-hjelp-body'
import {
    JobbsituasjonenDinHjelpBody,
    jobbsituasjonenDinTittel,
} from './friskmeldt-til-arbeidsformidling/jobbsituasjonen-din-hjelp-body'
import {
    NaringsdrivendeVirksomhetenAvvikletHjelpBody,
    naringsdrivendeVirksomhetenAvvikletTittel,
} from './naeringsdrivende/naringsdrivende-virksomheten-avviklet-hjelp-body'
import {
    NaringsdrivendeNyIArbeidsLivetHjelpBody,
    naringsdrivendeNyIArbeidsLivetTittel,
} from './naeringsdrivende/naringsdrivende-ny-i-arbeids-livet-hjelp-body'
import {
    NaringsdrivendeVarigEndringHjelpBody,
    naringsdrivendeVarigEndringTittel,
} from './naeringsdrivende/naringsdrivende-varig-endring-hjelp-body'
import {
    NaringsdrivendeOppholdIUtlandetHjelpBody,
    naringsdrivendeOppholdIUtlandetTittel,
} from './naeringsdrivende/naringsdrivende-opphold-i-utlandet-hjelp-body'
import {
    NaringsdrivendeOpprettholdtInntektHjelpBody,
    naringsdrivendeOpprettholdtInntektTittel,
} from './naeringsdrivende/naringsdrivende-opprettholdt-inntekt-hjelp-body'
import {
    FravarForSykmeldingenV2HjelpBody,
    fravarForSykmeldingenV2Tittel,
} from './arbeidstaker/fravar-for-sykmeldingen-v2-hjelp-body'
import {
    NaringsdrivendeOpprettholdtInntektGradertHjelpBody,
    naringsdrivendeOpprettholdtInntektGradertTittel,
} from './naeringsdrivende/naringsdrivende-opprettholdt-inntekt-gradert-hjelp-body'
import {
    ArbeidUnderveisNaeringsdrivendeHjelpBody,
    arbeidUnderveisNaeringsdrivendeTittel,
} from './naeringsdrivende/arbeid-underveis-naeringsdrivende-hjelp-body'
import { TransportTilDagligHjelpBody, transportTilDagligTittel } from './arbeidstaker/transport-til-daglig-hjelp-body'
import { PermittertNaaHjelpBody, permittertNaaTittel } from './felles/utdatert/permittert-naa-hjelp-body'
import { PermittertPeriodeHjelpBody, permittertPeriodeTittel } from './felles/utdatert/permittert-periode-hjelp-body'
import { UtdanningHjelpBody, utdanningTittel } from './felles/utdanning-hjelp-body'
import { ProsentenLavereHjelpBody, prosentenLavereTittel } from './arbeidstaker/prosenten-lavere-hjelp-body'
import {
    InntektsopplysningerNyIArbeidslivetHjelpBody,
    inntektsopplysningerNyIArbeidslivetTittel,
} from './naeringsdrivende/utdatert/inntektsopplysninger-ny-i-arbeidslivet-hjelp-body'

interface ReadmoreTittelOgKomponent {
    tittel: string
    komponent: React.ReactNode
}

export const EkspanderbarHjelp = ({ sporsmal, mb }: { sporsmal: Sporsmal; mb?: string }) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const [expanded, setExpanded] = useState<boolean>(false)

    // Lukker mellom hvert spørsmål
    useEffect(() => {
        setExpanded(false)
    }, [sporsmal.tag])

    if (!valgtSoknad) return null

    if (sporsmal.tag == 'ANDRE_INNTEKTSKILDER' && valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.FRILANSER) {
        // Hjelpeteksten er ikke kompatibel med svaralternativene for frilanser
        return null
    }

    const sporsmalTagMedSoknadstypeEllerArbeidssituasjon = (): string => {
        if (sporsmal.tag == 'TILBAKE_I_ARBEID' && valgtSoknad.soknadstype == RSSoknadstype.GRADERT_REISETILSKUDD) {
            return 'TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD'
        }
        if (sporsmal.tag == 'JOBBET_DU_GRADERT' || sporsmal.tag == 'ARBEID_UNDERVEIS_100_PROSENT') {
            return sporsmal.tag + '_' + valgtSoknad.arbeidssituasjon
        }
        return sporsmal.tag
    }

    const sporsmalTag = sporsmalTagMedSoknadstypeEllerArbeidssituasjon()

    const sporsmalTagTilReadmoreMapping: Record<SporsmalTagMedHjelpetekst, ReadmoreTittelOgKomponent> = {
        TILBAKE_I_ARBEID: { tittel: tilbakeIArbeidTittel, komponent: <TilbakeIArbeidHjelpBody /> },
        TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD: {
            tittel: tilbakeIArbeidTittel,
            komponent: <TilbakeIArbeidHjelpBody />,
        },
        YRKESSKADE: { tittel: deprecatedYrkesskadeTittel, komponent: <DeprecatedYrkesskadeHjelpBody /> },
        YRKESSKADE_V2: { tittel: yrkesskadeTittel, komponent: <YrkesskadeHjelpBody /> },
        FERIE_V2: { tittel: ferieTittel, komponent: <FerieHjelpBody /> },
        ANDRE_INNTEKTSKILDER: {
            tittel: andreInntektskilderGammelTittel,
            komponent: <AndreInntektskilderGammelHjelpBody />,
        },
        ANDRE_INNTEKTSKILDER_V2: { tittel: andreInntektskilderTittel, komponent: <AndreInntektskilderHjelpBody /> },
        NYTT_ARBEIDSFORHOLD_UNDERVEIS: { tittel: tilkommenInntektTittel, komponent: <TilkommenInntektHjelpBody /> },
        PERMISJON_V2: { tittel: permisjonTittel, komponent: <PermisjonHjelpBody /> },
        UTLAND_V2: { tittel: utlandTittel, komponent: <UtlandHjelpBody medNei={true} /> },
        OPPHOLD_UTENFOR_EOS: { tittel: utlandTittel, komponent: <UtlandHjelpBody medNei={true} /> },
        FTA_REISE_TIL_UTLANDET: { tittel: utlandTittel, komponent: <UtlandHjelpBody medNei={false} /> },
        ARBEID_UNDERVEIS_100_PROSENT_ARBEIDSTAKER: {
            tittel: arbeidUnderveisTittel,
            komponent: <ArbeidUnderveisHjelpBody />,
        },
        JOBBET_DU_GRADERT_ARBEIDSTAKER: { tittel: arbeidUnderveisTittel, komponent: <ArbeidUnderveisHjelpBody /> },
        ARBEID_UNDERVEIS_100_PROSENT_NARINGSDRIVENDE: {
            tittel: arbeidUnderveisNaeringsdrivendeTittel,
            komponent: <ArbeidUnderveisNaeringsdrivendeHjelpBody gradert={false} />,
        },
        JOBBET_DU_GRADERT_NARINGSDRIVENDE: {
            tittel: arbeidUnderveisNaeringsdrivendeTittel,
            komponent: <ArbeidUnderveisNaeringsdrivendeHjelpBody gradert={true} />,
        },
        FTA_INNTEKT_UNDERVEIS: { tittel: inntektUnderveisFtaTittel, komponent: <InntektUnderveisFtaHjelpBody /> },
        ARBEID_UTENFOR_NORGE: { tittel: arbeidUtenforNorgeTittel, komponent: <ArbeidUtenforNorgeHjelpBody /> },
        FRAVAR_FOR_SYKMELDINGEN: {
            tittel: fravarForSykmeldingenTittel,
            komponent: <FravarForSykmeldingenHjelpBody />,
        },
        FRAVAR_FOR_SYKMELDINGEN_V2: {
            tittel: fravarForSykmeldingenV2Tittel,
            komponent: <FravarForSykmeldingenV2HjelpBody />,
        },
        BRUKTE_REISETILSKUDDET: {
            tittel: brukteReisetilskuddetTittel,
            komponent: <BrukteReisetilskuddetHjelpBody />,
        },
        KVITTERINGER: { tittel: kvitteringerTittel, komponent: <KvitteringerHjelpBody /> },
        INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_GRUPPE: { tittel: endringSNTittel, komponent: <EndringSNHjelpBody /> },
        MEDLEMSKAP_OPPHOLD_UTENFOR_EOS: {
            tittel: medlemskapOppholdUtenforEOSTittel,
            komponent: <MedlemskapOppholdUtenforEOSHjelpBody />,
        },
        MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE: {
            tittel: medlemskapOppholdUtenforNorgeTittel,
            komponent: <MedlemskapOppholdUtenforNorgeHjelpBody />,
        },
        MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE: {
            tittel: medlemskapArbeidUtenforNorgeTittel,
            komponent: <MedlemskapArbeidUtenforNorgeHjelpBody />,
        },
        MEDLEMSKAP_OPPHOLDSTILLATELSE: {
            tittel: medlemskapOppholdstillatelseTittel,
            komponent: <MedlemskapOppholdstillatelseHjelpBody />,
        },
        MEDLEMSKAP_OPPHOLDSTILLATELSE_V2: {
            tittel: medlemskapOppholdstillatelseV2Tittel,
            komponent: <MedlemskapOppholdstillatelseV2HjelpBody />,
        },
        KJENTE_INNTEKTSKILDER: { tittel: kjenteInntektkilderTittel, komponent: <KjenteInntektkilderHjelpBody /> },
        INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT: {
            tittel: varigEndring25prosentTittel,
            komponent: <VarigEndring25prosentHjelpBody sporsmal={sporsmal} />,
        },
        INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN: {
            tittel: driftIVirksomhetTittel,
            komponent: <DriftIVirksomhetHjelpBody />,
        },
        INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET: {
            tittel: avvikletVirksomhetTittel,
            komponent: <AvvikletVirksomhetHjelpBody />,
        },
        INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET: {
            tittel: inntektsopplysningerNyIArbeidslivetTittel,
            komponent: <InntektsopplysningerNyIArbeidslivetHjelpBody />,
        },
        FTA_JOBBSITUASJONEN_DIN: { tittel: jobbsituasjonenDinTittel, komponent: <JobbsituasjonenDinHjelpBody /> },
        NARINGSDRIVENDE_OPPRETTHOLDT_INNTEKT: {
            tittel: naringsdrivendeOpprettholdtInntektTittel,
            komponent: <NaringsdrivendeOpprettholdtInntektHjelpBody />,
        },
        NARINGSDRIVENDE_OPPRETTHOLDT_INNTEKT_GRADERT: {
            tittel: naringsdrivendeOpprettholdtInntektGradertTittel,
            komponent: <NaringsdrivendeOpprettholdtInntektGradertHjelpBody />,
        },
        NARINGSDRIVENDE_OPPHOLD_I_UTLANDET: {
            tittel: naringsdrivendeOppholdIUtlandetTittel,
            komponent: <NaringsdrivendeOppholdIUtlandetHjelpBody />,
        },
        NARINGSDRIVENDE_VIRKSOMHETEN_AVVIKLET: {
            tittel: naringsdrivendeVirksomhetenAvvikletTittel,
            komponent: <NaringsdrivendeVirksomhetenAvvikletHjelpBody />,
        },
        NARINGSDRIVENDE_NY_I_ARBEIDSLIVET: {
            tittel: naringsdrivendeNyIArbeidsLivetTittel,
            komponent: <NaringsdrivendeNyIArbeidsLivetHjelpBody />,
        },
        NARINGSDRIVENDE_VARIG_ENDRING: {
            tittel: naringsdrivendeVarigEndringTittel,
            komponent: <NaringsdrivendeVarigEndringHjelpBody />,
        },
        TRANSPORT_TIL_DAGLIG: { tittel: transportTilDagligTittel, komponent: <TransportTilDagligHjelpBody /> },
        PERMITTERT_NAA: { tittel: permittertNaaTittel, komponent: <PermittertNaaHjelpBody /> },
        PERMITTERT_PERIODE: { tittel: permittertPeriodeTittel, komponent: <PermittertPeriodeHjelpBody /> },
        UTDANNING: { tittel: utdanningTittel, komponent: <UtdanningHjelpBody /> },
        PROSENTEN_LAVERE_ENN_FORVENTET_ARBEIDSTAKER: {
            tittel: prosentenLavereTittel,
            komponent: <ProsentenLavereHjelpBody />,
        },
    }

    const readmore = sporsmalTagTilReadmoreMapping[sporsmalTag as SporsmalTagMedHjelpetekst]

    if (!readmore) {
        return null
    }

    function lagTittel(): string {
        if (
            sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT' &&
            erSigrunInntekt(sporsmal.metadata?.sigrunInntekt)
        ) {
            const { beregnet } = sporsmal.metadata?.sigrunInntekt as SigrunInntekt
            return `Hvordan har vi kommet frem til ${formatterTall(beregnet.snitt)} kroner?`
        }
        return readmore.tittel
    }

    return (
        <ReadMore
            className={`${mb ?? 'mb-8'} mt-4 w-full`}
            header={lagTittel()}
            open={expanded}
            onClick={() => {
                function vaskTittel(tittel: string): string {
                    if (tittel.includes('Hvordan har vi kommet frem til')) {
                        return 'Hvordan har vi kommet frem til [redacted] kroner?'
                    }
                    return tittel
                }

                logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                    tittel: vaskTittel(lagTittel()),
                    component: 'hjelpetekst',
                    spørsmål: sporsmalTag || '',
                })

                setExpanded((prev) => !prev)
            }}
        >
            <div className="mt-4">{readmore.komponent}</div>
        </ReadMore>
    )
}
