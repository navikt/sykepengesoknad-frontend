import React from 'react';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './field-utils';
import { Field } from 'formik';
import SporsmalTekst from './sporsmal-tekst';
import TekstfeltMedEnhet from '../skjema/tekstfelt-med-enhet';
import { lagDesimaltall, lagHeltall } from '../../../src/utils/utils';

interface TallProps {
    sporsmalstekst: string,
    name: string,
    label: string,
    undertekst: string,
    kunHeltall: boolean,
    children: React.ReactNode
}

const Tall = ({ sporsmalstekst, name, label, undertekst, kunHeltall }: TallProps) => {
    const parse = genererParseForEnkeltverdi();
    return (
        <>
            <SporsmalTekst tag="label" tekst={sporsmalstekst} htmlFor={name}/>
            <Field
                component={TekstfeltMedEnhet}
                kunHeltall={kunHeltall}
                label={label}
                name={name}
                id={name}
                parse={(verdi: string) => {
                    const parsetVerdi = undertekst === 'prosent' || kunHeltall
                        ? lagHeltall(verdi)
                        : lagDesimaltall(verdi);
                    return parse(parsetVerdi);
                }}
                format={formaterEnkeltverdi}
                undertekst={undertekst}
                className="input--s"/>
        </>
    );
};

export default Tall;
