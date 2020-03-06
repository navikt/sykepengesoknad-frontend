import React from 'react';
import Status from './status';
import Utbetaling from './utbetaling';
import { Knapp } from 'nav-frontend-knapper';
import tekster from './status-panel-tekster';
import Vis from '../../vis';
import { useAppStore } from '../../../data/stores/app-store';
import './status-panel.less';
import env from '../../../utils/environment';
import useFetch from '../../../data/rest/use-fetch';
import { RSSoknad } from '../../../types/rs-types/rs-soknad';
import { FetchState, hasData } from '../../../data/rest/utils';
import { Soknad } from '../../../types/types';
import { useHistory } from 'react-router';

const StatusPanel = () => {
    const { valgtSoknad, soknader, setSoknader } = useAppStore();
    const korrigerSoknad = useFetch<RSSoknad>();
    const history = useHistory();

    const korriger = () => {
        korrigerSoknad.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/korriger`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {
            if (hasData(fetchState)) {
                const soknad = new Soknad(fetchState.data);
                soknader.push(soknad);
                setSoknader(soknader);
                console.log('location', history.location.pathname);
                history.push(soknad.id);
            }
        });
    };

    const ettersendNav = () => {
        const res = fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/ettersendTilNav`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('ETTERSEND_NAV', res);
    };

    const ettersendArbeidsgiver = () => {
        const res = fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/ettersendTilArbeidsgiver`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('ETTERSEND_ARB', res);
    };

    return (
        <div className='panel status-panel'>
            <Vis hvis={valgtSoknad.sendtTilNAVDato || valgtSoknad.sendtTilArbeidsgiverDato}>
                <Status />
                <Utbetaling />
            </Vis>

            <div className='knapperad'>
                <Knapp mini type='standard' onClick={() => korriger() } >{tekster['statuspanel.knapp.endre']}</Knapp>
                <Knapp mini type='standard' onClick={() => ettersendNav() }>{tekster['statuspanel.knapp.send-nav']}</Knapp>
                <Vis hvis={valgtSoknad.arbeidsgiver}>
                    <Knapp mini type='standard' onClick={() => ettersendArbeidsgiver() }>{tekster['statuspanel.knapp.send-arbeidsgiver']}</Knapp>
                </Vis>
            </div>
        </div>
    );
};

export default StatusPanel;
