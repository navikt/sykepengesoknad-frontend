import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '@navikt/aksel-icons'

import { TagTyper } from '../../../types/enums'
import useSoknad from '../../../hooks/useSoknad'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { RouteParams } from '../../../app'
import { SEPARATOR } from '../../../utils/constants'
import { logEvent } from '../../amplitude/amplitude'
import { tekst } from '../../../utils/tekster'
import { Soknad } from '../../../types/types'

const TilbakeKnapp = ({ soknad, stegNo }: { soknad: Soknad; stegNo: number }) => {
    if (stegNo == 1) {
        return <div></div> //Tom div pga flex justify-between på parent
    }

    return (
        <Link
            to={`/soknader/${soknad.id}${SEPARATOR}${stegNo - 1}${window.location.search}`}
            className="navds-link"
            onClick={() => {
                logEvent('navigere', {
                    lenketekst: tekst('soknad.tilbakeknapp'),
                    fra: soknad!.sporsmal[stegNo - 1].tag,
                    til: soknad!.sporsmal[stegNo - 2].tag,
                    soknadstype: soknad?.soknadstype,
                    stegId: `${stegNo}`,
                })
            }}
        >
            <ArrowLeftIcon />
            <BodyShort as="span">{tekst('soknad.tilbakeknapp')}</BodyShort>
        </Link>
    )
}

const Fremdriftsbar = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const aktivtSteg = parseInt(stegId!) - 1
    const steg = valgtSoknad!.sporsmal.filter((s) => s.tag !== TagTyper.VAER_KLAR_OVER_AT)
    const antallSteg = steg.length
    const style = {
        width: `${(100 / antallSteg) * aktivtSteg}%`,
    }
    if (!valgtSoknad || !stegId) return null
    return (
        <div
            className="my-4 md:my-6"
            role="progressbar"
            aria-valuenow={aktivtSteg}
            aria-valuemin={1}
            aria-valuemax={steg.length}
            aria-label="Søknadssteg"
        >
            <div className="relative mx-auto mt-4">
                <div className="h-3 rounded-lg bg-gray-200" />
                <div className="-mt-3 h-3 rounded-lg bg-gray-900" style={style} />
            </div>
            <div className="mt-4 flex justify-between">
                <TilbakeKnapp soknad={valgtSoknad} stegNo={parseInt(stegId!)} />
                <BodyShort as="span">
                    {parserWithReplace(`${aktivtSteg}&nbsp;av&nbsp;${antallSteg}`) + ' steg'}
                </BodyShort>
            </div>
        </div>
    )
}

export default Fremdriftsbar
