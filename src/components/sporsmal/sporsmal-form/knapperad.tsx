import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from './knapperad-tekster';

interface KnapperadProps {
    onSubmit: Function;
}

const Knapperad = ({ onSubmit }: KnapperadProps) => {
    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onSubmit}>{tekster['sykepengesoknad.ga-videre']}</Knapp>
            <Lenke href={'asdf'}>
                <Normaltekst>{tekster['sykepengesoknad.avbryt.trigger']}</Normaltekst>
            </Lenke>
        </div>
    )
};

export default Knapperad;
