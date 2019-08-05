import * as React from 'react';
import { Soknad } from '../types/types';
import { SvarTyper } from '../types/enums';

export const getKey = (tag: string, id: string) => {
    return `${tag}_${id}`;
};

interface OppsummeringVisningProps {
    soknad: Soknad,
}

const OppsummeringVisning = ({ soknad }: OppsummeringVisningProps) => {
    return (
        <div>
            {
                soknad.sporsmal
                    .filter((sporsmal) => {
                        return (true
/*
                            sporsmal.svar.length > 0 ||
                            sporsmal.undersporsmal.length > 0 ||
                            sporsmal.svartype === SvarTyper.IKKE_RELEVANT
*/
                        );
                    })
                    .map((sporsmal) => {
                        return (<div className="oppsummering__seksjon" key={getKey(sporsmal.tag, sporsmal.id)}>
                            <h1>OppsummeringSporsmal inn her</h1>
{/*
                            <OppsummeringSporsmal {...sporsmal} />
*/}
                        </div>);
                    })
            }
        </div>
    );
};

export default OppsummeringVisning;
