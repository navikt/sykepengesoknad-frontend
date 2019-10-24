import React from 'react';
import Status from './status';
import Utbetaling from './utbetaling';
import { Knapp } from 'nav-frontend-knapper';
import tekster from './status-panel-tekster';
import './status-panel.less';
import Vis from '../../../utils/vis';
import { useAppStore } from '../../../data/stores/app-store';

const StatusPanel = () => {
    const {valgtSoknad} = useAppStore();

    return (
        <div className="panel status-panel">
            <Vis hvis={valgtSoknad.sendtTilNAVDato !== undefined}>
                <Status />
                <Utbetaling />
            </Vis>

            <div className="knapperad">
                <Knapp mini type="standard">{tekster['statuspanel.knapp.endre']}</Knapp>
                <Knapp mini type="standard">{tekster['statuspanel.knapp.send']}</Knapp>
            </div>
        </div>
    );
};

export default StatusPanel;
