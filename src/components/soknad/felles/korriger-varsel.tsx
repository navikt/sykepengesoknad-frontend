import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

const KorrigerVarsel = () => {
    return (
        <Alertstripe type="info" className="blokk">
            <Normaltekst className="sist">Rediger det som er feil i søknaden, og send den inn på nytt.</Normaltekst>
        </Alertstripe>
    );
};

export default KorrigerVarsel;
