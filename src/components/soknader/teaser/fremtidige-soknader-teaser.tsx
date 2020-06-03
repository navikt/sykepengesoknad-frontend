import dayjs from 'dayjs';
import React from 'react';
import { Soknad } from '../../../types/types';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel';
import { getUrlTilSoknad } from '../../../utils/url-utils';
import GlobeIkon from './globe.svg';
import GlobeHoverIkon from './globe-hover.svg';
import SoknaderIkon from '../../../pages/soknader/soknader.svg';
import SoknaderHoverIkon from '../../../pages/soknader/soknader-hover.svg';
import Vis from '../../vis';
import { getLedetekst, tekst } from '../../../utils/tekster';
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { useAmplitudeInstance } from '../../amplitude/amplitude';
import { hentTeaserStatustekst } from './teaser';

const finnArbeidsgivernavn = (soknad: Soknad) => {
    return soknad.arbeidsgiver && soknad.arbeidsgiver.navn ? soknad.arbeidsgiver.navn : '';
};

interface SendtUliktProps {
    soknad: Soknad;
}

export const SendtUlikt = ({ soknad }: SendtUliktProps) => {
    return (
        <Normaltekst tag='span'>
            {getLedetekst(tekst('soknad.teaser.status.SENDT.til-arbeidsgiver'), {
                '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato).format('DD.MM.YYYY'),
                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
            })}
            <br/>
            {getLedetekst(tekst('soknad.teaser.status.SENDT.til-nav'), {
                '%DATO%': dayjs(soknad.sendtTilNAVDato).format('DD.MM.YYYY'),
            })}
        </Normaltekst>
    );
};

const hentIkon = (soknadstype: RSSoknadstype) => {
    return soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? GlobeIkon : SoknaderIkon;
};

const hentIkonHover = (soknadstype: RSSoknadstype) => {
    return soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? GlobeHoverIkon : SoknaderHoverIkon;
};

interface SykepengesoknadTeaserProps {
    soknad: Soknad;
}

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance();

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype });
        }}>
            <Inngangspanel to={getUrlTilSoknad(soknad.id, '')}>
                <InngangsIkon
                    ikon={hentIkon(soknad.soknadstype)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <HoyreChevron />
                <div className='inngangspanel__innhold'>
                    <InngangsHeader
                        meta={ getLedetekst(tekst('soknad.teaser.dato'), {
                            '%DATO%': dayjs(soknad.opprettetDato).format('DD.MM.YYYY'),
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
