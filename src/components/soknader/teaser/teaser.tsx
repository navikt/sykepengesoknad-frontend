import { HoyreChevron } from 'nav-frontend-chevron'
import { Undertekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { erDelvisUtfyltNySoknad } from '../../../pages/soknad/soknad-link'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import env from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
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

    return (
        <article
            aria-labelledby={`soknader-header-${soknad.id}`}
        >
            <Inngangspanel soknad={soknad} className="inngangspanel--ny">
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

                    <Vis hvis={erDelvisUtfyltNySoknad(soknad)}
                        render={() =>
                            <InngangsStatus status={soknad.status} tekst={tekst('soknad.teaser.delvis-utfylt.tekst')} />
                        }
                    />

                    <Vis hvis={soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}
                        render={() =>
                            <InngangsStatus status={soknad.status}
                                tekst={tekst('soknad.teaser.utkast-korrigering.tekst')} />
                        }
                    />
                </div>
                <HoyreChevron />
            </Inngangspanel>
        </article>
    )
}

export default Teaser
