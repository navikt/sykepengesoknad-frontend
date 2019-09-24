import React from 'react';
// import OppsummeringSporsmal from './oppsummering-sporsmal';
import { RSSvartype } from '../../../../src/types/rs-types/rs-svartype';
import { Soknad, Sporsmal } from '../../../../src/types/types';
import { Normaltekst } from 'nav-frontend-typografi';

export const getKey = (tag: string, id: string) => {
    return `${tag}_${id}`;
};

interface OppsummeringVisningProps {
    soknad: Soknad,
}

const OppsummeringVisning = ({ soknad }: OppsummeringVisningProps) => {
    return (
        <>
            {
                soknad.sporsmal
                    .filter((sporsmal: Sporsmal) => {
                        return (sporsmal.svar.length > 0 || sporsmal.undersporsmal.length > 0 || sporsmal.svartype === RSSvartype.IKKE_RELEVANT);
                    })
                    .map((sporsmal) => {
                        return (
                            <div className="oppsummering__seksjon" key={getKey(sporsmal.tag, sporsmal.id)}>
                                <Normaltekst>OppsummeringSporsmal</Normaltekst>
                            </div>
                        );
                    })
            }
        </>
    );
};

export default OppsummeringVisning;
