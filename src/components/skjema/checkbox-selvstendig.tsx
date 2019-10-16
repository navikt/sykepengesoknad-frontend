import React from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import SkjemaFeilmelding from './skjema-feilmelding';

interface CheckboxSelvstendigProps {
    input: any,
    meta: any,
    label: string,
    id: string,
    disabled: boolean,
}

const CheckboxSelvstendig = ({ input, meta, label, id, disabled }: CheckboxSelvstendigProps) => {
    return (
        <div>
            <BekreftCheckboksPanel {...input} inputProps={{ id, disabled }} label={label} checked={input.value === true}/>
            <SkjemaFeilmelding {...meta} />
        </div>
    );
};

export default CheckboxSelvstendig;
