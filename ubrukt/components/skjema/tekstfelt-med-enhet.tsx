import React from 'react';
import cls from 'classnames';
import { Meta } from './datovelger/dato-velger';
import SkjemaFeilmelding from './skjema-feilmelding';

interface TekstfeltMedEnhetProps {
    label: string,
    id: string,
    input: HTMLInputElement,
    meta: Meta,
    undertekst: string,
    kunHeltall: boolean,
}

const TekstfeltMedEnhet = ({ label, id, input, meta, undertekst, kunHeltall }: TekstfeltMedEnhetProps) => {
    const inputType = undertekst === 'prosent' || kunHeltall ? 'tel' : 'text';
    const className = cls('skjemaelement__input input--xs', {
        'skjemaelement__input--harFeil': meta.touched && meta.error,
    });
    return (
        <div className="skjemaelement">
            <div className="medEnhet">
                <input autoComplete="off" id={id} type={inputType} value={input.value} className={className} />
                <label htmlFor={id} className="medEnhet__enhet">{label}</label>
            </div>
            <SkjemaFeilmelding {...meta} />
        </div>
    );
};

export default TekstfeltMedEnhet;
