import React from 'react';
import { useHistory } from 'react-router';
import { Knapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import Vis from '../vis';
import env from '../../utils/environment';
import { Soknad } from '../../types/types';
import { logger } from '../../utils/logger';
import { tekst } from '../../utils/tekster';
import Status from '../status/status';
import useFetch from '../../data/rest/use-fetch';
import Utbetaling from '../status/utbetaling';
import { getUrlTilSoknad } from '../../utils/url-utils';
import { useAppStore } from '../../data/stores/app-store';
import { RSSoknad } from '../../types/rs-types/rs-soknad';
import Ettersending from '../status/ettersending';
import { FetchState, hasData } from '../../data/rest/utils';
import './status-panel.less';

const StatusPanel = () => {
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
                history.push(getUrlTilSoknad(soknad.id, '1'));
                setFeilmeldingTekst('');
            } else {
                logger.error('Feil ved opprettelse av UTKAST_TIL_KORRIGERING', fetchState);
                setFeilmeldingTekst(tekst('statuspanel.korrigering.feilet'));
            }
        });
    };

    return (
        <div className='panel status-panel'>
            <Vis hvis={valgtSoknad!.sendtTilNAVDato || valgtSoknad!.sendtTilArbeidsgiverDato}>
                <Status/>
                <Utbetaling/>
            </Vis>

            <div className='knapperad'>
                <Knapp mini type='standard' onClick={korriger}>{tekst('statuspanel.knapp.endre')}</Knapp>

                <Ettersending gjelder='nav'/>

                <Vis hvis={valgtSoknad!.arbeidsgiver !== undefined}>
                    <Ettersending gjelder='arbeidsgiver'/>
                </Vis>
            </div>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst !== ''}>
                    <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>
                </Vis>
            </div>
        </div>
    );
};

export default StatusPanel;
