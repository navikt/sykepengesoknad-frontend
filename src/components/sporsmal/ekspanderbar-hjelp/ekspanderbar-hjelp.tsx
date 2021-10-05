import React from 'react'

import { tekst } from '../../../utils/tekster'
import { Ekspanderbar } from '../../ekspanderbar/ekspanderbar'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import { EkspanderbarHjelpTekster } from './ekspanderbar-hjelp-tekst'


export const EkspanderbarHjelp = ({ sporsmal }: SpmProps) => {

    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase()

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
                        {tekst(`ekspanderbarhjelp.${nokkel}.innhold` as any)}
                    </Ekspanderbar>
                </>
            }}
        />
    )
}

