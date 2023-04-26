import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { TagTyper } from '../../../types/enums'
import useSoknad from '../../../hooks/useSoknad'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { RouteParams } from '../../../app'

const Fremdriftsbar = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const stegNo = parseInt(stegId!)

    const aktivtSteg = parseInt(stegId!)
    const steg = valgtSoknad!.sporsmal.filter((s) => s.tag !== TagTyper.VAER_KLAR_OVER_AT)
    const antallSteg = steg.length
    const style = {
        width: `${(100 / antallSteg) * stegNo}%`,
    }
    return (
        <div
            className="my-4 md:my-8"
            role="progressbar"
            aria-valuenow={aktivtSteg}
            aria-valuemin={1}
            aria-valuemax={steg.length}
            aria-label="Søknadssteg"
        >
            <div className="relative mx-auto mt-4">
                <BodyShort as="span" className="relative block text-right" style={style}>
                    {parserWithReplace(`${stegId}&nbsp;av&nbsp;${antallSteg}`)}
                </BodyShort>
                <div className="h-1.5 rounded-lg bg-gray-200 md:h-4" />
                <div className="-mt-1.5 h-1.5 rounded-lg bg-deepblue-500 md:-mt-4 md:h-4" style={style} />
            </div>
        </div>
    )
}

export default Fremdriftsbar
