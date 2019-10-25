import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

interface FeilmeldingProps {
    touched: boolean;
    error: string;
}

const SkjemaFeilmelding = ({ touched, error }: FeilmeldingProps) => {
    return (
        <Normaltekst className="skjemaelement__feilmelding" aria-live="polite">
            {touched && error}
        </Normaltekst>
    );
};

export default SkjemaFeilmelding;
