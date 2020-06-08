import cls from 'classnames';
import React from 'react';

import SkjemaFeilmelding from './skjema-feilmelding';

interface TekstfeltMedEnhetProps {
    label: string;
    id: string;
    input: HTMLInputElement;
    undertekst: string;
    kunHeltall: boolean;
}

const TekstfeltMedEnhet = ({ label, id, input, undertekst, kunHeltall }: TekstfeltMedEnhetProps) => {
    const inputType = undertekst === 'prosent' || kunHeltall ? 'tel' : 'text';
    const className = cls('skjemaelement__input input--xs', {
        'skjemaelement__input--harFeil': true,
    });
    return (
        <div className='skjemaelement'>
            <div className='medEnhet'>
                <input autoComplete='off' id={id} type={inputType} value={input.value} className={className} />
                <label htmlFor={id} className='medEnhet__enhet'>{label}</label>
            </div>
            <SkjemaFeilmelding touched={true} error={''} />
        </div>
    );
};

export default TekstfeltMedEnhet;
