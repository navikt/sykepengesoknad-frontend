import React from 'react';
import { Sporsmal } from '../../../src/types/types';

interface UkjentSporsmalProps {
    sporsmal: Sporsmal,
}

const UkjentSporsmal = ({ sporsmal }: UkjentSporsmalProps) => {
    return (
        <div>
            <strong className="skjema__sporsmal">Ukjent svartype: <code>{sporsmal.svartype}</code></strong>
            <pre>{JSON.stringify(sporsmal, null, 2)}</pre>
        </div>
    );
};

export default UkjentSporsmal;
