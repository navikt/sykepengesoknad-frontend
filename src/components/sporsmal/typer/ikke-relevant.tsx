import React from 'react';
import { Element } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import Vis from '../../../utils/vis';
import { SpmProps } from '../sporsmal-form/sporsmal-form';

const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    return (
        <Vis hvis={sporsmal.sporsmalstekst !== undefined}>
            <>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
                <div className="redaksjonelt-innhold">
                    {parser(sporsmal.undertekst)}
                </div>
            </>
        </Vis>
    );
};

export default IkkeRelevant;
