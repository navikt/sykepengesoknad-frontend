import React from 'react';
import { Sporsmal } from '../../../types/types';
import { Element } from 'nav-frontend-typografi';

interface UkjentSporsmalProps {
    sporsmal: Sporsmal;
}

const UkjentSporsmal = ({ sporsmal }: UkjentSporsmalProps) => {
    return (
        <React.Fragment>
            <Element tag="h3" className="skjema__sporsmal">Ukjent svartype: <code>{sporsmal.svartype}</code></Element>
            <pre>{JSON.stringify(sporsmal, null, 2)}</pre>
        </React.Fragment>
    );
};

export default UkjentSporsmal;
