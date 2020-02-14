import React from 'react';
import Status from './status';
import Utbetaling from './utbetaling';
import { Knapp } from 'nav-frontend-knapper';
import tekster from './status-panel-tekster';
import Vis from '../../vis';
import { useAppStore } from '../../../data/stores/app-store';
import './status-panel.less';

const StatusPanel = () => {
    const { valgtSoknad, sendTil } = useAppStore();

    return (
        <div className="panel status-panel">
            <Vis hvis={sendTil.length > 0}>
                <Status />
                <Utbetaling />
            </Vis>

            <div className="knapperad">
                <Knapp mini type="standard">{tekster['statuspanel.knapp.endre']}</Knapp>
                <Knapp mini type="standard">{tekster['statuspanel.knapp.send-nav']}</Knapp>
                <Vis hvis={valgtSoknad.arbeidsgiver !== undefined}>
                    <Knapp mini type="standard">{tekster['statuspanel.knapp.send-arbeidsgiver']}</Knapp>
                </Vis>
            </div>
        </div>
    );
};

export default StatusPanel;
