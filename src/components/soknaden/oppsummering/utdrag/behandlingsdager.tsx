import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element } from 'nav-frontend-typografi';
import Vis from '../../../vis';
import UndersporsmalSum from './undersporsmal-sum';

const Behandlingsdager = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Vis hvis={sporsmal.undersporsmal !== undefined}>
                <div className="oppsummering__sporsmal">
                    <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
                    <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal}/>
                </div>
            </Vis>
        </>
    )
};

export default Behandlingsdager;
