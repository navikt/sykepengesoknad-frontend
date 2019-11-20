import React from 'react';
import Vis from '../../../utils/vis';
import Undersporsmal from './undersporsmal';
import { Sporsmal } from '../../../types/types';

export interface UndersporsmalProps {
    undersporsmal: Sporsmal[];
}

const UndersporsmalListe = ({ undersporsmal }: UndersporsmalProps) => {
    return (
        <Vis hvis={undersporsmal.length > 0}>
            <div className="undersporsmal">
                {undersporsmal.map((underspm: Sporsmal, idx: number) => {
                    return (
                        <Vis hvis={underspm.kriterieForVisningAvUndersporsmal !== undefined} key={idx}>
                            <Undersporsmal sporsmal={underspm} key={idx} />
                        </Vis>
                    );
                }).filter((underspm) => underspm !== null)}
            </div>
        </Vis>
    );
};

export default UndersporsmalListe;
