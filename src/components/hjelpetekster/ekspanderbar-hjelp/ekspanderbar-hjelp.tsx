import { BodyLong, ReadMore } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import { logEvent } from '../../amplitude/amplitude'
import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { erSigrunInntekt, SigrunInntekt, Sporsmal } from '../../../types/types'
import { formatterTall } from '../../../utils/utils'

import { AndreInntektskilderHjelpBody } from './andre-inntektskilder-hjelp-body'
import { EkspanderbarHjelpTekster } from './ekspanderbar-hjelp-tekst'
import { TilbakeIArbeidHjelpBody } from './tilbake-i-arbeid-hjelp-body'
import { DeprecatedYrkesskadeHjelpBody, YrkesskadeHjelpBody } from './yrkesskade-hjelp-body'
import { FerieHjelpBody } from './ferie-hjelp-body'
import { PermisjonHjelpBody } from './permisjon-hjelp-body'
import { UtlandHjelpBody } from './utland-hjelp-body'
import { ArbeidUnderveisHjelpBody } from './arbeid-underveis-hjelp-body'
import { ArbeidUtenforNorgeHjelpBody } from './arbeid-utenfor-norge-hjelp-body'
import { FravarForSykmeldingenHjelpBody } from './fravar-for-sykmeldingen-hjelp-body'
import { JobbetDuGradertArbeidstakerHjelpBody } from './jobbet-du-gradert-arbeidstaker-hjelp'
import { BrukteReisetilskuddetHjelpBody } from './brukte-reisetilskuddet-hjelp-body'
import { KvitteringerHjelpBody } from './kvitteringer-hjelp-body'
import { EndringSNHjelpBody } from './endring-sn-hjelp-body'
import { MedlemskapArbeidUtenforNorgeHjelpBody } from './medlemskap-arbeid-utenfor-norge-hjelp-body'
import { MedlemskapOppholdUtenforEOSHjelpBody } from './medlemskap-opphold-utenfor-eos-hjelp-body'
import { MedlemskapOppholdUtenforNorgeHjelpBody } from './medlemskap-opphold-utenfor-Norge-hjelp-body'
import {
    MedlemskapOppholdstillatelseHjelpBody,
    MedlemskapOppholdstillatelseV2HjelpBody,
} from './medlemskap-oppholdstillatelse-hjelp-body'
import { KjenteInntektkilderHjelpBody } from './kjente-inntektkilder'
import { VarigEndring25prosentHjelpBody } from './varig-endring25prosent-hjelp-body'
import { DriftIVirksomhetHjelpBody } from './drift-i-virksomhet-hjelp-body'
import { AvvikletVirksomhetHjelpBody } from './avviklet-virksomhet-hjelp-body'
import { TilkommenInntektHjelpBody } from './tilkommen-inntekt-hjep-body'
import { InntektUnderveisFtaHjelpBody } from './inntekt-underveis-fta-hjelp-body'
import { JobbsituasjonenDinHjelpBody } from './jobbsituasjonen-din-hjelp-body'
import { NaringsdrivendeVirksomhetenAvvikletHjelpBody } from './naringsdrivende-virksomheten-avviklet-hjelp-body'
import { NaringsdrivendeNyIArbeidsLivetHjelpBody } from './naringsdrivende-ny-i-arbeids-livet-hjelp-body'
import { NaringsdrivendeVarigEndringHjelpBody } from './naringsdrivende-varig-endring-hjelp-body'
import { NaringsdrivendeOppholdIUtlandetHjelpBody } from './naringsdrivende-opphold-i-utlandet-hjelp-body'
import { NaringsdrivendeOpprettholdtInntektHjelpBody } from './naringsdrivende-opprettholdt-inntekt-hjelp-body'
import { FravarForSykmeldingenV2HjelpBody } from './fravar-for-sykmeldingen-v2-hjelp-body'

