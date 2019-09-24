import React from 'react';

interface OppsummeringAvkryssetProps {
    tekst: string,
    id?: string,
}

// TODO: Importere png-ikon? Eller bytte til svg
const OppsummeringAvkrysset = ({ tekst, id }: OppsummeringAvkryssetProps) => {
    return (
        <div className="oppsummering__avkrysset" id={id}>
            <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/png/check-box-1.png`} alt="Avkrysset"/>
            <span>{tekst}</span>
        </div>
    );
};

export default OppsummeringAvkrysset;
