import { BodyShort } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { TagTyper } from '../../../types/enums'
import { Sporsmal } from '../../../types/types'
import { tekst } from '../../../utils/tekster'
import { hentNokkel } from '../sporsmal-utils'
import useSoknad from '../../../hooks/useSoknad'

import Steg from './steg'

interface FremdriftsbarProps {
    antallSteg: number
}

const Fremdriftsbar = ({ antallSteg }: FremdriftsbarProps) => {
    const { stegId } = useParams<RouteParams>()
    const stegNo = parseInt(stegId)
    const style = {
        width: `${(100 / antallSteg) * stegNo}%`,
    }

    return (
        <div className="fremdriftsbar">
            <BodyShort as="span" className="fremdriftsbar__tekst" style={style}>
                {parser(`${stegId}&nbsp;av&nbsp;${antallSteg}`)}
            </BodyShort>
            <div className="fremdriftsbar__fullbredde" />
            <div className="fremdriftsbar__fremdrift" style={style} />
        </div>
    )
}

const SporsmalSteg = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const aktivtSteg = parseInt(stegId)
    const steg = valgtSoknad!.sporsmal.filter((s) => s.tag !== TagTyper.VAER_KLAR_OVER_AT)

    return (
        <div
            className="stegindikator-med-fremdriftsbar"
            role="progressbar"
            aria-valuenow={aktivtSteg}
            aria-valuemin={1}
            aria-valuemax={steg.length}
            aria-label="Søknadssteg"
        >
            <div className="stegindikator stegindikator--kompakt">
                <ol className="stegindikator__liste">
                    {steg.map((sporsmal: Sporsmal, idx: number) => {
                        return <Steg index={idx} key={idx} label={tekst(hentNokkel(valgtSoknad!, idx + 1) as any)} />
                    })}
                </ol>
            </div>
            <Fremdriftsbar antallSteg={steg.length} />
        </div>
    )
}

export default SporsmalSteg
