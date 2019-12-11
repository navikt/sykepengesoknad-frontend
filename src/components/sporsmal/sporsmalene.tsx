import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../data/stores/app-store';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import CheckboxPanel from './typer/checkbox-panel';
import DatoKomp from './typer/dato-komp';
import JaNeiKomp from './typer/ja-nei-komp';
import TallKomp from './typer/tall-komp';
import { Sporsmal } from '../../types/types';
import PeriodeKomp from './typer/periode-komp';
import { useFormContext } from 'react-hook-form';
import './sporsmal-form/sporsmal-form.less';

export interface SpmProps {
    sporsmal: Sporsmal;
}

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({
        ...methods
    });
};

const Sporsmalene = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];

    const forrige = valgtSoknad.sporsmal[spmIndex - 1];
    // console.log('forrige sporsmal', forrige ? forrige : 'null'); // eslint-disable-line
    console.log('forrige.id', forrige ? forrige.id : 'null'); // eslint-disable-line
    console.log('forrige.svar', forrige ? forrige.svarliste.svar[0].verdi : 'null'); // eslint-disable-line

    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX: {
            return <CheckboxPanel sporsmal={sporsmal} />
        }
        case RSSvartype.CHECKBOX_GRUPPE: {
            return null;
        }
        case RSSvartype.CHECKBOX_PANEL: {
            return <CheckboxPanel sporsmal={sporsmal} />
        }
        case RSSvartype.DATO: {
            return <DatoKomp sporsmal={sporsmal} />
        }
        case RSSvartype.FRITEKST: {
            return null;
        }
        case RSSvartype.IKKE_RELEVANT: {
            return null;
        }
        case RSSvartype.JA_NEI: {
            return <JaNeiKomp sporsmal={sporsmal} />
        }
        case RSSvartype.LAND: {
            return null;
        }
        case RSSvartype.PERIODE: {
            return <PeriodeKomp sporsmal={sporsmal} />;
        }
        case RSSvartype.PERIODER: {
            return <PeriodeKomp sporsmal={sporsmal} />;
        }
        case RSSvartype.PROSENT: {
            return <TallKomp sporsmal={sporsmal} desimaler={1} />
        }
        case RSSvartype.RADIO:
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT: {
            return null;
        }
        case RSSvartype.TALL: {
            return <TallKomp sporsmal={sporsmal} desimaler={2} />
        }
        case RSSvartype.TIMER: {
            return <TallKomp sporsmal={sporsmal} desimaler={0} />
        }
        default: {
            return null;
        }
    }
};

export default Sporsmalene;
