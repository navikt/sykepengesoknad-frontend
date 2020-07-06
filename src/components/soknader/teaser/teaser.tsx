import dayjs from 'dayjs'
import { HoyreChevron } from 'nav-frontend-chevron'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { getUrlTilSoknad } from '../../../utils/url-utils'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import {
    beregnUndertekst,
    hentIkon,
    hentIkonHover,
    hentTeaserStatustekst,
    SykepengesoknadTeaserProps } from './teaser-util'

const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()
    const stegId = soknad.status === RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING ? '1' : ''
    const undertekst = beregnUndertekst(soknad)

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype })
        }}>
            <Inngangspanel to={getUrlTilSoknad(soknad, stegId)}>
                <InngangsIkon
                    ikon={hentIkon(soknad.soknadstype)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <HoyreChevron />
                <div className="inngangspanel__innhold">
                    <InngangsHeader
                        meta={ getLedetekst(tekst('soknad.teaser.dato'), {
                            '%DATO%': dayjs(soknad.opprettetDato).format('DD.MM.YYYY'),
                        })}
                        tittel={soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                            ? tekst('soknad.utland.teaser.tittel')
                            : tekst('soknad.teaser.tittel')}
                        status={hentTeaserStatustekst(soknad)}
                    />
                    <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                        <Normaltekst className="inngangspanel__tekst">
                            {getLedetekst(tekst('soknad.teaser.tekst'), {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })}
                        </Normaltekst>
                    </Vis>
                    <Vis hvis={undertekst !== undefined}>
                        <Normaltekst className="inngangspanel__undertekst">
                            {undertekst}
                        </Normaltekst>
                    </Vis>
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
