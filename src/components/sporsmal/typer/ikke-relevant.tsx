import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import Vis from '../../vis';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { useFormContext } from 'react-hook-form';

const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    const { register } = useFormContext();

    return (
        <Vis hvis={sporsmal.sporsmalstekst !== undefined}>
            <React.Fragment>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
                <div className="redaksjonelt-innhold">
                    <Normaltekst tag="div">{parser(sporsmal.undertekst)}</Normaltekst>
                </div>
                <input name={sporsmal.id} ref={register} type="hidden" value={sporsmal.undertekst} />
            </React.Fragment>
        </Vis>
    );
};

export default IkkeRelevant;
