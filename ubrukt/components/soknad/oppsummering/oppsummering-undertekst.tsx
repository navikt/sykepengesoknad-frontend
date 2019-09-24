import React from 'react';
import OppsummeringUndersporsmalListe from './oppsummering-undersporsmal-liste';
import { Sporsmal } from '../../../../src/types/types';
import parser from 'html-react-parser';
import { Innholdstittel } from 'nav-frontend-typografi';

interface OppsummeringUndertekstProps {
    sporsmal?: Sporsmal,
    overskriftsnivaa?: number,
}

const OppsummeringUndertekst = ({ sporsmal, overskriftsnivaa = 3 }: OppsummeringUndertekstProps) => {
    return (
        sporsmal ?
            <div className="oppsummering__VisUndertekst" id={sporsmal.id}>
                <Innholdstittel tag={`h${overskriftsnivaa}`} className="oppsummering__sporsmal">{sporsmal.sporsmalstekst}</Innholdstittel>;
                <div className="redaksjonelt-innhold">
                    {parser(sporsmal.undertekst)}
                </div>
                <OppsummeringUndersporsmalListe sporsmalsliste={sporsmal.undersporsmal} overskriftsnivaa={overskriftsnivaa}/>
            </div>
            : null
    );
};

export default OppsummeringUndertekst;