export const EkspanderbarHjelp = ({ sporsmal, mb }: { sporsmal: Sporsmal; mb?: string }) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const [expanded, setExpanded] = useState<boolean>(false)

    // Lukker mellom hvert spørsmål
    useEffect(() => {
        setExpanded(false)
    }, [sporsmal.tag])

    if (!valgtSoknad) return null

    const skapNokkel = () => {
        if (sporsmal.tag == 'TILBAKE_I_ARBEID' && valgtSoknad.soknadstype == RSSoknadstype.GRADERT_REISETILSKUDD) {
            return 'TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD'
        }
        if (sporsmal.tag == 'JOBBET_DU_GRADERT' && valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.ARBEIDSTAKER) {
            return 'JOBBET_DU_GRADERT_ARBEIDSTAKER'
        }
        if (sporsmal.tag == 'ANDRE_INNTEKTSKILDER' && valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.FRILANSER) {
            // Hjelpeteksten er ikke kompatibel med svaralternativene for frilanser
            return null
        }
        return sporsmal.tag
    }

    const nokkel = skapNokkel()
    const harInnhold = `ekspanderbarhjelp.${nokkel?.toLowerCase()}.innhold` in EkspanderbarHjelpTekster

    const EkspanderbarInnhold = () => {
        switch (sporsmal.tag) {
            case 'TILBAKE_I_ARBEID':
                return <TilbakeIArbeidHjelpBody />
            case 'YRKESSKADE':
                return <DeprecatedYrkesskadeHjelpBody />
            case 'YRKESSKADE_V2':
                return <YrkesskadeHjelpBody />
            case 'FERIE_V2':
                return <FerieHjelpBody />
            case 'ANDRE_INNTEKTSKILDER_V2':
                return <AndreInntektskilderHjelpBody />
            case 'NYTT_ARBEIDSFORHOLD_UNDERVEIS':
                return <TilkommenInntektHjelpBody />
            case 'PERMISJON_V2':
                return <PermisjonHjelpBody />
            case 'UTLAND_V2':
                return <UtlandHjelpBody medNei={true} />
            case 'OPPHOLD_UTENFOR_EOS':
                return <UtlandHjelpBody medNei={true} />
            case 'FTA_REISE_TIL_UTLANDET':
                return <UtlandHjelpBody medNei={false} />
            case 'ARBEID_UNDERVEIS_100_PROSENT':
                return <ArbeidUnderveisHjelpBody />
            case 'FTA_INNTEKT_UNDERVEIS':
                return <InntektUnderveisFtaHjelpBody />
            case 'ARBEID_UTENFOR_NORGE':
                return <ArbeidUtenforNorgeHjelpBody />
            case 'FRAVAR_FOR_SYKMELDINGEN':
                return <FravarForSykmeldingenHjelpBody />
            case 'JOBBET_DU_GRADERT':
                return <JobbetDuGradertArbeidstakerHjelpBody />
            case 'BRUKTE_REISETILSKUDDET':
                return <BrukteReisetilskuddetHjelpBody />
            case 'KVITTERINGER':
                return <KvitteringerHjelpBody />
            case 'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_GRUPPE':
                return <EndringSNHjelpBody />
            case 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS':
                return <MedlemskapOppholdUtenforEOSHjelpBody />
            case 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE':
                return <MedlemskapOppholdUtenforNorgeHjelpBody />
            case 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE':
                return <MedlemskapArbeidUtenforNorgeHjelpBody />
            case 'MEDLEMSKAP_OPPHOLDSTILLATELSE':
                return <MedlemskapOppholdstillatelseHjelpBody />
            case 'MEDLEMSKAP_OPPHOLDSTILLATELSE_V2':
                return <MedlemskapOppholdstillatelseV2HjelpBody />
            case 'KJENTE_INNTEKTSKILDER':
                return <KjenteInntektkilderHjelpBody />
            case 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT':
                return <VarigEndring25prosentHjelpBody sporsmal={sporsmal} />
            case 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN':
                return <DriftIVirksomhetHjelpBody />
            case 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET':
                return <AvvikletVirksomhetHjelpBody />
            case 'FTA_JOBBSITUASJONEN_DIN':
                return <JobbsituasjonenDinHjelpBody />
            case 'NARINGSDRIVENDE_OPPRETTHOLDT_INNTEKT':
                return <NaringsdrivendeOpprettholdtInntektHjelpBody />
            case 'NARINGSDRIVENDE_OPPHOLD_I_UTLANDET':
                return <NaringsdrivendeOppholdIUtlandetHjelpBody />
            case 'NARINGSDRIVENDE_VIRKSOMHETEN_AVVIKLET':
                return <NaringsdrivendeVirksomhetenAvvikletHjelpBody />
            case 'NARINGSDRIVENDE_NY_I_ARBEIDSLIVET':
                return <NaringsdrivendeNyIArbeidsLivetHjelpBody />
            case 'NARINGSDRIVENDE_VARIG_ENDRING':
                return <NaringsdrivendeVarigEndringHjelpBody />
            case 'FRAVAR_FOR_SYKMELDINGEN_V2':
                return <FravarForSykmeldingenV2HjelpBody />
            default:
                if (harInnhold) {
                    return (
                        <BodyLong>
                            {tekstMedHtml(tekst(`ekspanderbarhjelp.${nokkel?.toLowerCase()}.innhold` as any))}
                        </BodyLong>
                    )
                }
        }
    }

    const ekspanderbarInnhold = EkspanderbarInnhold()

    if (!nokkel || !ekspanderbarInnhold) {
        return null
    }

    function lagTittel(nokkel: string): string {
        if (
            sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT' &&
            erSigrunInntekt(sporsmal.metadata?.sigrunInntekt)
        ) {
            const { beregnet } = sporsmal.metadata?.sigrunInntekt as SigrunInntekt
            return `Hvordan har vi kommet frem til ${formatterTall(beregnet.snitt)} kroner?`
        } else {
            return (
                EkspanderbarHjelpTekster[
                    `ekspanderbarhjelp.${nokkel.toLowerCase()}.tittel` as keyof typeof EkspanderbarHjelpTekster
                ] || 'Spørsmålet forklart'
            )
        }
    }

    return (
        <ReadMore
            className={`${mb ?? 'mb-8'} mt-4 w-full`}
            header={lagTittel(nokkel)}
            open={expanded}
            onClick={() => {
                function vaskTittel(tittel: string): string {
                    if (tittel.includes('Hvordan har vi kommet frem til')) {
                        return 'Hvordan har vi kommet frem til [redacted] kroner?'
                    }
                    return tittel
                }

                logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                    tittel: vaskTittel(lagTittel(nokkel)),
                    component: 'hjelpetekst',
                    spørsmål: nokkel,
                })

                setExpanded((prev) => !prev)
            }}
        >
            <div className="mt-4">{ekspanderbarInnhold}</div>
        </ReadMore>
    )
}
