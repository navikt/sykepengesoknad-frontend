import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import tekster from '../oppsummering-tekster';
import { RSSvartype } from '../../../../types/rs-types/rs-svartype';
import { OppsummeringProps } from '../oppsummering';

const TallSum = ({ sporsmal }: OppsummeringProps) => {
    const labelnokkel = sporsmal.svartype === RSSvartype.TIMER ? 'soknad.timer-totalt' : 'soknad.prosent';
    const label = sporsmal.undertekst || tekster[labelnokkel];
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__svar">
                {sporsmal.svar.map((svarverdi, index) => {
                    return (
                        <Normaltekst className="oppsummering__tekst" key={index}>
                            {svarverdi.verdi} {label}
                        </Normaltekst>
                    );
                })}
            </div>
        </div>
    );
};

export default TallSum;
