import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { useHistory, useParams } from 'react-router-dom';
import tekster from './knapperad-tekster';
import { useAppStore } from '../../../data/stores/app-store';

const Knapperad = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const stegNo = parseInt(stegId);
    const history = useHistory();

    const nesteSteg = () => {
        history.push('/soknader/' + valgtSoknad.id + '/' + (stegNo + 1));
    };

    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={nesteSteg}>{tekster['sykepengesoknad.ga-videre']}</Knapp>
            <Lenke href={'asdf'}>
                <Normaltekst>{tekster['sykepengesoknad.avbryt.trigger']}</Normaltekst>
            </Lenke>
        </div>
    )
};

export default Knapperad;
