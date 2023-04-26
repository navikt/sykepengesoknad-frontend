import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Back } from '@navikt/ds-icons'

import { TagTyper } from '../../../types/enums'
import useSoknad from '../../../hooks/useSoknad'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { RouteParams } from '../../../app'
import { SEPARATOR } from '../../../utils/constants'
import { logEvent } from '../../amplitude/amplitude'
import { tekst } from '../../../utils/tekster'

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
    if (!valgtSoknad || !stegId) return null
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
                <div className="h-1.5 rounded-lg bg-gray-200 md:h-4" />
                <div className="-mt-1.5 h-1.5 rounded-lg bg-deepblue-500 md:-mt-4 md:h-4" style={style} />
            </div>
            <div className={'mt-4 flex justify-between'}>
                <Link
                    to={`/soknader/${valgtSoknad.id}${SEPARATOR}${stegNo - 1}${window.location.search}`}
                    className="navds-link tilbakelenke"
                    onClick={() => {
                        logEvent('navigere', {
                            lenketekst: tekst('soknad.tilbakeknapp'),
                            fra: valgtSoknad!.sporsmal[stegNo - 1].tag,
                            til: valgtSoknad!.sporsmal[stegNo - 2].tag,
                            soknadstype: valgtSoknad?.soknadstype,
                            stegId: stegId,
                        })
                    }}
                >
                    <Back className="chevron--venstre" />
                    <BodyShort as="span">{tekst('soknad.tilbakeknapp')}</BodyShort>
                </Link>
                <BodyShort as="span">
                    {parserWithReplace(`${stegId}&nbsp;av&nbsp;${antallSteg}`) + ' spørsmål'}
                </BodyShort>
            </div>
        </div>
    )
}

export default Fremdriftsbar
