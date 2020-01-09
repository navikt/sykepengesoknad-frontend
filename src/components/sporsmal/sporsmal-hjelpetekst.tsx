import React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { TagTyper } from '../../types/enums';
import { fjernIndexFraTag } from './field-utils';
import tekster from './sporsmal-tekster';
import { SpmProps } from './sporsmal-form/sporsmal-form';
import Vis from '../../utils/vis';

const SporsmalHjelpetekst = ({ sporsmal }: SpmProps) => {

    const vis = sporsmal.tag === TagTyper.EGENMELDINGER ||
        sporsmal.tag === TagTyper.FERIE_PERMISJON_UTLAND ||
        sporsmal.tag === TagTyper.FERIE_V2;

    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase();

    return (
        <Vis hvis={vis}>
            <Hjelpetekst>
                {tekster[`soknad.hjelpetekst.${nokkel}`]}
            </Hjelpetekst>
        </Vis>
    )
};

export default SporsmalHjelpetekst;
