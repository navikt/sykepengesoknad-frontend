import React from 'react';
import { Element } from 'nav-frontend-typografi';
import tekster from '../oppsummering-tekster';
import Avkrysset from './avkrysset';
import { OppsummeringProps } from '../oppsummering';
import UndersporsmalSum from './undersporsmal-sum';
import { Sporsmal } from '../../../../types/types';
import Vis from '../../../vis';

const erUndersporsmalStilt = (sporsmal: Sporsmal): boolean => {
    return sporsmal.svarliste.svar.map((s) => {
        return s.verdi;
    }).indexOf(sporsmal.kriterieForVisningAvUndersporsmal) > -1;
};

const JaEllerNei = ({ sporsmal }: OppsummeringProps) => {
    const svar = sporsmal.svarliste.svar[0];
    if (typeof svar.verdi !== 'string') {
        return null;
    }

    const svartekst = tekster[`soknad.${svar.verdi.toLowerCase()}`];
    return (
        <div className="oppsummering-sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <Avkrysset tekst={svartekst}/>
            <Vis hvis={erUndersporsmalStilt(sporsmal)}>
                <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
            </Vis>
        </div>
    );
};

export default JaEllerNei;
