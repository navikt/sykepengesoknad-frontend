import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element } from 'nav-frontend-typografi';

const LandSum = ({ sporsmal }: OppsummeringProps) => {
    const svarliste = sporsmal.svarliste.svar.length === 1
        ? <p className="sist">{sporsmal.svarliste.svar[0].verdi}</p>
        : (
            <ul className="oppsummering__landliste">
                {sporsmal.svarliste.svar.map((s) => {
                    return <li className="oppsummering__land" key={s.verdi}>{s.verdi}</li>;
                })}
            </ul>
        );
    return (
        <div className="oppsummering__fritekst">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__tekstsvar">{svarliste}</div>
        </div>
    );
};

export default LandSum;
