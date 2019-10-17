import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element } from 'nav-frontend-typografi';
import Vis from '../../../../utils/vis';
import { RSSvartype } from '../../../../types/rs-types/rs-svartype';
import UndersporsmalSum from './undersporsmal-sum';
import { SvarEnums } from '../../../../types/enums';
import Avkrysset from './avkrysset';
import { Sporsmal } from '../../../../types/types';

const RadioGruppe = ({ sporsmal }: OppsummeringProps) => {
    const besvartUndersporsmal: Sporsmal = sporsmal.undersporsmal.find((s) => {
        return s.svar.length > 0 && s.svar[0].verdi === SvarEnums.CHECKED;
    });
    return (
        <>
            <Vis hvis={besvartUndersporsmal !== undefined}>
                <div className="oppsummering__sporsmal">
                    <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
                    {sporsmal.svartype === RSSvartype.RADIO_GRUPPE && <Avkrysset tekst={besvartUndersporsmal.sporsmalstekst}/>}
                    <UndersporsmalSum sporsmalsliste={besvartUndersporsmal.undersporsmal}/>
                </div>
            </Vis>
        </>
    )
};

export default RadioGruppe;
