import React from 'react';
import Undersporsmal from './undersporsmal';
import { Sporsmal } from '../../../types/types';
import Vis from '../../../utils/vis';

interface UndersporsmalProps {
    undersporsmal: Sporsmal[];
}

const UndersporsmalListe = ({ undersporsmal }: UndersporsmalProps) => {

    const sporsmalsliste = undersporsmal
        .map((underspm: Sporsmal, idx: number) => {
            return (
                <Vis hvis={underspm.kriterieForVisningAvUndersporsmal !== undefined} key={idx}>
                    <Undersporsmal sporsmal={underspm} key={underspm.tag}/>
                </Vis>
            );
        })
        .filter((underspm) => {
            return underspm !== null;
        });

    return (
        <Vis hvis={sporsmalsliste.length > 0}>
            <div>{sporsmalsliste}</div>
        </Vis>
    );
};

export default UndersporsmalListe;
