import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollTo } from '@navikt/digisyfo-npm';
import { Soknad } from '../../../types/types';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import { Innholdstittel } from 'nav-frontend-typografi';
import { getUrlTilSoknad } from '../../../utils/url-utils';
import StegindikatorEttSporsmalPerSide from './stegindikator-ett-sporsmal-per-side';
import KorrigerVarsel from '../../soknad/felles/korriger-varsel';
import TidligSoknad from '../../soknad/felles/tidlig-soknad';
import SykmeldingUtdrag from './sykmelding-utdrag';

interface SoknadskjemaProps {
    children: React.ReactNode,
    tittel: string,
    soknad: Soknad,
    intro: React.ReactNode,
    sidenummer: number,
    scroll: boolean,
}

const SoknadSkjema = ({ children, tittel, soknad, intro, sidenummer, scroll = true }: SoknadskjemaProps) => {

    useEffect(() => {
        if (scroll) {
            scrollTo(stegindikator, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let stegindikator: any;
    const forrigeUrl = getUrlTilSoknad(soknad.id, (sidenummer - 1).toString());

    return (
        <>
            {
                sidenummer > 1 && (
                    <div ref={(indikator) => {
                        stegindikator = indikator;
                    }}>
                        <StegindikatorEttSporsmalPerSide soknad={soknad} sidenummer={sidenummer}/>
                    </div>
                )
            }
            {
                sidenummer > 1 && (
                    <p>
                        <Link to={forrigeUrl} className="tilbakelenke">
                            Tilbake
                        </Link>
                    </p>
                )
            }
            {
                soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING &&
                <KorrigerVarsel/>
            }

            <TidligSoknad soknad={soknad}/>
            {intro}
            <SykmeldingUtdrag soknad={soknad} erApen={sidenummer === 1}/>

            {
                tittel &&
                <Innholdstittel tag="h2" className="soknad__stegtittel">{tittel}</Innholdstittel>
            }
            {children}
        </>
    );
};

export default SoknadSkjema;
