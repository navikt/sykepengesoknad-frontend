import parser from 'html-react-parser'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
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
        if (sporsmal.tag == TagTyper.TILBAKE_I_ARBEID && valgtSoknad!.soknadstype == RSSoknadstype.GRADERT_REISETILSKUDD) {
            return 'tilbake_i_arbeid_gradert_reisetilskudd'
        }
        return fjernIndexFraTag(sporsmal.tag).toLowerCase()
    }

    const nokkel = skapNokkel()

    const harTekst = () => {
        return `ekspanderbarhjelp.${nokkel}.tittel` in EkspanderbarHjelpTekster && `ekspanderbarhjelp.${nokkel}.innhold` in EkspanderbarHjelpTekster
    }


    return (
        <Vis hvis={harTekst()}
            render={() => {

                const tittel = tekst(`ekspanderbarhjelp.${nokkel}.tittel` as any)
                return <>
                    <Ekspanderbar
                        title={tittel}
                        amplitudeProps={{ 'component': tittel, sporsmaltag: nokkel }}>
                        <Normaltekst>{parser(tekst(`ekspanderbarhjelp.${nokkel}.innhold` as any))}</Normaltekst>
                    </Ekspanderbar>
                </>
            }}
        />
    )
}

