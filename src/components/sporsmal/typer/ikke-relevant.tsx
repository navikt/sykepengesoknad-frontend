import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import Vis from '../../vis';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';

const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    return (
        <Vis hvis={sporsmal.sporsmalstekst !== undefined}>
            <>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
                <div className="redaksjonelt-innhold">
                    <Normaltekst tag="div">{parser(sporsmal.undertekst)}</Normaltekst>
                </div>

                <div className="undersporsmal">
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </div>
            </>
        </Vis>
    );
};

export default IkkeRelevant;
