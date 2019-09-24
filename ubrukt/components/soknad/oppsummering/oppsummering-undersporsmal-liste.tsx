import * as React from 'react';
import { Sporsmal } from '../../../../src/types/types';
// import OppsummeringSporsmal from './oppsummering-sporsmal';

interface OppsummeringUndersporsmalListeProps {
    sporsmalsliste: Sporsmal[],
    overskriftsnivaa: number,
}

const OppsummeringUndersporsmalListe = ({ sporsmalsliste = [], overskriftsnivaa = 4 }: OppsummeringUndersporsmalListeProps) => {
    return sporsmalsliste.length > 0 ? (
        <div className="oppsummering__undersporsmalsliste">
            {
                sporsmalsliste.map((sporsmal) => {
                    return sporsmal.undersporsmal[0].sporsmalstekst;
                })
            }
        </div>
    ) : null;
};

export default OppsummeringUndersporsmalListe;
