import parser from 'html-react-parser';
import { Element } from 'nav-frontend-typografi';
import React from 'react';

import { OppsummeringProps } from '../oppsummering';

const UndertekstSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className='oppsummering__VisUndertekst'>
            <Element tag='h4'>{sporsmal.sporsmalstekst}</Element>
            <div className='redaksjonelt-innhold'>
                {parser(sporsmal.undertekst)}
            </div>
        </div>
    );
};

export default UndertekstSum;
