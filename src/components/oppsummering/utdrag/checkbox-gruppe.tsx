import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { OppsummeringProps, SporsmalVarianter } from '../oppsummering';
import { Sporsmal } from '../../../types/types';

const CheckboxGruppe = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className='oppsummering__sporsmal'>
            <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
            {sporsmal.undersporsmal.map((s: Sporsmal, idx) => {
                return <SporsmalVarianter sporsmal={s} key={idx}/>;
            })}
        </div>
    );
};

export default CheckboxGruppe;
