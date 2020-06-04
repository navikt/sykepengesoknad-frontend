import dayjs from 'dayjs';
import React from 'react';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel';
import { getUrlTilSoknad } from '../../../utils/url-utils';
import Vis from '../../vis';
import { getLedetekst, tekst } from '../../../utils/tekster';
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { useAmplitudeInstance } from '../../amplitude/amplitude';
import {
    finnArbeidsgivernavn,
    hentIkon,
    hentIkonHover,
    hentTeaserStatustekst,
    SykepengesoknadTeaserProps
} from './teaser-util';

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance();

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype });
        }}>
            <Inngangspanel to={getUrlTilSoknad(soknad, '')}>
                <InngangsIkon
                    ikon={hentIkon(soknad.soknadstype)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <HoyreChevron />
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
                        { finnArbeidsgivernavn(soknad)}
                    </Normaltekst>
                </div>
            </Inngangspanel>
        </article>
    );
};

export default FremtidigeSoknaderTeaser;
