import { Next } from '@navikt/ds-icons'
import { Undertekst, Undertittel } from 'nav-frontend-typografi'
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
    teaserTittel
} from './teaser-util'

const TidligereSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`}>
            <Inngangspanel soknad={soknad}>
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon ikon={hentIkon(soknad)} ikonHover={hentIkonHover(soknad)} />
                        <div id={`soknader-header-${soknad.id}`} className="inngangspanel__innhold">
                            <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                                render={() =>
                                    <Undertekst className="inngangspanel__periode">
                                        {tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom)}
                                    </Undertekst>
                                }
                            />
                            <Undertittel tag="h3" className="inngangspanel__tittel">
                                {teaserTittel(soknad)}
                            </Undertittel>
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
