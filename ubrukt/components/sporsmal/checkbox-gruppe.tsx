import React from 'react';
import CheckboxComp from './checkbox-comp';
import { Soknad, Sporsmal } from '../../../src/types/types';
import { FieldArray } from 'formik';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Feilomrade from '../skjema/feilomrade';

interface rendreCheckboxGruppeProps {
    fields: Sporsmal[],
    meta: any,
    soknad: Soknad,
    soknadEndret: Function,
    tag: string,
}

const rendreCheckboxGruppe = (props: rendreCheckboxGruppeProps) => {
    const { fields, meta, tag, soknad, soknadEndret } = props;
    return (
        <Feilomrade {...meta} id={tag}>
            {
                fields.map((field) => {
                    return <CheckboxComp {...field} name={field.tag} key={field.tag} soknad={soknad} renderComponent={soknadEndret}/>;
                })
            }
        </Feilomrade>
    );
};

interface CheckboxGruppeProps {
    sporsmalstekst: string,
    name: string,
    undersporsmal: Sporsmal[],
    undertekst: string,
    soknad: Soknad,
    soknadEndret: Function,
}

const CheckboxGruppe = (props: CheckboxGruppeProps) => {
    const { sporsmalstekst, undertekst, name } = props;

    return (
        <div>
            <Innholdstittel tag="h3">{sporsmalstekst}</Innholdstittel>
            <FieldArray name={name} render={() => rendreCheckboxGruppe}/>
            <Normaltekst>{undertekst}</Normaltekst>
        </div>
    );
};

export default CheckboxGruppe;
