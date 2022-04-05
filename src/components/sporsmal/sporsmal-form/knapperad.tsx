import { Button } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import AvbrytSoknadModal from '../../avbryt-soknad-modal/avbryt-soknad-modal'
import AvsluttOgFortsettSenere from '../../avslutt-og-fortsett-senere/avslutt-og-fortsett-senere'

interface KnapperadProps {
    poster: boolean
}

const Knapperad = ({ poster }: KnapperadProps) => {

    const { valgtSoknad } = useAppStore()
    const { stegId } = useParams<RouteParams>()

    const stegNo = parseInt(stegId)
    const spmIndex = stegNo - 2

    const nokkel = spmIndex === valgtSoknad!.sporsmal.length - (valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? 2 : 3)
        ? 'sykepengesoknad.send'
        : 'sykepengesoknad.ga-videre'


    return (
        <div className="knapperad">
            <Button variant="primary" type="submit" loading={poster}>{tekst(nokkel)}</Button>
            <div className="avbrytDialog blokk-l">
                <AvsluttOgFortsettSenere />
                <hr />
                <AvbrytSoknadModal />
            </div>

        </div>
    )
}

export default Knapperad
