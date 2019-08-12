import React from 'react';
import KvitteringArbeidstakersoknad from './kvittering-arbeidstakersoknad';
import { Soknad } from '../../types/types';

interface KvitteringProps {
    soknad: Soknad,
}

const Kvittering = ({ soknad }: KvitteringProps) => {
    return (<KvitteringArbeidstakersoknad soknad={soknad} />);
};

export default Kvittering;
