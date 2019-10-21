import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { OppsummeringProps, SporsmalVarianter } from '../oppsummering';
import { Sporsmal } from '../../../../types/types';
import Vis from '../../../../utils/vis';

const CheckboxGruppe = ({ sporsmal }: OppsummeringProps) => {
    return (
        <Vis hvis={sporsmal.sporsmalstekst !== null}>
            <div className="oppsummering__sporsmal">
                <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
                {sporsmal.undersporsmal.map((s: Sporsmal, idx) => {
                    return <SporsmalVarianter sporsmal={s} key={idx}/>;
                })}
            </div>
        </Vis>
    );
};

export default CheckboxGruppe;
