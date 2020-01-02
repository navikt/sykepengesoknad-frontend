import React from 'react';
import Vis from '../../../utils/vis';
import SporsmalSwitch from './sporsmal-switch';
import { Sporsmal } from '../../../types/types';

const UndersporsmalListe = ({ undersporsmal }: any) => {
    return (
        undersporsmal.map((underspm: Sporsmal, idx: number) => {
            return (
                <Vis hvis={underspm.kriterieForVisningAvUndersporsmal !== undefined} key={idx}>
                    <SporsmalSwitch sporsmal={underspm} />
                </Vis>
            );
        }).filter((underspm: any) => underspm !== null)
    );
};

export default UndersporsmalListe;
