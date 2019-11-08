import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element } from 'nav-frontend-typografi';

const Fritekst = ({ sporsmal }: OppsummeringProps) => {

    return (
        <div className="oppsummering__fritekst">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <p className="sist">{sporsmal.svarliste.svar[0].verdi}</p>
        </div>
    );
};

export default Fritekst;
