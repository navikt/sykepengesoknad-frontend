import { BodyLong } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import { Ekspanderbar } from '../../ekspanderbar/ekspanderbar'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import { EkspanderbarHjelpTekster } from './ekspanderbar-hjelp-tekst'

export const EkspanderbarHjelp = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useAppStore()

    const skapNokkel = () => {
        if (
            sporsmal.tag == TagTyper.TILBAKE_I_ARBEID &&
            valgtSoknad!.soknadstype == RSSoknadstype.GRADERT_REISETILSKUDD
        ) {
            return 'tilbake_i_arbeid_gradert_reisetilskudd'
        }
        if (
            fjernIndexFraTag(sporsmal.tag) == TagTyper.JOBBET_DU_GRADERT &&
            valgtSoknad!.arbeidssituasjon == RSArbeidssituasjon.ARBEIDSTAKER
        ) {
            return 'jobbet_du_gradert_arbeidstaker'
        }
        if (
            sporsmal.tag == TagTyper.ANDRE_INNTEKTSKILDER &&
            valgtSoknad!.arbeidssituasjon == RSArbeidssituasjon.FRILANSER
        ) {
            // Hjelpeteksten er ikke kompatibel med svaralternativene for frilanser
            return null
        }
        return fjernIndexFraTag(sporsmal.tag).toLowerCase()
    }

    const nokkel = skapNokkel()

    const harTekst = () => {
        return (
            `ekspanderbarhjelp.${nokkel}.tittel` in EkspanderbarHjelpTekster &&
            `ekspanderbarhjelp.${nokkel}.innhold` in EkspanderbarHjelpTekster
        )
    }

    return (
        <Vis
            hvis={nokkel && harTekst()}
            render={() => {
                const tittel = tekst(
                    `ekspanderbarhjelp.${nokkel}.tittel` as any
                )
                return (
                    <>
                        <Ekspanderbar
                            title={tittel}
                            sporsmalId={sporsmal.id}
                            amplitudeProps={{
                                component: tittel,
                                sporsmaltag: nokkel,
                            }}
                        >
                            <BodyLong>
                                {parser(
                                    tekst(
                                        `ekspanderbarhjelp.${nokkel}.innhold` as any
                                    )
                                )}
                            </BodyLong>
                        </Ekspanderbar>
                    </>
                )
            }}
        />
    )
}
