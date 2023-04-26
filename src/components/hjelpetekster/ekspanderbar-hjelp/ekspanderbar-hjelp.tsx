import { BodyLong, ReadMore } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { TagTyper } from '../../../types/enums'
import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../../sporsmal/sporsmal-utils'
import { RouteParams } from '../../../app'
import useSoknad from '../../../hooks/useSoknad'
import { logEvent } from '../../amplitude/amplitude'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

import { AndreInntektskilderBody } from './andre-inntektskilder-body'
import { EkspanderbarHjelpTekster } from './ekspanderbar-hjelp-tekst'
import { TilbakeIArbeidBody } from './tilbake-i-arbeid-body'
import { YrkesskadeBody } from './yrkesskad-body'
import { FerieBody } from './ferie-body'
import { PermisjonBody } from './permisjon-body'
import { UtlandBody } from './utland-body'
import { ArbeidUnderveisBody } from './arbeid-underveis-body'
import { ArbeidUtenforNorgeBody } from './arbeid-utenfor-norge-body'
import { FravarForSykmeldingenBody } from './fravar-for-sykmeldingen-body'
import { JobbetDuGradertArbeidstakerBody } from './jobbet-gradert-arbeidstaker'
import { BrukteReisetilskuddetBody } from './brukte-reisetilskuddet-body'

export const EkspanderbarHjelp = ({ sporsmal }: SpmProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
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
            return 'tilbake_i_arbeid_gradert_reisetilskudd'
        }
        if (
            fjernIndexFraTag(sporsmal.tag) == TagTyper.JOBBET_DU_GRADERT &&
            valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.ARBEIDSTAKER
        ) {
            return 'jobbet_du_gradert_arbeidstaker'
        }
        if (
            sporsmal.tag == TagTyper.ANDRE_INNTEKTSKILDER &&
            valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.FRILANSER
        ) {
            // Hjelpeteksten er ikke kompatibel med svaralternativene for frilanser
            return null
        }
        return fjernIndexFraTag(sporsmal.tag).toLowerCase()
    }

    const nokkel = skapNokkel()
    const harInnhold = `ekspanderbarhjelp.${nokkel}.innhold` in EkspanderbarHjelpTekster

    const EkspanderbarInnhold = () => {
        switch (sporsmal.tag) {
            case TagTyper.TILBAKE_I_ARBEID:
                return <TilbakeIArbeidBody />
            case TagTyper.YRKESSKADE:
                return <YrkesskadeBody />
            case TagTyper.FERIE_V2:
                return <FerieBody />
            case TagTyper.ANDRE_INNTEKTSKILDER_V2:
                return <AndreInntektskilderBody />
            case TagTyper.PERMISJON_V2:
                return <PermisjonBody />
            case TagTyper.UTLAND_V2:
                return <UtlandBody />
            case TagTyper.ARBEID_UNDERVEIS_100_PROSENT:
                return <ArbeidUnderveisBody />
            case TagTyper.ARBEID_UTENFOR_NORGE:
                return <ArbeidUtenforNorgeBody />
            case TagTyper.FRAVAR_FOR_SYKMELDINGEN:
                return <FravarForSykmeldingenBody />
            case TagTyper.JOBBET_DU_GRADERT:
                return <JobbetDuGradertArbeidstakerBody />
            case TagTyper.BRUKTE_REISETILSKUDDET:
                return <BrukteReisetilskuddetBody />
            default:
                if (harInnhold) {
                    return <BodyLong>{parserWithReplace(tekst(`ekspanderbarhjelp.${nokkel}.innhold` as any))}</BodyLong>
                }
        }
    }

    const ekspanderbarInnhold = EkspanderbarInnhold()

    if (!nokkel || !ekspanderbarInnhold) {
        return null
    }

    const tittel =
        EkspanderbarHjelpTekster[`ekspanderbarhjelp.${nokkel}.tittel` as keyof typeof EkspanderbarHjelpTekster] ||
        'Spørsmålet forklart'

    return (
        <ReadMore
            className={'mb-8 mt-4 w-full'}
            header={tittel}
            open={expanded}
            onClick={() => {
                logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                    tittel: tittel,
                    component: 'hjelpetekst',
                    sporsmaltag: nokkel,
                })

                setExpanded((prev) => !prev)
            }}
        >
            <div className={'mt-4'}>{ekspanderbarInnhold}</div>
        </ReadMore>
    )
}
