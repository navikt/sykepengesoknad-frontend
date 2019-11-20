import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../data/stores/app-store';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import CheckboxPanel from './typer/checkbox-panel';
import DatoKomp from './typer/dato-komp';
import JaNeiKomp from './typer/ja-nei-komp';
import TallKomp from './typer/tall-komp';
import './sporsmalene.less';
import { Sporsmal } from '../../types/types';
import PeriodeKomp from './typer/periode-komp';

export interface SpmProps {
    sporsmal: Sporsmal;
    formProps?: {
        register: any;
        errors: any;
        watch: any;
    };
}

const Sporsmalene = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];

    console.log('sporsmal', sporsmal); // eslint-disable-line
    /*
        valgtSoknad.sporsmal.map((spm, idx) => {
            console.log('index, spørsmål', idx + ' ' + spm.sporsmalstekst.substring(0, 25)); // eslint-disable-line
            spm.svarliste.svar.map((svar: RSSvar) => {
                console.log('svar', svar.verdi); // eslint-disable-line
            })
        });
    */

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
