import dayjs from 'dayjs';
import React, { useState } from 'react';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { InngangsHeader, InngangsIkon } from '../inngang/inngangspanel';
import Vis from '../../vis';
import { getLedetekst, tekst } from '../../../utils/tekster';
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { useAmplitudeInstance } from '../../amplitude/amplitude';
import {
    finnArbeidsgivernavn,
    hentIkon,
    hentIkonHover,
    hentTeaserStatustekst,
    SykepengesoknadTeaserProps
} from './teaser-util';
import ModalWrapper from 'nav-frontend-modal';
import Alertstripe from 'nav-frontend-alertstriper';

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance();
    const [ aapen, setAapen ] = useState<boolean>(false);

    ModalWrapper.setAppElement('#root');

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype });
        }}>
            <a className="inngangspanel" href={'/'}
                onClick={(e) => {
                    e.preventDefault();
                    setAapen(true)
                }}>
                <InngangsIkon
                    ikon={hentIkon(soknad.soknadstype)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <div className='inngangspanel--inaktivt'>
                    <InngangsHeader
                        meta={ getLedetekst(tekst('soknad.teaser.dato.fremtidig'), {
                            '%DATO%': dayjs(soknad.tom).add(1, 'day').format('DD.MM.YYYY'),
                        })}
                        tittel={soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                            ? tekst('soknad.utland.teaser.tittel')
                            : tekst('soknad.teaser.tittel')}
                        status={ hentTeaserStatustekst(soknad) }
                    />
                    <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                        <Normaltekst className='inngangspanel__tekst'>
                            {getLedetekst(tekst('soknad.teaser.tekst'), {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })}
                        </Normaltekst>
                    </Vis>
                    <Normaltekst className='inngangspanel__undertekst'>
                        { finnArbeidsgivernavn(soknad) }
                    </Normaltekst>
                </div>
            </a>
            <ModalWrapper onRequestClose={() => setAapen(false)}
                contentLabel={'planlagt'}
                isOpen={aapen}
            >
                <h3 className="modal__tittel">{tekst('soknader.teaser.fremtidig.dato-tittel')}</h3>
                <Alertstripe type="info">{getLedetekst(tekst('soknader.teaser.fremtidig.dato-info'), {
                    '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day'))
                })}</Alertstripe>
                <div className="blokk-xs knappplassering">
                    <button className="knapp knapp--hoved" onClick={() => setAapen(false)}>
                        Lukk
                    </button>
                </div>
            </ModalWrapper>
        </article>
    );
};

export default FremtidigeSoknaderTeaser;
