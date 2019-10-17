import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__tekstsvar">
                {sporsmal.svar.map((svarverdi, index) => {
                    return (
                        <Normaltekst className="oppsummering__dato" key={index}>
                            {dayjs(svarverdi.verdi).format('DD.MM.YYYY')}
                        </Normaltekst>
                    );
                })}
            </div>
        </div>
    );
};

export default DatoSum;
