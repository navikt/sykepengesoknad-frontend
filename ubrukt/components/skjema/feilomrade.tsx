import React from 'react';
import SkjemaFeilmelding from './skjema-feilmelding';

interface FeilomradeProps {
    touched: boolean,
    error: string,
    children: React.ReactNode,
    id: string
}

const Feilomrade = ({ touched, error, children, id }: FeilomradeProps) => {
    return (
        <div tabIndex={-1} id={id} className={touched && error ? 'skjema__feilomrade skjema__feilomrade--harFeil' : 'skjema__feilomrade'}>
            {children}
            <SkjemaFeilmelding touched={touched} error={error}/>
        </div>
    );
};

export default Feilomrade;
