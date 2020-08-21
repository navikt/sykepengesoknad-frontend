import { HoyreChevron } from 'nav-frontend-chevron'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import env from '../../../utils/environment'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { getUrlTilSoknad } from '../../../utils/url-utils'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import {
    hentIkon,
    hentIkonHover,
    leggTilSoknadstypeForDemoside,
    periodeListevisning,
    SykepengesoknadTeaserProps
} from './teaser-util'

// TODO: Skal det også legges til undertekst på "utkast til korrigering", "Sendt dato", "Opprettet", "Avbrutt dato"
const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()

    return (
        <article
            aria-labelledby={`soknader-header-${soknad.id}`}
            className="inngangspanel--ny"
            onClick={() => {
                logEvent('Velger søknad', { soknadstype: soknad.soknadstype })
            }}
        >
            <Inngangspanel to={getUrlTilSoknad(soknad)}>
                <InngangsIkon
                    ikon={hentIkon(soknad)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <HoyreChevron />
                <div className="inngangspanel__innhold">
                    <InngangsHeader
                        tittel={soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                            ? tekst('soknad.utland.teaser.tittel')
                            : tekst('soknad.teaser.tittel')}
                    />
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
            </Inngangspanel>
        </article>
    )
}

export default Teaser
