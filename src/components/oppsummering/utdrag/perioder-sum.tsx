import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { OppsummeringProps } from '../oppsummering';
import Vis from '../../vis';
import { empty } from '../../../utils/constants';
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils';
import { hentPeriode } from '../../sporsmal/hent-svar';

const PerioderSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className='oppsummering__sporsmal'>
            <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
            <div className='oppsummering__tekstsvar'>
                {sporsmal.svarliste.svar.map((p, i) => {
                    const periode = hentPeriode(sporsmal, i);
                    return (
                        <Vis hvis={p.verdi !== empty} key={i}>
                            <Normaltekst className='oppsummering__dato'>
                                { tilLesbarPeriodeMedArstall(periode[0], periode[1]) }
                            </Normaltekst>
                        </Vis>
                    );
                })}
            </div>
        </div>
    );
};

export default PerioderSum;
