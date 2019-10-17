import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { OppsummeringProps } from '../oppsummering';
import tekster from '../oppsummering-tekster';
import { getLedetekst } from '../../../../utils/utils';
import dayjs from 'dayjs';

const PerioderSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__tekstsvar">
                {sporsmal.svar.map((p, i) => {
                    const periode = JSON.parse(p.verdi);
                    return (
                        <Normaltekst key={i} className="oppsummering__dato">
                            {getLedetekst(tekster['soknad.periode'], {
                                '%FOM%': dayjs(periode.fom).format('DD.MM.YYYY'),
                                '%TOM%': dayjs(periode.tom).format('DD.MM.YYYY'),
                            })}
                        </Normaltekst>
                    );
                })}
            </div>
        </div>
    );
};

export default PerioderSum;
