import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../data/stores/app-store';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import CheckboxPanel from './typer/checkbox-panel';
import JaNeiKomp from './typer/ja-nei-komp';
import { Sporsmal } from '../../types/types';
import './sporsmal-form/sporsmal-form.less';

export interface SpmProps {
    sporsmal: Sporsmal;
}

const Sporsmalene = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];

    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL: {
            return <CheckboxPanel sporsmal={sporsmal} />
        }
        case RSSvartype.JA_NEI: {
            return <JaNeiKomp sporsmal={sporsmal} />
        }
        default: {
            return null;
        }
    }
};

export default Sporsmalene;
