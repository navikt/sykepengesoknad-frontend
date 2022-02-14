import { Knapp } from 'nav-frontend-knapper'
import React from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import AvbrytSoknadModal from '../../avbryt-soknad-modal/avbryt-soknad-modal'
import AvsluttOgFortsettSenere from '../../avslutt-og-fortsett-senere/avslutt-og-fortsett-senere'
import PersonvernLesMer from '../../soknad-intro/personvern-les-mer'
import Vis from '../../vis'


interface KnapperadProps {
    poster: boolean;
}

const Knapperad = ({ poster }: KnapperadProps) => {

    const { valgtSoknad } = useAppStore()
    const { stegId } = useParams<RouteParams>()

    const stegNo = parseInt(stegId)
    const spmIndex = stegNo - 2
    const erUtlandssoknad = valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND

    const nokkel = spmIndex === valgtSoknad!.sporsmal.length - (valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? 2 : 3)
        ? 'sykepengesoknad.send'
        : 'sykepengesoknad.ga-videre'


    return (
        <div className="knapperad">
            <Knapp type="hoved" htmlType="submit" spinner={poster}>{tekst(nokkel)}</Knapp>
            <div className="avbrytDialog blokk-l">
                <AvsluttOgFortsettSenere />
                <hr />
                <Vis hvis={stegNo === 1 && !erUtlandssoknad}
                    render={() =>
                        <PersonvernLesMer />
                    }
                />
                <AvbrytSoknadModal />
            </div>

        </div>
    )
}

export default Knapperad
