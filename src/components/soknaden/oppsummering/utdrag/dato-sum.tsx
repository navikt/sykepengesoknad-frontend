import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import Vis from '../../../vis';
import { empty } from '../../../../utils/constants';

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className='oppsummering__sporsmal'>
            <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
            <div className='oppsummering__tekstsvar'>
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <Vis hvis={svarverdi.verdi !== empty && typeof svarverdi.verdi === 'string'} key={index}>
                            <Normaltekst className='oppsummering__dato'>
                                {dayjs(svarverdi.verdi.toString()).format('DD.MM.YYYY')}
                            </Normaltekst>
                        </Vis>
                    );
                })}
            </div>
        </div>
    );
};

export default DatoSum;
