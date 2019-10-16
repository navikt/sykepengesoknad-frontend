import React from 'react';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './field-utils';
import DatoVelger from '../skjema/datovelger/dato-velger';
import SporsmalTekst from './sporsmal-tekst';
import { getOnChangeForDato } from '../../utils/get-on-change';

interface DatoProps {
    sporsmalstekst: string,
    min?: Date,
    max?: Date,
    name: string,
    children: React.ReactNode
}

const Dato = (props: DatoProps) => {
    const { sporsmalstekst, min, max, name } = props;
    const parse = genererParseForEnkeltverdi();
    const onChange = getOnChangeForDato(props);
    return (
        <>
            <SporsmalTekst tekst={sporsmalstekst} tag="label" />
            <DatoVelger
                oppdaterSporsmal={onChange}
                format={formaterEnkeltverdi}
                parse={parse}
                parseVerdi={parse}
                name={name}
                id={name}
                tidligsteFom={min}
                senesteTom={max}
            />
        </>
    );
};

export default Dato;
