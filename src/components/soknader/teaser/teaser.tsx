import { HoyreChevron } from 'nav-frontend-chevron'
import { Undertekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import env from '../../../utils/environment'
import { getUrlTilSoknad } from '../../../utils/url-utils'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import VisBlock from '../../vis-block'
import { InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import { hentIkon, hentIkonHover, leggTilSoknadstypeForDemoside, periodeListevisning, SykepengesoknadTeaserProps, teaserTittel } from './teaser-util'

const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()

    return (
        <article
            aria-labelledby={`soknader-header-${soknad.id}`}
            onClick={() => logEvent('skjema åpnet', { soknadstype: soknad.soknadstype })}
        >
            <Inngangspanel to={getUrlTilSoknad(soknad)} className="inngangspanel--ny">
                <div className="inngangspanel__del1">
                    <InngangsIkon
                        ikon={hentIkon(soknad)}
                        ikonHover={hentIkonHover(soknad)}
                    />
                    <div className="inngangspanel__innhold">
                        <VisBlock hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                            render={() => {
                                return (
                                    <Undertekst className="inngangspanel__periode">
                                        {tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom)}
                                    </Undertekst>
                                )
                            }}
                        />
                        <Undertittel tag="h3" className="inngangspanel__tittel">
                            {teaserTittel(soknad)}
                        </Undertittel>

                        {periodeListevisning(soknad)}

                        <VisBlock hvis={env.isOpplaering}
                            render={() => leggTilSoknadstypeForDemoside(soknad)}
                        />
                    </div>
                </div>
                <HoyreChevron />
            </Inngangspanel>
        </article>
    )
}

export default Teaser
