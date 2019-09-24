import React from 'react';
import { getOnChangeForDato } from '../../../src/utils/getOnChange';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './field-utils';
import SporsmalTekst from './sporsmal-tekst';
import DatoVelger from '../skjema/datovelger/dato-velger';

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
