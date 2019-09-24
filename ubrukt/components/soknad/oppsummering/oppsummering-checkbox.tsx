import React from 'react';
import { SvarEnums } from '../../../../src/types/enums';
import { RSSvar } from '../../../../src/types/rs-types/rs-svar';
import { Sporsmal } from '../../../../src/types/types';
import OppsummeringAvkrysset from './oppsummering-avkrysset';
import OppsummeringUndersporsmalListe from './oppsummering-undersporsmal-liste';

interface OppsummeringCheckboxProps {
    undersporsmal: Sporsmal[],
    svar: RSSvar[],
    sporsmalstekst: string,
    overskriftsnivaa: number,
    tag?: string,
}

const OppsummeringCheckbox = ({ undersporsmal, svar, sporsmalstekst, overskriftsnivaa = 3 }: OppsummeringCheckboxProps) => {
    return svar[0] && svar[0].verdi === SvarEnums.CHECKED ? (
        <>
            <OppsummeringAvkrysset tekst={sporsmalstekst}/>
            <OppsummeringUndersporsmalListe sporsmalsliste={undersporsmal} overskriftsnivaa={overskriftsnivaa}/>
        </>
    ) : null;
};

export default OppsummeringCheckbox;
