import React from 'react';
import { Element } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import Undersporsmal from '../../../sporsmal/undersporsmal';
import { OppsummeringProps } from '../oppsummering';

const UndertekstSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__VisUndertekst">
            <Element tag="h4">{sporsmal.sporsmalstekst}</Element>
            <div className="redaksjonelt-innhold">
                {parser(sporsmal.undertekst)}
            </div>
            <Undersporsmal sporsmal={sporsmal} />
        </div>
    );
};

export default UndertekstSum;
