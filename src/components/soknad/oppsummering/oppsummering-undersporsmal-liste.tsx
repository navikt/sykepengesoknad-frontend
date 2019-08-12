import React from 'react';
import { Sporsmal } from '../../../types/types';
import OppsummeringSporsmal from './oppsummering-sporsmal';
import { getKey } from './oppsummering-visning';

interface OppsummeringUndersporsmalListeProps {
    sporsmalsliste: Sporsmal[],
    overskriftsnivaa: number,
}

const OppsummeringUndersporsmalListe = ({ sporsmalsliste = [], overskriftsnivaa = 4 }: OppsummeringUndersporsmalListeProps) => {
    return sporsmalsliste.length > 0 ? (
        <div className="oppsummering__undersporsmalsliste">
            {
                sporsmalsliste.map((sporsmal) => {
                    return <OppsummeringSporsmal {...sporsmal} key={getKey(sporsmal.tag, sporsmal.id)} overskriftsnivaa={overskriftsnivaa}/>;
                })
            }
        </div>
    ) : null;
};

export default OppsummeringUndersporsmalListe;
