import React from 'react';
import StatusPanel from './status-panel/status-panel';
import Opplysninger from './opplysninger/opplysninger';
import Oppsummering from './oppsummering/oppsummering';

const Kvittering = () => {

    return (
        <>
            <StatusPanel />
            <Opplysninger ekspandert={false} />
            <Oppsummering />
        </>
    )
};

export default Kvittering;
