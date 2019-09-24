import React from 'react';
import Undersporsmal from './undersporsmal';
import { Soknad, Sporsmal } from '../../../src/types/types';

interface UndersporsmalslisteProps {
    undersporsmal: Sporsmal[],
    soknad: Soknad,
}

const UndersporsmalListe = ({ undersporsmal, soknad }: UndersporsmalslisteProps) => {
    const sporsmalsliste = undersporsmal
        .filter((underspm) => {
            return underspm.svar !== null;
        })
        .map((underspm) => {
            return underspm.kriterieForVisningAvUndersporsmal
                ? <Undersporsmal
                    sporsmal={underspm}
                    key={underspm.tag}
                    soknad={soknad}
                />
                : null;
        })
        .filter((underspm) => {
            return underspm !== null;
        });

    return sporsmalsliste.length > 0
        ? <div>{sporsmalsliste}</div>
        : null;
};

export default UndersporsmalListe;
