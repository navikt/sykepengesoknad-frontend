import React from 'react';
import StatusPanel from './status-panel';
import Opplysninger from '../../components/soknaden/opplysninger/opplysninger';
import Oppsummering from '../../components/soknaden/oppsummering/oppsummering';

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
