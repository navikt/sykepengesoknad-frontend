import './teaser.less'

import dayjs from 'dayjs'
import Alertstripe from 'nav-frontend-alertstriper'
import ModalWrapper from 'nav-frontend-modal'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { InngangsHeader, InngangsIkon } from '../inngang/inngangspanel'
import {
    finnArbeidsgivernavn,
    hentIkon,
    hentIkonHover,
    SykepengesoknadTeaserProps
} from './teaser-util'

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)


    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype })
        }}>
            <button className="inngangspanel inngangspanel__btn pointer"
                onClick={() => setAapen(true)}>
                <InngangsIkon
                    ikon={hentIkon(soknad)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <div className="inngangspanel--inaktivt">
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
            </button>
            <ModalWrapper className="modal__teaser_popup" onRequestClose={() => setAapen(false)}
                contentLabel={'planlagt'}
                isOpen={aapen}
            >
                <Systemtittel tag="h3" className="modal__tittel">
                    {tekst('soknader.teaser.fremtidig.dato-tittel')}
                </Systemtittel>
                <Alertstripe type="info">{getLedetekst(tekst('soknader.teaser.fremtidig.dato-info'), {
                    '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day'))
                })}</Alertstripe>
                <button className="knapp knapp--hoved" onClick={() => setAapen(false)}>
                    Lukk
                </button>
            </ModalWrapper>
        </article>
    )
}

export default FremtidigeSoknaderTeaser
