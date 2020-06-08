import parser from 'html-react-parser';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

import { tekst } from '../../utils/tekster';

const Utbetaling = () => {
    return (
        <div className='avsnitt'>
            <EtikettLiten tag='h3' className='avsnitt-hode'>{tekst('kvittering.utbetaling.tittel')}</EtikettLiten>
            <Normaltekst>{parser(tekst('sykepengesoknad.sykepengeinfo.til-nav'))}</Normaltekst>
        </div>
    );
};

export default Utbetaling;
