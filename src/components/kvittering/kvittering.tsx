import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import Opplysninger from '../opplysninger/opplysninger';
import Oppsummering from '../oppsummering/oppsummering';
import { Knapp } from 'nav-frontend-knapper';
import { tekst } from '../../utils/tekster';
import Ettersending from '../status/ettersending';
import Vis from '../vis';
import env from '../../utils/environment';
import { FetchState, hasData } from '../../data/rest/utils';
import { RSSoknad } from '../../types/rs-types/rs-soknad';
import { Soknad } from '../../types/types';
import { getUrlTilSoknad } from '../../utils/url-utils';
import { logger } from '../../utils/logger';
import { useAppStore } from '../../data/stores/app-store';
import useFetch from '../../data/rest/use-fetch';
import { useHistory } from 'react-router';
import KvitteringStatus from './kvittering-status';
import KvitteringInfo from './kvittering-info';
import './kvittering.less';

const Kvittering = () => {
    const { valgtSoknad, soknader, setSoknader, feilmeldingTekst, setFeilmeldingTekst } = useAppStore();
    const korrigerSoknad = useFetch<RSSoknad>();
    const history = useHistory();

    const korriger = () => {
        korrigerSoknad.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/korriger`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {
            if (hasData(fetchState)) {
                const soknad = new Soknad(fetchState.data);
                soknader.push(soknad);
                setSoknader(soknader);
                history.push(getUrlTilSoknad(soknad.id, undefined));
                setFeilmeldingTekst('');
            } else {
                logger.error('Feil ved opprettelse av UTKAST_TIL_KORRIGERING', fetchState);
                setFeilmeldingTekst(tekst('kvittering.korrigering.feilet'));
            }
        });
    };

    return (
        <div className="kvittering">
            <KvitteringStatus />
            <KvitteringInfo />
            <Opplysninger ekspandert={false} />
            <Oppsummering />

            <div className='knapperad'>
                <Knapp mini type='standard' onClick={korriger}>{tekst('kvittering.knapp.endre')}</Knapp>

                <Ettersending gjelder='nav' />

                <Vis hvis={valgtSoknad!.arbeidsgiver !== undefined}>
                    <Ettersending gjelder='arbeidsgiver' />
                </Vis>
            </div>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst !== ''}>
                    <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>
                </Vis>
            </div>
        </div>
    )
};

export default Kvittering;
