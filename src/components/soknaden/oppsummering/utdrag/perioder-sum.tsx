import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { OppsummeringProps } from '../oppsummering';
import dayjs from 'dayjs';
import Vis from '../../../vis';
import { empty, PERIODE_SKILLE } from '../../../../utils/constants';

const PerioderSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__tekstsvar">
                {sporsmal.svarliste.svar.map((p, i) => {
                    const periode = p.verdi.toString().split(PERIODE_SKILLE);
                    return (
                        <Vis hvis={p.verdi !== empty} key={i}>
                            <Normaltekst className="oppsummering__dato">
                                {
                                    'Fra ' + dayjs(periode[0]).format('DD.MM.YYYY') +
                                    ' til ' + dayjs(periode[1]).format('DD.MM.YYYY')
                                }
                            </Normaltekst>
                        </Vis>
                    );
                })}
            </div>
        </div>
    );
};

export default PerioderSum;
