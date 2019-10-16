import React from 'react';
import Status from './status';
import Utbetaling from './utbetaling';
import { Knapp } from 'nav-frontend-knapper';
import tekster from './status-panel-tekster';
import './status-panel.less';

const StatusPanel = () => {
    return (
        <div className="panel status-panel">
            <Status/>
            <Utbetaling/>

            <div className="knapperad">
                <Knapp mini type="standard">{tekster['statuspanel.knapp.endre']}</Knapp>
                <Knapp mini type="standard">{tekster['statuspanel.knapp.send']}</Knapp>
            </div>
        </div>
    );
};

export default StatusPanel;
