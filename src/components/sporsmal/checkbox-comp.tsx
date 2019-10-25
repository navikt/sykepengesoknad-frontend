import React from 'react';
import Undersporsmal from './undersporsmal';
import { Checkbox } from 'nav-frontend-skjema';
import { Field } from 'formik';
import { Soknad, Sporsmal } from '../../types/types';
import { getOnChange } from '../../utils/get-on-change';
import { formaterEnkeltverdi, genererParseForCheckbox } from './field-utils';

interface CheckboxProps {
    sporsmalstekst?: string;
    undersporsmal?: Sporsmal[];
    name?: string;
    renderComponent?: Function;
    soknad: Soknad;
    children?: React.ReactNode;
}

const CheckboxComp = (props: CheckboxProps) => {
    const { sporsmalstekst, undersporsmal, name, soknad } = props;
    let usporsmal = undersporsmal;
    if (usporsmal === undefined) {
        usporsmal = soknad.sporsmal[0].undersporsmal;
    }
    const parse = genererParseForCheckbox();
    return (
        <Field
            onChange={getOnChange(props)}
            parse={parse}
            format={formaterEnkeltverdi}
            component={<Checkbox label={sporsmalstekst}/>}
            name={name}
            label={sporsmalstekst === undefined ? soknad.sporsmal[0].sporsmalstekst : sporsmalstekst}
            id={name === undefined ? soknad.soknadstype : name}>
            {
                usporsmal.map((spm, index) => {
                    return <Undersporsmal sporsmal={spm} key={`${spm.tag}-${index}`}/>;
                })
            }
        </Field>
    );
};

export default CheckboxComp;
