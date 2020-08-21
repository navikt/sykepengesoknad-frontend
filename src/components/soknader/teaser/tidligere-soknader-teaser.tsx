import { HoyreChevron } from 'nav-frontend-chevron'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { getUrlTilSoknad } from '../../../utils/url-utils'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { InngangsHeader, InngangsIkon, Inngangspanel, InngangsStatus } from '../inngang/inngangspanel'
import {
    finnArbeidsgivernavn,
    hentIkon,
    hentIkonHover,
    hentTeaserStatustekst,
    SykepengesoknadTeaserProps
} from './teaser-util'

const TidligereSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype })
        }}>
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
                    <InngangsStatus status={soknad.status} tekst={hentTeaserStatustekst(soknad)} />
                    <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                        <Normaltekst className="inngangspanel__periode">
                            {getLedetekst(tekst('soknad.teaser.periode'), {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })}
                        </Normaltekst>
                    </Vis>
                    <Normaltekst className="inngangspanel__undertekst">
                        {soknad.soknadPerioder.map(p => {
                            if (soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER) {
                                return ''
                            }
                            if (soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE) {
                                return getLedetekst(tekst('soknad.teaser.sykmeldt-fra'), {
                                    '%GRAD%': p.grad,
                                    '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                                })
                            }
                            return getLedetekst(tekst('soknad.teaser.sykmeldt'), {
                                '%GRAD%': p.grad,
                            })
                        })}
                    </Normaltekst>
                </div>
            </Inngangspanel>
        </article>
    )
}

export default TidligereSoknaderTeaser
