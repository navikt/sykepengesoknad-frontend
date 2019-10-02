import dayjs from 'dayjs';
import * as React from 'react';
import { Soknad } from '../../../types/types';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import {
    Inngangspanel, InngangspanelHeader, InngangspanelIkon
} from '../../../sider/inngangspanel';
import { getUrlTilSoknad } from '../../../utils/url-utils';
import GlobeIkon from '../../../sider/globe.svg';
import GlobeHoverIkon from '../../../sider/globe-hover.svg';
import SoknaderIkon from '../../../sider/soknader.svg';
import SoknaderHoverIkon from '../../../sider/soknader-hover.svg';
import Vis from '../../../utils/vis';
import { getLedetekst } from '../../../utils/utils';
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/datoUtils';
import tekster from './soknad-teaser-tekster';
import { Normaltekst } from 'nav-frontend-typografi';
import { getSendtTilSuffix } from '../../../utils/soknad-utils';
import parser from 'html-react-parser';

const erSendtTilBeggeMenIkkeSamtidig = (soknad: Soknad) => {
    return soknad.sendtTilNAVDato
        && soknad.sendtTilArbeidsgiverDato
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
        <span>
            {getLedetekst(tekster['soknad.teaser.status.SENDT.til-arbeidsgiver'], {
                '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato).format('DD.MM.YYYY'),
                '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
            })}
            <br/>
            {getLedetekst(tekster['soknad.teaser.status.SENDT.til-nav'], {
                '%DATO%': dayjs(soknad.sendtTilNAVDato).format('DD.MM.YYYY'),
            })}
        </span>
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

    console.log('suffix', getSendtTilSuffix(soknad)); //tslint:disable-line

    switch (soknad.soknadstype) {
        case RSSoknadstype.OPPHOLD_UTLAND:
        case RSSoknadstype.ARBEIDSLEDIG:
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return soknad.status === RSSoknadstatus.SENDT
                ? getLedetekst(tekster['soknad.teaser.status.SENDT.til-nav'], {
                    '%DATO%': dayjs(soknad.sendtTilNAVDato).format('DD.MM.YYYY'),
                })
                : '';
        }
        default: {
            switch (soknad.status) {
                case RSSoknadstatus.SENDT:
                    return erSendtTilBeggeMenIkkeSamtidig(soknad)
                        ? <SendtUlikt soknad={soknad}/>
                        : getLedetekst(tekster[`soknad.teaser.status.${soknad.status}${getSendtTilSuffix(soknad)}`], {
                            '%DATO%': tilLesbarDatoMedArstall(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
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
    const visStatus = [RSSoknadstatus.NY, RSSoknadstatus.SENDT, RSSoknadstatus.AVBRUTT].indexOf(soknad.status) === -1;
    return visStatus
        ? getLedetekst(`soknad.teaser.status.${soknad.status}`, {
            '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato).format('DD.MM.YYYY'),
        })
        : null;
};

interface SykepengesoknadTeaserProps {
    soknad: Soknad;
}

const SoknadTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const status = soknad.status ? soknad.status.toLowerCase() : '';
    const undertekst = beregnUndertekst(soknad);

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
                        meta={getLedetekst(tekster['soknad.teaser.dato'], {
                            '%DATO%': dayjs(soknad.opprettetDato).format('DD.MM.YYYY'),
                        })}
                        tittel={soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                            ? parser(tekster['soknad.utland.teaser.tittel'])
                            : tekster['soknad.teaser.tittel']}
                        status={hentTeaserStatustekst(soknad)}/>
                    <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                        <p className="inngangspanel__tekst">
                            {getLedetekst(tekster['soknad.teaser.tekst'], {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })}
                        </p>
                    </Vis>
                    <Vis hvis={undertekst !== undefined}>
                        <Normaltekst className="inngangspanel__undertekst">
                            {undertekst}
                        </Normaltekst>
                    </Vis>
                </div>
            </Inngangspanel>
        </article>
    );
};

export default SoknadTeaser;
