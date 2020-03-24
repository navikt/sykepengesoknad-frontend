import dayjs from 'dayjs';
import React from 'react';
import { Soknad } from '../../../types/types';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { Inngangspanel, InngangsHeader, InngangsIkon } from '../inngang/inngangspanel';
import { getUrlTilSoknad } from '../../../utils/url-utils';
import GlobeIkon from './globe.svg';
import GlobeHoverIkon from './globe-hover.svg';
import SoknaderIkon from '../../../pages/soknader/soknader.svg';
import SoknaderHoverIkon from '../../../pages/soknader/soknader-hover.svg';
import Vis from '../../vis';
import { getLedetekst } from '../../../utils/utils';
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils';
import tekster from './teaser-tekster';
import { Normaltekst } from 'nav-frontend-typografi';
import { getRiktigDato, getSendtTilSuffix } from '../../../utils/soknad-utils';
import { HoyreChevron } from 'nav-frontend-chevron';
import { useAmplitudeInstance } from '../../amplitude/amplitude';

const erSendtTilBeggeMenIkkeSamtidig = (soknad: Soknad) => {
    return soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato
        && soknad.sendtTilNAVDato.getTime() !== soknad.sendtTilArbeidsgiverDato.getTime();
};

const finnArbeidsgivernavn = (soknad: Soknad) => {
    return soknad.arbeidsgiver && soknad.arbeidsgiver.navn ? soknad.arbeidsgiver.navn : '';
};

interface SendtUliktProps {
    soknad: Soknad;
}

export const SendtUlikt = ({ soknad }: SendtUliktProps) => {
    return (
        <Normaltekst tag='span'>
            {getLedetekst(tekster['soknad.teaser.status.SENDT.til-arbeidsgiver'], {
                '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato).format('DD.MM.YYYY'),
                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
            })}
            <br/>
            {getLedetekst(tekster['soknad.teaser.status.SENDT.til-nav'], {
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

const beregnUndertekst = (soknad: Soknad) => {
    // const sendtTilBeggeMenIkkeSamtidig = erSendtTilBeggeMenIkkeSamtidig(soknad);

    if (soknad.status === RSSoknadstatus.AVBRUTT) {
        return getLedetekst(
            tekster['soknad.teaser.status.AVBRUTT'],
            { '%DATO%': dayjs(soknad.avbruttDato).format('DD.MM.YYYY') }
        );
    }

    if (soknad.status === RSSoknadstatus.FREMTIDIG) {
        return tekster['soknad.teaser.status.FREMTIDIG'];
    }

    const endelse = getSendtTilSuffix(soknad);
    const datoher = getRiktigDato(soknad);

    switch (soknad.soknadstype) {
        case RSSoknadstype.OPPHOLD_UTLAND:
        case RSSoknadstype.ARBEIDSLEDIG:
        case RSSoknadstype.ANNET_ARBEIDSFORHOLD:
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return soknad.status === RSSoknadstatus.SENDT
                ? getLedetekst(tekster['soknad.teaser.status.SENDT.til-nav'], {
                    '%DATO%': dayjs(datoher).format('DD.MM.YYYY'),
                })
                : '';
        }
        default: {
            switch (soknad.status) {
                case RSSoknadstatus.SENDT:
                    return erSendtTilBeggeMenIkkeSamtidig(soknad)
                        ? <SendtUlikt soknad={soknad}/>
                        : getLedetekst(tekster[`soknad.teaser.status.${soknad.status}${endelse}`], {
                            '%DATO%': dayjs(datoher).format('DD.MM.YYYY'),
                            '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                        });
                case RSSoknadstatus.NY:
                case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
                    return getLedetekst(tekster['soknad.teaser.undertekst'], {
                        '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                    });
                }
                default: {
                    return '';
                }
            }
        }
    }
};

export const hentTeaserStatustekst = (soknad: Soknad) => {
    if (
        soknad.status !== RSSoknadstatus.NY &&
        soknad.status !== RSSoknadstatus.SENDT &&
        soknad.status !== RSSoknadstatus.AVBRUTT
    ) {
        return getLedetekst(tekster[`soknad.teaser.status.${soknad.status}`], {
            '%DATO%': dayjs(getRiktigDato(soknad)).format('DD.MM.YYYY'),
        })
    }
    return '';
};

interface SykepengesoknadTeaserProps {
    soknad: Soknad;
}

const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance();
    const stegId = soknad.status === RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING ? '1' : '';
    const undertekst = beregnUndertekst(soknad);

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype });
        }}>
            <Inngangspanel to={getUrlTilSoknad(soknad.id, stegId)}>
                <InngangsIkon
                    ikon={hentIkon(soknad.soknadstype)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <HoyreChevron />
                <div className='inngangspanel__innhold'>
                    <InngangsHeader
                        meta={getLedetekst(tekster['soknad.teaser.dato'], {
                            '%DATO%': dayjs(soknad.opprettetDato).format('DD.MM.YYYY'),
                        })}
                        tittel={soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                            ? tekster['soknad.utland.teaser.tittel']
                            : tekster['soknad.teaser.tittel']}
                        status={hentTeaserStatustekst(soknad)}
                    />
                    <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                        <Normaltekst className='inngangspanel__tekst'>
                            {getLedetekst(tekster['soknad.teaser.tekst'], {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })}
                        </Normaltekst>
                    </Vis>
                    <Vis hvis={undertekst !== undefined}>
                        <Normaltekst className='inngangspanel__undertekst'>
                            {undertekst}
                        </Normaltekst>
                    </Vis>
                </div>
            </Inngangspanel>
        </article>
    );
};

export default Teaser;
