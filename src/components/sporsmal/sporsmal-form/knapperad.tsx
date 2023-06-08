import { Button } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import AvbrytSoknadModal from '../../avbryt-soknad-modal/avbryt-soknad-modal'
import AvsluttOgFortsettSenere from '../../avslutt-og-fortsett-senere/avslutt-og-fortsett-senere'
import PersonvernLesMer from '../../soknad-intro/personvern-les-mer'
import Vis from '../../vis'
import { Soknad } from '../../../types/types'

interface KnapperadProps {
    soknad: Soknad
    poster: boolean
}

const Knapperad = ({ soknad, poster }: KnapperadProps) => {
    const router = useRouter()
    const { stegId } = router.query as { id: string; stegId: string }
    const stegNo = parseInt(stegId!)
    const spmIndex = stegNo - 2
    const erUtlandssoknad = soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND

    const nokkel = () => {
        const erSisteSteg =
            spmIndex === soknad.sporsmal.length - (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? 2 : 3)
        if (erSisteSteg) {
            if (soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
                return 'sykepengesoknad.send.endringene'
            }
            return 'sykepengesoknad.send'
        }
        return 'sykepengesoknad.ga-videre'
    }

    return (
        <div className="my-8" data-cy="knapperad">
            <Button variant="primary" type="submit" loading={poster} className="mb-12 mt-6">
                {tekst(nokkel())}
            </Button>

            <AvsluttOgFortsettSenere />
            <AvbrytSoknadModal />
            <Vis
                hvis={stegNo === 1 && !erUtlandssoknad}
                render={() => (
                    <>
                        <hr className="my-4" />
                        <PersonvernLesMer soknadstype={soknad.soknadstype} />
                    </>
                )}
            />
        </div>
    )
}

export default Knapperad
