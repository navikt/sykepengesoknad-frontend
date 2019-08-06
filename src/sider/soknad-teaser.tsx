import dayjs from 'dayjs';
import * as React from 'react';
import { Soknad } from '../types/types';
import { getLedetekst, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype';
import {
    Inngangspanel, InngangspanelHeader, InngangspanelIkon,
    InngangspanelUndertekst
} from './inngangspanel';
import { getUrlTilSoknad } from '../utils/url-utils';
import GlobeIkon from './globe.svg';
import GlobeHoverIkon from './globe-hover.svg';
import SoknaderIkon from './soknader.svg';
import SoknaderHoverIkon from './soknader-hover.svg';

// import { erSendtTilBeggeMenIkkeSamtidig } from './sykepengesoknad-utils';

const finnArbeidsgivernavn = (soknad: Soknad) => {
    return soknad.arbeidsgiver
    && soknad.arbeidsgiver.navn
        ? soknad.arbeidsgiver.navn
        : null;
};

/*
export const SendtUlikt = (soknad: Soknad) => {
    return (
        <span>
            {
                getLedetekst('soknad.teaser.status.SENDT.til-arbeidsgiver', {
                    '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato).format(),
                    '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                })
            }
            <br/>
            {
                getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                    '%DATO%': dayjs(soknad.sendtTilNAVDato).format(),
                })
            }
        </span>
    );
};
*/

const hentIkon = (soknadstype: RSSoknadstype) => {
    return soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? GlobeIkon : SoknaderIkon;
};

const hentIkonHover = (soknadstype: RSSoknadstype) => {
    return soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? GlobeHoverIkon : SoknaderHoverIkon;
};

const beregnUndertekst = (soknad: Soknad) => {
    // const sendtTilBeggeMenIkkeSamtidig = erSendtTilBeggeMenIkkeSamtidig(soknad);

    if (soknad.status === RSSoknadstatus.AVBRUTT) {
        return getLedetekst('soknad.teaser.status.AVBRUTT', {
            '%DATO%': dayjs(soknad.avbruttDato).format(),
        });
    }

    if (soknad.status === RSSoknadstatus.FREMTIDIG) {
        return getLedetekst(`soknad.teaser.status.${RSSoknadstatus.FREMTIDIG}`);
    }

    switch (soknad.soknadstype) {
        case RSSoknadstype.OPPHOLD_UTLAND:
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return soknad.status === RSSoknadstatus.SENDT
                ? getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                    '%DATO%': dayjs(soknad.sendtTilNAVDato).format(),
                })
                : null;
        }
        default: {
            switch (soknad.status) {
                case RSSoknadstatus.SENDT:
                    /* TODO: Avklare om dette bare gjelder gammel søknad
                                    case RSSoknadstatus.TIL_SENDING: {
                                        return sendtTilBeggeMenIkkeSamtidig
                                            ? <SendtUlikt soknad={soknad}/>
                                            : getLedetekst(`soknad.teaser.status.${soknad.status}${getSendtTilSuffix(soknad)}`, {
                                                '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato).format(),
                                                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                                            });
                                    }
                    */
                    break;
                case RSSoknadstatus.NY:
                case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
                    return getLedetekst('soknad.teaser.undertekst', {
                        '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                    });
                }
                default: {
                    return null;
                }
            }
        }
    }
};

interface TeaserUndertekstProps {
    soknad: Soknad;
}

export const TeaserUndertekst = ({ soknad }: TeaserUndertekstProps) => {
    const tekst = beregnUndertekst(soknad);
    return tekst ? (
        <InngangspanelUndertekst>
            {tekst}
        </InngangspanelUndertekst>
    ) : null;
};

export const hentTeaserStatustekst = (soknad: Soknad) => {
    const visStatus = [RSSoknadstatus.NY, RSSoknadstatus.SENDT, RSSoknadstatus.AVBRUTT].indexOf(soknad.status) === -1;
    return visStatus
        ? getLedetekst(`soknad.teaser.status.${soknad.status}`, {
            '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato).format(),
        })
        : null;
};

interface TeaserPeriodeProps {
    soknad: Soknad;
}

export const TeaserPeriode = ({ soknad }: TeaserPeriodeProps) => {
    return soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND
        ?
        <p className="inngangspanel__tekst">
            {
                getLedetekst('soknad.teaser.tekst', {
                    '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                })
            }
        </p>
        : null;
};

interface SykepengesoknadTeaserProps {
    soknad: Soknad;
}

const SoknadTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const status = soknad.status ? soknad.status.toLowerCase() : '';

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`}>
            <Inngangspanel className={`js-panel js-soknad-${status}`}
                to={getUrlTilSoknad(soknad.id, '')}>
                <InngangspanelIkon
                    ikon={hentIkon(soknad.soknadstype)}
                    ikonHover={hentIkonHover(soknad.soknadstype)}
                />
                <div className="inngangspanel__innhold">
                    <InngangspanelHeader
                        id={`soknad-header-${soknad.id}`}
                        meta={getLedetekst('soknad.teaser.dato', {
                            '%DATO%': dayjs(soknad.opprettetDato).format(),
                        })}
                        tittel={getLedetekst(soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                            ? 'soknad.utland.teaser.tittel'
                            : 'soknad.teaser.tittel')}
                        status={hentTeaserStatustekst(soknad)}/>
                    <TeaserPeriode soknad={soknad}/>
                    <TeaserUndertekst soknad={soknad}/>
                </div>
            </Inngangspanel>
        </article>
    );
};

export default SoknadTeaser;
