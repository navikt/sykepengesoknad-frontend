import { HoyreChevron } from 'nav-frontend-chevron'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import env from '../../../utils/environment'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { getUrlTilSoknad } from '../../../utils/url-utils'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import {
    hentIkon,
    hentIkonHover,
    leggTilSoknadstypeForDemoside,
    periodeListevisning,
    SykepengesoknadTeaserProps
} from './teaser-util'

const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()

    return (
        <article
            aria-labelledby={`soknader-header-${soknad.id}`}
            onClick={() => logEvent('Velger søknad', { soknadstype: soknad.soknadstype })}
        >
            <Inngangspanel to={getUrlTilSoknad(soknad)} className="inngangspanel--ny">
                <div className="inngangspanel__del1">
                    <InngangsIkon
                        ikon={hentIkon(soknad)}
                        ikonHover={hentIkonHover(soknad)}
                    />
                    <div className="inngangspanel__innhold">
                        <Systemtittel tag="h3" className="inngangspanel__tittel">
                            {soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                                ? tekst('soknad.utland.teaser.tittel')
                                : tekst('soknad.teaser.tittel')}
                        </Systemtittel>
                        <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                            <Normaltekst className="inngangspanel__periode">
                                {getLedetekst(tekst('soknad.teaser.periode'), {
                                    '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                                })}
                            </Normaltekst>
                        </Vis>
                        {periodeListevisning(soknad)}
                        <Vis hvis={env.isOpplaering}>
                            {leggTilSoknadstypeForDemoside(soknad)}
                        </Vis>
                    </div>
                </div>
                <div className="inngangspanel__del2">
                    <HoyreChevron />
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
