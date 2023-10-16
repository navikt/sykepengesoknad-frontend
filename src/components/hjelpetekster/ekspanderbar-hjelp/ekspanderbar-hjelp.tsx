import { BodyLong, ReadMore } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { TagTyper } from '../../../types/enums'
import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../../sporsmal/sporsmal-utils'
import { logEvent } from '../../amplitude/amplitude'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

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

export const EkspanderbarHjelp = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const [expanded, setExpanded] = useState<boolean>(false)

    // Lukker mellom hvert spørsmål
    useEffect(() => {
        setExpanded(false)
    }, [sporsmal.tag])

    if (!valgtSoknad) return null

    const skapNokkel = () => {
        if (
            sporsmal.tag == TagTyper.TILBAKE_I_ARBEID &&
            valgtSoknad.soknadstype == RSSoknadstype.GRADERT_REISETILSKUDD
        ) {
            return 'TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD'
        }
        if (
            fjernIndexFraTag(sporsmal.tag) == TagTyper.JOBBET_DU_GRADERT &&
            valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.ARBEIDSTAKER
        ) {
            return 'JOBBET_DU_GRADERT_ARBEIDSTAKER'
        }
        if (
            sporsmal.tag == TagTyper.ANDRE_INNTEKTSKILDER &&
            valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.FRILANSER
        ) {
            // Hjelpeteksten er ikke kompatibel med svaralternativene for frilanser
            return null
        }
        return fjernIndexFraTag(sporsmal.tag)
    }

    const nokkel = skapNokkel()
    const harInnhold = `ekspanderbarhjelp.${nokkel?.toLowerCase()}.innhold` in EkspanderbarHjelpTekster

    const EkspanderbarInnhold = () => {
        switch (sporsmal.tag) {
            case TagTyper.TILBAKE_I_ARBEID:
                return <TilbakeIArbeidHjelpBody />
            case TagTyper.YRKESSKADE:
                return <DeprecatedYrkesskadeHjelpBody />
            case TagTyper.YRKESSKADE_V2:
                return <YrkesskadeHjelpBody />
            case TagTyper.FERIE_V2:
                return <FerieHjelpBody />
            case TagTyper.ANDRE_INNTEKTSKILDER_V2:
                return <AndreInntektskilderHjelpBody />
            case TagTyper.PERMISJON_V2:
                return <PermisjonHjelpBody />
            case TagTyper.UTLAND_V2:
                return <UtlandHjelpBody />
            case TagTyper.ARBEID_UNDERVEIS_100_PROSENT:
                return <ArbeidUnderveisHjelpBody />
            case TagTyper.ARBEID_UTENFOR_NORGE:
                return <ArbeidUtenforNorgeHjelpBody />
            case TagTyper.FRAVAR_FOR_SYKMELDINGEN:
                return <FravarForSykmeldingenHjelpBody />
            case TagTyper.JOBBET_DU_GRADERT:
                return <JobbetDuGradertArbeidstakerHjelpBody />
            case TagTyper.BRUKTE_REISETILSKUDDET:
                return <BrukteReisetilskuddetHjelpBody />
            case TagTyper.KVITTERINGER:
                return <KvitteringerHjelpBody />
            case TagTyper.INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_GRUPPE:
                return <EndringSNHjelpBody />
            case TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_EOS:
                return <MedlemskapOppholdUtenforEOSHjelpBody />
            case TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE:
                return <MedlemskapOppholdUtenforNorgeHjelpBody />
            case TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE:
                return <MedlemskapArbeidUtenforNorgeHjelpBody />
            default:
                if (harInnhold) {
                    return (
                        <BodyLong>
                            {parserWithReplace(tekst(`ekspanderbarhjelp.${nokkel?.toLowerCase()}.innhold` as any))}
                        </BodyLong>
                    )
                }
        }
    }

    const ekspanderbarInnhold = EkspanderbarInnhold()

    if (!nokkel || !ekspanderbarInnhold) {
        return null
    }

    const tittel =
        EkspanderbarHjelpTekster[
            `ekspanderbarhjelp.${nokkel.toLowerCase()}.tittel` as keyof typeof EkspanderbarHjelpTekster
        ] || 'Spørsmålet forklart'

    return (
        <ReadMore
            className="mb-8 mt-4 w-full"
            header={tittel}
            open={expanded}
            onClick={() => {
                logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                    tittel: tittel,
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
