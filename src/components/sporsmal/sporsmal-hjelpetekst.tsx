import React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { TagTyper } from '../../types/enums';
import { fjernIndexFraTag } from './sporsmal-utils';
import { SpmProps } from './sporsmal-form/sporsmal-form';
import Vis from '../vis';
import { tekst } from '../../utils/tekster';

const SporsmalHjelpetekst = ({ sporsmal }: SpmProps) => {

    const vis = sporsmal.tag === TagTyper.EGENMELDINGER ||
        sporsmal.tag === TagTyper.FERIE_PERMISJON_UTLAND ||
        sporsmal.tag === TagTyper.FERIE_V2;

    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase();

    return (
        <Vis hvis={vis}>
            <Hjelpetekst>
                {tekst(`soknad.hjelpetekst.${nokkel}`)}
            </Hjelpetekst>
        </Vis>
    )
};

export default SporsmalHjelpetekst;
