import { Next } from '@navikt/ds-icons'
import { Detail, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import Vis from '../../vis'
import { InngangsIkon, Inngangspanel, InngangsStatus } from '../inngang/inngangspanel'

import {
    hentIkon,
    hentIkonHover,
    hentTeaserStatustekst,
    periodeListevisning,
    SykepengesoknadTeaserProps,
    teaserTittel,
} from './teaser-util'

const TidligereSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`}>
            <Inngangspanel soknad={soknad}>
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
                            <Heading size="small" level="2" className="inngangspanel__tittel">
                                {teaserTittel(soknad)}
                            </Heading>
                            {periodeListevisning(soknad)}
                        </div>
                    </div>
                    <InngangsStatus status={soknad.status} tekst={hentTeaserStatustekst(soknad)} />
                </div>
                <Next className="chevron--hoyre" />
            </Inngangspanel>
        </article>
    )
}

export default TidligereSoknaderTeaser
