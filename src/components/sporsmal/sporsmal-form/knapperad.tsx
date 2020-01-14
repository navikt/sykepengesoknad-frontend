import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from './knapperad-tekster';
import { useParams } from 'react-router-dom';

interface KnapperadProps {
    onSubmit: Function;
}

const Knapperad = ({ onSubmit }: KnapperadProps) => {
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const nokkel = spmIndex === 9 ? 'sykepengesoknad.send' : 'sykepengesoknad.ga-videre';

    // TODO: Lenke i avbryt-knapp mangler

    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onSubmit}>{tekster[nokkel]}</Knapp>
            <Lenke href={'asdf'}>
                <Normaltekst>{tekster['sykepengesoknad.avbryt.trigger']}</Normaltekst>
            </Lenke>
        </div>
    )
};

export default Knapperad;
