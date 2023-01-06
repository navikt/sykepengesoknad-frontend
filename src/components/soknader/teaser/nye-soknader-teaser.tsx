import { Next } from '@navikt/ds-icons'
import { Detail, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { isOpplaering } from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { InngangsIkon, Inngangspanel, InngangsStatus } from '../inngang/inngangspanel'

import {
    hentIkon,
    hentIkonHover,
    leggTilSoknadstypeForDemoside,
    periodeListevisning,
    SykepengesoknadTeaserProps,
    teaserTittel,
} from './teaser-util'

const NyeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`}>
            <Inngangspanel soknad={soknad} className="inngangspanel--ny">
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon ikon={hentIkon(soknad)} ikonHover={hentIkonHover(soknad)} />
                        <div id={`soknader-header-${soknad.id}`} className="inngangspanel__innhold">
                            <Vis
                                hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                                render={() => (
                                    <Detail className="inngangspanel__periode">
                                        {tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom)}
                                    </Detail>
                                )}
                            />
                            <Heading size="small" as="h3" className="inngangspanel__tittel">
                                {teaserTittel(soknad)}
                            </Heading>

                            {periodeListevisning(soknad)}

                            <Vis hvis={isOpplaering()} render={() => leggTilSoknadstypeForDemoside(soknad)} />
                        </div>
                    </div>

                    <Vis
                        hvis={soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}
                        render={() => (
                            <InngangsStatus
                                status={soknad.status}
                                tekst={tekst('soknad.teaser.utkast-korrigering.tekst')}
                            />
                        )}
                    />
                </div>
                {/* TODO: fjern onResize og onResizeCapture ved oppdatering til React 18. */}
                <Next className="chevron--hoyre" onResize={undefined} onResizeCapture={undefined} />
            </Inngangspanel>
        </article>
    )
}

export default NyeSoknaderTeaser
