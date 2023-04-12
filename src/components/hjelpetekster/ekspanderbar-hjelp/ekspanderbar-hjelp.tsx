import { BodyLong, BodyShort, Button, Heading, Link, Modal, ReadMore } from '@navikt/ds-react'
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
import { AndreInntektskilderBody } from './andre-inntektskilder-hjelp'
import { EkspanderbarHjelpTekster } from './ekspanderbar-hjelp-tekst'

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

    const harTekst = `ekspanderbarhjelp.${nokkel}.tittel` in EkspanderbarHjelpTekster

    if (!(nokkel && harTekst)) {
        return null
    }
    const tittel = tekst(`ekspanderbarhjelp.${nokkel}.tittel` as any)

    const EkspanderbarInnhold = () => {
        if (sporsmal.tag == TagTyper.TILBAKE_I_ARBEID) {
            return <TilbakeIArbeidHjelpBody />
        }
        if (sporsmal.tag == TagTyper.YRKESSKADE) {
            return <YrkesskadeBody />
        }

        if (sporsmal.tag == TagTyper.ANDRE_INNTEKTSKILDER_V2) {
            return <AndreInntektskilderBody />
        }

        
        return <BodyLong>{parserWithReplace(tekst(`ekspanderbarhjelp.${nokkel}.innhold` as any))}</BodyLong>
    }

    return (
        <ReadMore
            className={'mt-4 mb-8 w-full'}
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
            <div className={'mt-4'}>
                <EkspanderbarInnhold />
            </div>
        </ReadMore>
    )
}

const TilbakeIArbeidHjelpBody = () => {
    return (
        <>
            <BodyLong>{EkspanderbarHjelpTekster['ekspanderbarhjelp.tilbake_i_arbeid.body1']}</BodyLong>
            <BodyLong className={'mt-4'}>
                {EkspanderbarHjelpTekster['ekspanderbarhjelp.tilbake_i_arbeid.body2']}
            </BodyLong>
            <BodyLong className={'mt-4'}>
                {EkspanderbarHjelpTekster['ekspanderbarhjelp.tilbake_i_arbeid.body3']}
            </BodyLong>
        </>
    )
}

const YrkesskadeBody = () => {
    return (
        <>
            <BodyLong>{EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.body1']}</BodyLong>
            <BodyLong className={'mt-4'}>
                {EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.body2']}
                <Link href={'https://www.nav.no/yrkesskade'} target={'_blank'}>
                    {EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.hva-er-lenke']}
                </Link>
            </BodyLong>
            <BodyLong className={'mt-4'}>{EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.body3']}</BodyLong>
        </>
    )


    
}





