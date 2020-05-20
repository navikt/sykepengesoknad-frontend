import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { RSSvartype } from '../../../../types/rs-types/rs-svartype';
import { OppsummeringProps } from '../oppsummering';
import { empty } from '../../../../utils/constants';
import Vis from '../../../vis';
import { tekst } from '../../../../utils/tekster';

const TallSum = ({ sporsmal }: OppsummeringProps) => {
    const labelnokkel = sporsmal.svartype === RSSvartype.TIMER ? 'soknad.timer-totalt' : 'soknad.prosent';
    const label = sporsmal.undertekst || tekst(labelnokkel);
    return (
        <div className='oppsummering__sporsmal'>
            <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
            <div className='oppsummering__svar'>
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <Vis hvis={svarverdi.verdi !== empty && typeof svarverdi.verdi === 'string'} key={index}>
                            <Normaltekst className='oppsummering__tekst'>
                                {svarverdi.verdi} {label}
                            </Normaltekst>
                        </Vis>
                    );
                })}
            </div>
        </div>
    );
};

export default TallSum;
