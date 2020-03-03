import React from 'react';
import parser from 'html-react-parser';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import tekster from './status-panel-tekster'

const Utbetaling = () => {
    return (
        <div className='avsnitt'>
            <EtikettLiten tag='h3' className='avsnitt-hode'>{tekster['statuspanel.utbetaling.tittel']}</EtikettLiten>
            <Normaltekst>{parser(tekster['sykepengesoknad.sykepengeinfo.til-nav'])}</Normaltekst>
        </div>
    );
};

export default Utbetaling;
