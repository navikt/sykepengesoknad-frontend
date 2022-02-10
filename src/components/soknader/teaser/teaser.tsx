import { HoyreChevron } from 'nav-frontend-chevron'
import { Undertekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../../types/types'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import env from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
import { getUrlTilSoknad } from '../../../utils/url-utils'
import Vis from '../../vis'
import { InngangsIkon, Inngangspanel, InngangsStatus } from '../inngang/inngangspanel'
import {
    hentIkon,
    hentIkonHover,
    leggTilSoknadstypeForDemoside,
    periodeListevisning,
    SykepengesoknadTeaserProps,
    teaserTittel
} from './teaser-util'

const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {

    const erDelvisUtfylt = function(soknad: Soknad): boolean {
        const soknaderMedSvar = soknad.sporsmal.filter((sporsmal) => {
            return sporsmal.svarliste.svar.length !== 0
        })

        return soknaderMedSvar.length > 0 && (soknaderMedSvar.length !== soknad.sporsmal.length)
    }

    return (
        <article
            aria-labelledby={`soknader-header-${soknad.id}`}
        >
            <Inngangspanel to={getUrlTilSoknad(soknad)} className="inngangspanel--ny">
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon
                            ikon={hentIkon(soknad)}
                            ikonHover={hentIkonHover(soknad)}
                        />
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

                            <Vis hvis={env.isOpplaering()}
                                render={() => leggTilSoknadstypeForDemoside(soknad)}
                            />
                        </div>
                    </div>

                    <Vis hvis={erDelvisUtfylt(soknad)}
                        render={() =>
                            <InngangsStatus status={soknad.status} tekst={tekst('soknad.teaser.delvis-utfylt.tekst')} />
                        }
                    />
                </div>
                <HoyreChevron />
            </Inngangspanel>
        </article>
    )
}

export default Teaser
