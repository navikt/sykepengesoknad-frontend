import React from 'react';
import { Soknad, Sporsmal } from '../../../src/types/types';
import SporsmalComponent from './sporsmal-component';

interface SporsmalListeProps {
    sporsmal: Sporsmal,
    soknad: Soknad,
}

const SporsmalListe = ({ sporsmal, soknad }: SporsmalListeProps) => {
    return (
        <SporsmalComponent
            soknad={soknad}
            hovedsporsmal
            sporsmal={sporsmal}
            key={sporsmal.tag}
            name={sporsmal.tag}
        />
    );
};

export default SporsmalListe;
